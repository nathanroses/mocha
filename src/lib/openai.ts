import OpenAI from 'openai'

// Create a mock OpenAI client for when the API key is not available
class MockOpenAI {
  chat = {
    completions: {
      create: async () => ({
        choices: [{
          message: {
            content: "This is a mock response as OpenAI API is not configured."
          }
        }]
      })
    }
  }
}

// Export either a real or mock client
export const openai = process.env.OPENAI_API_KEY
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  : (new MockOpenAI() as unknown as OpenAI)
