import { cn } from '@/lib/utils'
import { ExtendedMessage } from '@/types/message'
import { Icons } from '../Icons'
import ReactMarkdown from 'react-markdown'
import { format } from 'date-fns'
import { forwardRef } from 'react'

interface MessageProps {
  message: ExtendedMessage
  isNextMessageSamePerson: boolean
}

const Message = forwardRef<HTMLDivElement, MessageProps>(
  ({ message, isNextMessageSamePerson }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('flex items-end', {
          'justify-end': message.isUserMessage,
        })}>
        <div
          className={cn(
            'relative flex h-8 w-8 aspect-square items-center justify-center rounded-full',
            {
              'order-2 bg-blue-600': message.isUserMessage,
              'order-1 bg-gray-700': !message.isUserMessage,
              'invisible': isNextMessageSamePerson,
            }
          )}>
          {message.isUserMessage ? (
            <Icons.user className='fill-white text-white h-5 w-5' />
          ) : (
            <Icons.logo className='fill-white h-5 w-5' />
          )}
        </div>

        <div
          className={cn(
            'flex flex-col space-y-2 text-base max-w-md mx-2',
            {
              'order-1 items-end': message.isUserMessage,
              'order-2 items-start': !message.isUserMessage,
            }
          )}>
          <div
            className={cn(
              'px-4 py-2 rounded-lg shadow-sm',
              {
                'bg-blue-600 text-white': message.isUserMessage,
                'bg-white border border-gray-200 text-gray-900': !message.isUserMessage,
                'rounded-br-none': !isNextMessageSamePerson && message.isUserMessage,
                'rounded-bl-none': !isNextMessageSamePerson && !message.isUserMessage,
              }
            )}>
            {typeof message.text === 'string' ? (
              <ReactMarkdown
                className={cn('prose', {
                  'prose-invert': message.isUserMessage,
                  'prose-neutral': !message.isUserMessage,
                  'text-sm': true,
                })}>
                {message.text}
              </ReactMarkdown>
            ) : (
              message.text
            )}
            {message.id !== 'loading-message' ? (
              <div
                className={cn(
                  'text-xs select-none mt-2 w-full text-right',
                  {
                    'text-gray-400': !message.isUserMessage,
                    'text-blue-300': message.isUserMessage,
                  }
                )}>
                {format(
                  new Date(message.createdAt),
                  'HH:mm'
                )}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    )
  }
)

Message.displayName = 'Message'

export default Message
