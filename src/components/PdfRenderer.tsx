'use client'

import { useState } from 'react'
import { Button } from './ui/button'
import { 
  ChevronDown, 
  ChevronUp, 
  ExternalLink,
  ZoomIn, 
  ZoomOut,
  RotateCw,
  Expand
} from 'lucide-react'
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog'

interface PdfRendererProps {
  url: string
}

const PdfRenderer = ({ url }: PdfRendererProps) => {
  const [scale, setScale] = useState(100)
  const [rotation, setRotation] = useState(0)
  
  // Create URL with scale and rotation parameters
  const getViewerUrl = () => {
    return `${url}#zoom=${scale/100}&rotate=${rotation}`
  }

  return (
    <div className='w-full bg-white rounded-md shadow overflow-hidden'>
      {/* PDF Controls */}
      <div className='h-14 w-full border-b border-zinc-200 flex items-center justify-between px-4 sticky top-0 bg-white z-10'>
        <div className='flex items-center gap-3'>
          <h3 className='text-sm font-medium'>Document Viewer</h3>
        </div>

        <div className='flex items-center gap-2'>
          {/* Zoom controls */}
          <div className='flex items-center'>
            <Button
              onClick={() => setScale(Math.max(scale - 10, 50))}
              variant='ghost'
              size='sm'
              aria-label='zoom out'>
              <ZoomOut className='h-4 w-4' />
            </Button>
            
            <span className='text-sm text-gray-600 w-12 text-center'>
              {scale}%
            </span>
            
            <Button
              onClick={() => setScale(Math.min(scale + 10, 200))}
              variant='ghost' 
              size='sm'
              aria-label='zoom in'>
              <ZoomIn className='h-4 w-4' />
            </Button>
          </div>
          
          {/* Rotate button */}
          <Button
            onClick={() => setRotation((prev) => (prev + 90) % 360)}
            variant='ghost'
            size='sm'
            aria-label='rotate 90 degrees'>
            <RotateCw className='h-4 w-4' />
          </Button>

          {/* Open in new tab button */}
          <Button
            variant='ghost'
            size='sm'
            onClick={() => window.open(url, '_blank')}
            aria-label='open in new tab'>
            <ExternalLink className='h-4 w-4' />
          </Button>
          
          {/* Fullscreen button */}
          <PdfFullscreen fileUrl={url} />
        </div>
      </div>

      {/* PDF Viewer - uses iframe but refreshes when zoom/rotation changes */}
      <div className='flex-1 w-full'>
        <iframe
          key={`${scale}-${rotation}`}
          src={getViewerUrl()}
          className='w-full h-[calc(100vh-10rem)]'
          title="PDF document"
        />
      </div>
    </div>
  )
}

// Simple fullscreen component
const PdfFullscreen = ({ fileUrl }: { fileUrl: string }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(v) => {
        if (!v) setIsOpen(v)
      }}>
      <DialogTrigger
        onClick={() => setIsOpen(true)}
        asChild>
        <Button
          variant='ghost'
          size='sm'
          className='gap-1.5'
          aria-label='fullscreen'>
          <Expand className='h-4 w-4' />
        </Button>
      </DialogTrigger>
      <DialogContent className='max-w-7xl w-full h-[95vh]'>
        <iframe
          src={fileUrl}
          className='w-full h-full'
          title="PDF document fullscreen"
          style={{
            border: 'none'
          }}
        />
      </DialogContent>
    </Dialog>
  )
}

export default PdfRenderer
