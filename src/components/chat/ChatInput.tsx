import { Send } from 'lucide-react'
import { Button } from '../ui/button'
import { Textarea } from '../ui/textarea'
import { useContext, useRef, useEffect } from 'react'
import { ChatContext } from './ChatContext'
import TextareaAutosize from 'react-textarea-autosize'

interface ChatInputProps {
  isDisabled?: boolean
}

const ChatInput = ({ isDisabled }: ChatInputProps) => {
  const {
    addMessage,
    handleInputChange,
    isLoading,
    message,
  } = useContext(ChatContext)

  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // Focus the textarea when the component mounts
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus()
    }
  }, [])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      if (message.trim() && !isLoading && !isDisabled) {
        addMessage()
        textareaRef.current?.focus()
      }
    }
  }

  return (
    <div className='absolute bottom-0 left-0 w-full bg-white border-t border-gray-200'>
      <div className='mx-auto max-w-3xl p-4 md:p-6 relative'>
        <div className='relative flex items-center'>
          <TextareaAutosize
            ref={textareaRef}
            autoFocus
            onChange={handleInputChange}
            value={message}
            onKeyDown={handleKeyDown}
            placeholder={isDisabled ? 'File processing...' : 'Ask a question about your document...'}
            className='resize-none w-full pr-12 py-3 px-4 max-h-36 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-base overflow-hidden shadow-sm'
            disabled={isLoading || isDisabled}
            maxRows={5}
            minRows={1}
            style={{ 
              outline: 'none',
              boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)'
            }}
          />

          <Button
            disabled={isLoading || isDisabled || !message.trim()}
            className='absolute right-2 bottom-[10px] p-1 h-8 w-8 rounded-full bg-blue-600 hover:bg-blue-700 text-white transition-colors'
            aria-label='send message'
            onClick={() => {
              if (message.trim()) {
                addMessage()
                textareaRef.current?.focus()
              }
            }}>
            <Send className='h-4 w-4' />
          </Button>
        </div>
        
        {isDisabled ? (
          <div className='absolute inset-0 flex items-center justify-center bg-gray-50/50 backdrop-blur-sm'>
            <p className='text-sm text-gray-500'>Wait until the document is processed</p>
          </div>
        ) : null}
        
        <p className='text-xs text-center text-gray-500 mt-2'>
          {isLoading ? 'Generating response...' : 'Press Enter to send, Shift+Enter for new line'}
        </p>
      </div>
    </div>
  )
}

export default ChatInput
