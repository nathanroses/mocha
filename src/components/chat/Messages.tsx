import { trpc } from '@/app/_trpc/client'
import { INFINITE_QUERY_LIMIT } from '@/config/infinite-query'
import { Loader2, MessageSquare } from 'lucide-react'
import Skeleton from 'react-loading-skeleton'
import Message from './Message'
import { useContext, useEffect, useRef } from 'react'
import { ChatContext } from './ChatContext'
import { useIntersection } from '@mantine/hooks'

interface MessagesProps {
  fileId: string
}

const Messages = ({ fileId }: MessagesProps) => {
  const { isLoading: isAiThinking } = useContext(ChatContext)

  const { data, isLoading, fetchNextPage } = trpc.getFileMessages.useInfiniteQuery(
    {
      fileId,
      limit: INFINITE_QUERY_LIMIT,
    },
    {
      getNextPageParam: (lastPage) => lastPage?.nextCursor,
      keepPreviousData: true,
    }
  )

  const messages = data?.pages.flatMap((page) => page.messages)

  const loadingMessage = {
    createdAt: new Date().toISOString(),
    id: 'loading-message',
    isUserMessage: false,
    text: (
      <span className='flex items-center justify-center h-full'>
        <Loader2 className='h-4 w-4 animate-spin' />
      </span>
    ),
  }

  const combinedMessages = [
    ...(isAiThinking ? [loadingMessage] : []),
    ...(messages ?? []),
  ]

  const lastMessageRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const { ref, entry } = useIntersection({
    root: lastMessageRef.current,
    threshold: 1,
  })

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight
    }
  }, [combinedMessages?.length])

  useEffect(() => {
    if (entry?.isIntersecting) {
      fetchNextPage()
    }
  }, [entry, fetchNextPage])

  return (
    <div 
      ref={containerRef}
      className='flex max-h-[calc(100vh-10rem)] flex-1 flex-col-reverse gap-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch'
    >
      {combinedMessages && combinedMessages.length > 0 ? (
        combinedMessages.map((message, i) => {
          const isNextMessageSamePerson = combinedMessages[i - 1]?.isUserMessage === combinedMessages[i]?.isUserMessage

          if (i === combinedMessages.length - 1) {
            return (
              <Message
                ref={ref}
                message={message}
                isNextMessageSamePerson={isNextMessageSamePerson}
                key={message.id}
              />
            )
          } else {
            return (
              <Message
                message={message}
                isNextMessageSamePerson={isNextMessageSamePerson}
                key={message.id}
              />
            )
          }
        })
      ) : isLoading ? (
        <div className='w-full flex flex-col gap-2'>
          <Skeleton className='h-16' />
          <Skeleton className='h-16' />
          <Skeleton className='h-16' />
          <Skeleton className='h-16' />
        </div>
      ) : (
        <div className='flex flex-1 flex-col items-center justify-center gap-2'>
          <MessageSquare className='h-8 w-8 text-blue-500' />
          <h3 className='font-semibold text-xl'>
            Ask your first question
          </h3>
          <p className='text-zinc-500 text-sm text-center max-w-md'>
            Start by asking a question about your document. Mocha will help you find the answers you need.
          </p>
        </div>
      )}
    </div>
  )
}

export default Messages
