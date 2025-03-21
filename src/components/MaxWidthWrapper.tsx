import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

interface MaxWidthWrapperProps {
  className?: string
  children: ReactNode
  noPadding?: boolean
}

const MaxWidthWrapper = ({
  className,
  children,
  noPadding = false,
}: MaxWidthWrapperProps) => {
  return (
    <div 
      className={cn(
        'mx-auto w-full max-w-screen-xl',
        {
          'px-2.5 md:px-20': !noPadding,
        },
        className
      )}
    >
      {children}
    </div>
  )
}

export default MaxWidthWrapper
