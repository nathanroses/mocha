import { db } from '@/db'
import { openai } from '@/lib/openai'
import { getPineconeClient } from '@/lib/pinecone'
import { SendMessageValidator } from '@/lib/validators/SendMessageValidator'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { OpenAIEmbeddings } from 'langchain/embeddings/openai'
import { PineconeStore } from 'langchain/vectorstores/pinecone'
import { NextRequest, NextResponse } from 'next/server'

// Mock implementation for PineconeStore
class MockPineconeStore {
  static async fromExistingIndex() {
    return new MockPineconeStore()
  }
  
  async similaritySearch() {
    return [{ pageContent: "This is a mock response as Pinecone is not configured." }]
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { getUser } = getKindeServerSession()
    const user = getUser()
    const { id: userId } = user

    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' }, 
        { status: 401 }
      )
    }

    const { fileId, message } = SendMessageValidator.parse(body)

    const file = await db.file.findFirst({
      where: {
        id: fileId,
        userId,
      },
    })

    if (!file) {
      return NextResponse.json(
        { error: 'Not found' }, 
        { status: 404 }
      )
    }

    // Create user message in DB
    await db.message.create({
      data: {
        text: message,
        isUserMessage: true,
        userId,
        fileId,
      },
    })

    // Get previous messages for context
    const prevMessages = await db.message.findMany({
      where: {
        fileId,
      },
      orderBy: {
        createdAt: 'asc',
      },
      take: 6,
    })

    const formattedPrevMessages = prevMessages.map((msg) => ({
      role: msg.isUserMessage ? 'user' : 'assistant',
      content: msg.text,
    }))

    let results;
    try {
      // Try to use real Pinecone if available
      if (process.env.OPENAI_API_KEY && process.env.PINECONE_API_KEY) {
        const embeddings = new OpenAIEmbeddings({
          openAIApiKey: process.env.OPENAI_API_KEY,
        })

        const pinecone = await getPineconeClient()
        const pineconeIndex = pinecone.Index('quill')

        const vectorStore = await PineconeStore.fromExistingIndex(
          embeddings,
          {
            pineconeIndex,
            namespace: file.id,
          }
        )

        results = await vectorStore.similaritySearch(message, 4)
      } else {
        // Use mock results if Pinecone is not available
        results = [{ 
          pageContent: "I don't have the specific information from your document as vector search is not available." 
        }]
      }

      // Generate AI response using OpenAI
      const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        temperature: 0,
        messages: [
          {
            role: 'system',
            content:
              'Use the following pieces of context (or previous conversation if needed) to answer the users question in markdown format.',
          },
          {
            role: 'user',
            content: `Use the following pieces of context (or previous conversation if needed) to answer the users question in markdown format. \nIf you don't know the answer, just say that you don't know, don't try to make up an answer.
            
      \n----------------\n
      
      PREVIOUS CONVERSATION:
      ${formattedPrevMessages.map((message) => {
        if (message.role === 'user')
          return `User: ${message.content}\n`
        return `Assistant: ${message.content}\n`
      })}
      
      \n----------------\n
      
      CONTEXT:
      ${results.map((r) => r.pageContent).join('\n\n')}
      
      USER INPUT: ${message}`,
          },
        ],
      })

      // Store the AI's response in the database
      const aiResponse = response.choices[0].message.content

      await db.message.create({
        data: {
          text: aiResponse || "Sorry, I couldn't generate a response.",
          isUserMessage: false,
          fileId,
          userId,
        },
      })

      // Return the response
      return NextResponse.json({ response: aiResponse })
    } catch (error) {
      console.error('Error processing message:', error)
      
      // Create a fallback response
      const fallbackResponse = "I'm sorry, I couldn't process your question at the moment. Please try again later."
      
      await db.message.create({
        data: {
          text: fallbackResponse,
          isUserMessage: false,
          fileId,
          userId,
        },
      })
      
      return NextResponse.json({ response: fallbackResponse })
    }
  } catch (error) {
    console.error('Error processing message:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
