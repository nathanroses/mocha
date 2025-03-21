'use client'

import {
  ChevronDown,
  ChevronUp,
  Loader2,
  RotateCw,
  Search,
  ZoomIn,
  ZoomOut,
  Maximize
} from 'lucide-react'
import { Document, Page, pdfjs } from 'react-pdf'

import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'
import { useToast } from './ui/use-toast'

import { useResizeDetector } from 'react-resize-detector'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { useState } from 'react'

import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { zodResolver } from '@hookform/resolvers/zod'
import { cn } from '@/lib/utils'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'

import SimpleBar from 'simplebar-react'
import PdfFullscreen from './PdfFullscreen'

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`

interface PdfRendererProps {
  url: string
}

const PdfRenderer = ({ url }: PdfRendererProps) => {
  const { toast } = useToast()

  const [numPages, setNumPages] = useState<number>()
  const [currPage, setCurrPage] = useState<number>(1)
  const [scale, setScale] = useState<number>(1)
  const [rotation, setRotation] = useState<number>(0)
  const [renderedScale, setRenderedScale] = useState<number | null>(null)

  const isLoading = renderedScale !== scale

  const CustomPageValidator = z.object({
    page: z
      .string()
      .refine(
        (num) => Number(num) > 0 && Number(num) <= numPages!
      ),
  })

  type TCustomPageValidator = z.infer<typeof CustomPageValidator>

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<TCustomPageValidator>({
    defaultValues: {
      page: '1',
    },
    resolver: zodResolver(CustomPageValidator),
  })

  const { width, ref } = useResizeDetector()

  const handlePageSubmit = ({ page }: TCustomPageValidator) => {
    setCurrPage(Number(page))
    setValue('page', String(page))
  }

  const nextPage = () => {
    if (currPage + 1 <= numPages!) {
      setCurrPage(currPage + 1)
      setValue('page', String(currPage + 1))
    }
  }

  const prevPage = () => {
    if (currPage - 1 >= 1) {
      setCurrPage(currPage - 1)
      setValue('page', String(currPage - 1))
    }
  }

  const zoomIn = () => {
    setScale((prev) => Math.min(prev + 0.1, 2))
  }

  const zoomOut = () => {
    setScale((prev) => Math.max(prev - 0.1, 0.5))
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
              onClick={prevPage}
              variant='ghost'
              size='sm'
              aria-label='previous page'>
              <ChevronUp className='h-4 w-4' />
            </Button>

            <div className='flex items-center gap-1.5'>
              <Input
                {...register('page')}
                className={cn(
                  'w-14 h-8',
                  errors.page && 'focus-visible:ring-red-500'
                )}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSubmit(handlePageSubmit)()
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
              onClick={nextPage}
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
              onClick={zoomOut}
              variant='ghost'
              size='sm'
              aria-label='zoom out'>
              <ZoomOut className='h-4 w-4' />
            </Button>
            
            <span className='text-sm text-gray-600 w-12 text-center'>
              {Math.round(scale * 100)}%
            </span>
            
            <Button
              onClick={zoomIn}
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
              onLoadError={() => {
                toast({
                  title: 'Error loading PDF',
                  description: 'Please try again later',
                  variant: 'destructive',
                })
              }}
              onLoadSuccess={({ numPages }) => setNumPages(numPages)}
              file={url}
              className='max-h-full'>
              {isLoading && renderedScale ? (
                <Page
                  width={width ? width : 1}
                  pageNumber={currPage}
                  scale={scale}
                  rotate={rotation}
                  key={'@' + renderedScale}
                />
              ) : null}

              <Page
                className={cn(isLoading ? 'hidden' : '')}
                width={width ? width : 1}
                pageNumber={currPage}
                scale={scale}
                rotate={rotation}
                key={'@' + scale}
                loading={
                  <div className='flex justify-center'>
                    <Loader2 className='my-24 h-6 w-6 animate-spin' />
                  </div>
                }
                onRenderSuccess={() => setRenderedScale(scale)}
              />
            </Document>
          </div>
        </SimpleBar>
      </div>
    </div>
  )
}

export default PdfRenderer
