'use client'

import { trpc } from '@/app/_trpc/client'
import UploadButton from './UploadButton'
import {
  Ghost,
  Loader2,
  MessageSquare,
  Calendar,
  Trash,
} from 'lucide-react'
import Skeleton from 'react-loading-skeleton'
import Link from 'next/link'
import { format } from 'date-fns'
import { Button } from './ui/button'
import { useState } from 'react'
import { getUserSubscriptionPlan } from '@/lib/stripe'

interface PageProps {
  subscriptionPlan: Awaited<ReturnType<typeof getUserSubscriptionPlan>>
}

const Dashboard = ({subscriptionPlan}: PageProps) => {
  const [currentlyDeletingFile, setCurrentlyDeletingFile] = useState<string | null>(null)
  const utils = trpc.useContext()
  const { data: files, isLoading } = trpc.getUserFiles.useQuery()

  const { mutate: deleteFile } = trpc.deleteFile.useMutation({
    onSuccess: () => {
      utils.getUserFiles.invalidate()
    },
    onMutate({ id }) {
      setCurrentlyDeletingFile(id)
    },
    onSettled() {
      setCurrentlyDeletingFile(null)
    },
  })

  return (
    <main className='mx-auto max-w-7xl p-4 md:p-10'>
      <div className='mt-8 flex flex-col items-start justify-between gap-4 border-b border-gray-200 pb-5 sm:flex-row sm:items-center sm:gap-0'>
        <h1 className='mb-3 font-bold text-4xl text-gray-900'>My Documents</h1>
        <UploadButton isSubscribed={subscriptionPlan.isSubscribed} />
      </div>

      {/* Display user files */}
      {files && files?.length !== 0 ? (
        <ul className='mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
          {files
            .sort(
              (a, b) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
            )
            .map((file) => (
              <li
                key={file.id}
                className='col-span-1 rounded-lg bg-white shadow transition hover:shadow-lg border border-gray-200'>
                <Link
                  href={`/dashboard/${file.id}`}
                  className='flex flex-col gap-2'>
                  <div className='p-6 flex w-full items-center justify-between'>
                    <div className='flex items-center space-x-4'>
                      <div className='h-10 w-10 flex-shrink-0 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 flex items-center justify-center'>
                        <MessageSquare className='h-5 w-5 text-white' />
                      </div>
                      <div className='truncate'>
                        <h3 className='truncate text-lg font-medium text-gray-900'>
                          {file.name}
                        </h3>
                        <div className='mt-1 flex items-center text-sm text-gray-500'>
                          <Calendar className='mr-1 h-4 w-4 flex-shrink-0' />
                          <span>{format(new Date(file.createdAt), 'MMM d, yyyy')}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
                
                <div className='border-t border-gray-200 px-6 py-3 flex justify-between items-center'>
                  <span className='text-xs text-gray-500'>
                    {file.uploadStatus === 'SUCCESS' ? 'Ready to chat' : 'Processing...'}
                  </span>
                  <Button
                    onClick={() => deleteFile({ id: file.id })}
                    size='sm'
                    variant='destructive'
                    className='h-8 w-8 p-0'>
                    {currentlyDeletingFile === file.id ? (
                      <Loader2 className='h-4 w-4 animate-spin' />
                    ) : (
                      <Trash className='h-4 w-4' />
                    )}
                  </Button>
                </div>
              </li>
            ))}
        </ul>
      ) : isLoading ? (
        <div className='mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
          <Skeleton height={200} className='my-2' count={3} />
        </div>
      ) : (
        <div className='mt-16 flex flex-col items-center gap-4 py-12 border border-dashed border-gray-300 rounded-lg bg-gray-50'>
          <Ghost className='h-12 w-12 text-gray-400' />
          <h3 className='font-semibold text-xl text-gray-700'>
            No documents yet
          </h3>
          <p className='text-gray-500 text-center max-w-sm'>
            Upload your first PDF to start chatting with your documents. Your files will appear here.
          </p>
          <UploadButton isSubscribed={subscriptionPlan.isSubscribed} variant="outline" />
        </div>
      )}
    </main>
  )
}

export default Dashboard
