'use client'

import { useState } from 'react'
import { Document, Page } from 'react-pdf'
import { useResizeDetector } from 'react-resize-detector'
import { useToast } from './ui/use-toast'
import SimpleBar from 'simplebar-react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { 
  ChevronDown, 
  ChevronUp, 
  Loader2, 
  RotateCw, 
  ZoomIn, 
  ZoomOut 
} from 'lucide-react'
import { cn } from '@/lib/utils'
import PdfFullscreen from './PdfFullscreen'

// Import PDF worker dynamically
import { pdfjs } from 'react-pdf'
import 'react-pdf/dist/esm/Page/AnnotationLayer.css'
import 'react-pdf/dist/esm/Page/TextLayer.css'

// Set worker URL
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`

interface PdfRendererProps {
  url: string
}

const PdfRenderer = ({ url }: PdfRendererProps) => {
  const { toast } = useToast()
  const [numPages, setNumPages] = useState<number>()
  const [currPage, setCurrPage] = useState<number>(1)
  const [scale, setScale] = useState<number>(1)
  const [rotation, setRotation] = useState<number>(0)
  const [isLoading, setIsLoading] = useState(true)
  const { width, ref } = useResizeDetector()

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= (numPages || 1)) {
      setCurrPage(newPage)
    }
  }

  return (
    <div className='w-full bg-white rounded-md shadow overflow-hidden'>
      {/* PDF Controls */}
      <div className='h-14 w-full border-b border-zinc-200 flex items-center justify-between px-4 sticky top-0 bg-white z-10'>
        <div className='flex items-center gap-3'>
          {/* Page navigation */}
          <div className='flex items-center gap-1.5'>
            <Button
              disabled={currPage <= 1}
              onClick={() => handlePageChange(currPage - 1)}
              variant='ghost'
              size='sm'
              aria-label='previous page'>
              <ChevronUp className='h-4 w-4' />
            </Button>

            <div className='flex items-center gap-1.5'>
              <Input
                value={currPage}
                onChange={(e) => {
                  const page = parseInt(e.target.value)
                  if (!isNaN(page)) handlePageChange(page)
                }}
                className='w-14 h-8'
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    const page = parseInt((e.target as HTMLInputElement).value)
                    if (!isNaN(page)) handlePageChange(page)
                  }
                }}
              />
              <p className='text-zinc-700 text-sm space-x-1'>
                <span>/</span>
                <span>{numPages ?? 'x'}</span>
              </p>
            </div>

            <Button
              disabled={numPages === undefined || currPage === numPages}
              onClick={() => handlePageChange(currPage + 1)}
              variant='ghost'
              size='sm'
              aria-label='next page'>
              <ChevronDown className='h-4 w-4' />
            </Button>
          </div>
        </div>

        <div className='flex items-center gap-2'>
          {/* Zoom controls */}
          <div className='flex items-center'>
            <Button
              onClick={() => setScale((prev) => Math.max(prev - 0.1, 0.5))}
              variant='ghost'
              size='sm'
              aria-label='zoom out'>
              <ZoomOut className='h-4 w-4' />
            </Button>
            
            <span className='text-sm text-gray-600 w-12 text-center'>
              {Math.round(scale * 100)}%
            </span>
            
            <Button
              onClick={() => setScale((prev) => Math.min(prev + 0.1, 2))}
              variant='ghost' 
              size='sm'
              aria-label='zoom in'>
              <ZoomIn className='h-4 w-4' />
            </Button>
          </div>
          
          {/* Rotate button */}
          <Button
            onClick={() => setRotation((prev) => prev + 90)}
            variant='ghost'
            size='sm'
            aria-label='rotate 90 degrees'>
            <RotateCw className='h-4 w-4' />
          </Button>

          {/* Fullscreen button */}
          <PdfFullscreen fileUrl={url} />
        </div>
      </div>

      {/* PDF Viewer */}
      <div className='flex-1 w-full'>
        <SimpleBar autoHide={false} className='max-h-[calc(100vh-10rem)]'>
          <div ref={ref} className='flex justify-center'>
            <Document
              loading={
                <div className='flex justify-center items-center min-h-[calc(100vh-15rem)]'>
                  <Loader2 className='my-24 h-6 w-6 animate-spin' />
                </div>
              }
              onLoadSuccess={({ numPages }) => {
                setNumPages(numPages)
                setIsLoading(false)
              }}
              onLoadError={() => {
                toast({
                  title: 'Error loading PDF',
                  description: 'Please try again later',
                  variant: 'destructive',
                })
                setIsLoading(false)
              }}
              file={url}
              className='max-h-full'>
              <Page
                width={width ? width : 1}
                pageNumber={currPage}
                scale={scale}
                rotate={rotation}
                loading={
                  <div className='flex justify-center'>
                    <Loader2 className='my-24 h-6 w-6 animate-spin' />
                  </div>
                }
              />
            </Document>
          </div>
        </SimpleBar>
      </div>
    </div>
  )
}

export default PdfRenderer
