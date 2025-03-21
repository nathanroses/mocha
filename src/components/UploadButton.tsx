'use client'

import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from './ui/dialog'
import { Button } from './ui/button'
import Dropzone from 'react-dropzone'
import { Cloud, File, Loader2, UploadCloud } from 'lucide-react'
import { Progress } from './ui/progress'
import { useUploadThing } from '@/lib/uploadthing'
import { useToast } from './ui/use-toast'
import { trpc } from '@/app/_trpc/client'
import { useRouter } from 'next/navigation'

const UploadDropzone = ({
  isSubscribed,
}: {
  isSubscribed: boolean
}) => {
  const router = useRouter()
  const [isUploading, setIsUploading] = useState<boolean>(false)
  const [uploadProgress, setUploadProgress] = useState<number>(0)
  const { toast } = useToast()

  const { startUpload } = useUploadThing(
    isSubscribed ? 'proPlanUploader' : 'freePlanUploader'
  )

  const { mutate: startPolling } = trpc.getFile.useMutation({
    onSuccess: (file) => {
      router.push(`/dashboard/${file.id}`)
    },
    retry: true,
    retryDelay: 500,
  })

  const startSimulatedProgress = () => {
    setUploadProgress(0)

    const interval = setInterval(() => {
      setUploadProgress((prevProgress) => {
        if (prevProgress >= 95) {
          clearInterval(interval)
          return prevProgress
        }
        return prevProgress + 5
      })
    }, 500)

    return interval
  }

  return (
    <Dropzone
      multiple={false}
      onDrop={async (acceptedFile) => {
        setIsUploading(true)

        const progressInterval = startSimulatedProgress()

        // handle file uploading
        const res = await startUpload(acceptedFile)

        if (!res) {
          return toast({
            title: 'Something went wrong',
            description: 'Please try again later',
            variant: 'destructive',
          })
        }

        const [fileResponse] = res
        const key = fileResponse?.key

        if (!key) {
          return toast({
            title: 'Something went wrong',
            description: 'Please try again later',
            variant: 'destructive',
          })
        }

        clearInterval(progressInterval)
        setUploadProgress(100)

        startPolling({ key })
      }}>
      {({ getRootProps, getInputProps, acceptedFiles }) => (
        <div
          {...getRootProps()}
          className='h-64 m-4 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200 ease-in-out'>
          <div className='flex items-center justify-center h-full w-full'>
            <label
              htmlFor='dropzone-file'
              className='flex flex-col items-center justify-center w-full h-full rounded-lg cursor-pointer'>
              <div className='flex flex-col items-center justify-center pt-5 pb-6'>
                {!acceptedFiles.length ? (
                  <>
                    <UploadCloud className='h-10 w-10 text-blue-500 mb-3' />
                    <p className='mb-2 text-sm text-center font-semibold text-gray-700'>
                      <span className='font-bold'>Click to upload</span> or drag and drop
                    </p>
                    <p className='text-xs text-gray-500 text-center'>
                      PDF (up to {isSubscribed ? "16MB" : "4MB"})
                    </p>
                  </>
                ) : (
                  <>
                    <div className='max-w-xs bg-white flex items-center rounded-md overflow-hidden border border-gray-200 p-1'>
                      <File className='h-6 w-6 text-blue-500 mx-2' />
                      <div className='px-3 py-2 h-full text-sm truncate'>
                        {acceptedFiles[0].name}
                      </div>
                    </div>
                  </>
                )}
              </div>

              {isUploading && (
                <div className='w-full mt-4 max-w-xs mx-auto'>
                  <Progress
                    value={uploadProgress}
                    className='h-2 w-full bg-gray-200'
                  />
                  <div className='flex justify-center items-center text-sm text-gray-500 gap-1 mt-2'>
                    {uploadProgress === 100 ? (
                      <>
                        <Loader2 className='h-3 w-3 animate-spin' />
                        Processing PDF...
                      </>
                    ) : (
                      <>
                        <Loader2 className='h-3 w-3 animate-spin' />
                        Uploading... {uploadProgress}%
                      </>
                    )}
                  </div>
                </div>
              )}

              <input
                {...getInputProps()}
                type='file'
                id='dropzone-file'
                className='hidden'
              />
            </label>
          </div>
        </div>
      )}
    </Dropzone>
  )
}

const UploadButton = ({
  isSubscribed,
  variant = "default"
}: {
  isSubscribed: boolean
  variant?: "default" | "outline"
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(v) => {
        if (!v) {
          setIsOpen(v)
        }
      }}>
      <DialogTrigger
        onClick={() => setIsOpen(true)}
        asChild>
        <Button variant={variant} className='gap-1.5'>
          <Cloud className='h-4 w-4 mr-1.5' />
          Upload PDF
        </Button>
      </DialogTrigger>

      <DialogContent>
        <div className="font-semibold text-xl mb-4">Upload PDF Document</div>
        <div className="text-sm text-gray-500 mb-6">
          Upload your PDF document to start chatting with it. We'll process it for you.
        </div>
        <UploadDropzone isSubscribed={isSubscribed} />
      </DialogContent>
    </Dialog>
  )
}

export default UploadButton
