import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import Link from 'next/link'
import { ArrowRight, MessageSquare, FileText, Zap } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import Image from 'next/image'

export default function Home() {
  return (
    <>
      <MaxWidthWrapper className='mb-12 mt-28 sm:mt-40 flex flex-col items-center justify-center text-center'>
        <div className='mx-auto mb-4 flex max-w-fit items-center justify-center space-x-2 overflow-hidden rounded-full border border-gray-200 bg-white px-7 py-2 shadow-md backdrop-blur transition-all hover:border-gray-300 hover:bg-white/50'>
          <p className='text-sm font-semibold text-gray-700'>
            Mocha is now available for public use
          </p>
        </div>
        <h1 className='max-w-4xl text-5xl font-bold md:text-6xl lg:text-7xl'>
          Chat with your{' '}
          <span className='text-blue-600'>documents</span>{' '}
          in seconds.
        </h1>
        <p className='mt-5 max-w-prose text-zinc-700 sm:text-lg'>
          Mocha allows you to have conversations with any
          PDF document. Simply upload your file and start
          asking questions right away.
        </p>

        <Link
          className={buttonVariants({
            size: 'lg',
            className: 'mt-8 gap-1.5',
          })}
          href='/dashboard'>
          Get started
          <ArrowRight className='ml-1.5 h-5 w-5' />
        </Link>
      </MaxWidthWrapper>

      {/* value proposition section */}
      <div>
        <div className='relative isolate'>
          <div
            aria-hidden='true'
            className='pointer-events-none absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80'>
            <div
              style={{
                clipPath:
                  'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
              }}
              className='relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#3b82f6] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]'
            />
          </div>

          <div>
            <div className='mx-auto max-w-6xl px-6 lg:px-8'>
              <div className='mt-16 flow-root sm:mt-24'>
                <div className='-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4'>
                  <Image
                    src='/dashboard-preview.jpg'
                    alt='product preview'
                    width={1364}
                    height={866}
                    quality={100}
                    className='rounded-md bg-white p-2 sm:p-8 md:p-20 shadow-2xl ring-1 ring-gray-900/10'
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Feature section */}
      <div className='mx-auto mb-32 mt-32 max-w-5xl sm:mt-56'>
        <div className='mb-12 px-6 lg:px-8'>
          <div className='mx-auto max-w-2xl sm:text-center'>
            <h2 className='mt-2 font-bold text-4xl text-gray-900 sm:text-5xl'>
              Start chatting in minutes
            </h2>
            <p className='mt-4 text-lg text-gray-600'>
              Chatting to your PDF files has never been
              easier than with Mocha.
            </p>
          </div>
        </div>

        {/* Features */}
        <div className="mx-auto mt-16 max-w-5xl px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-16 sm:grid-cols-2 lg:grid-cols-3">
            {/* Feature 1 */}
            <div className="flex flex-col items-start">
              <div className="rounded-full bg-blue-600/10 p-3 text-blue-600">
                <FileText className="h-6 w-6" />
              </div>
              <h3 className="mt-6 text-xl font-semibold text-gray-900">Upload any PDF</h3>
              <p className="mt-2 text-gray-600">
                Mocha works with all kinds of PDF documents, from research papers to contracts and manuals.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="flex flex-col items-start">
              <div className="rounded-full bg-blue-600/10 p-3 text-blue-600">
                <Zap className="h-6 w-6" />
              </div>
              <h3 className="mt-6 text-xl font-semibold text-gray-900">Instant processing</h3>
              <p className="mt-2 text-gray-600">
                Our advanced AI quickly analyzes your document so you can start asking questions right away.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="flex flex-col items-start">
              <div className="rounded-full bg-blue-600/10 p-3 text-blue-600">
                <MessageSquare className="h-6 w-6" />
              </div>
              <h3 className="mt-6 text-xl font-semibold text-gray-900">Natural conversation</h3>
              <p className="mt-2 text-gray-600">
                Talk to your documents just like you would with a colleague who read them for you.
              </p>
            </div>
          </div>
        </div>

        {/* steps */}
        <ol className='my-16 space-y-4 pt-8 md:flex md:space-x-12 md:space-y-0'>
          <li className='md:flex-1'>
            <div className='flex flex-col space-y-2 border-l-4 border-blue-600 py-2 pl-4 md:border-l-0 md:border-t-2 md:pb-0 md:pl-0 md:pt-4'>
              <span className='text-sm font-medium text-blue-600'>
                Step 1
              </span>
              <span className='text-xl font-semibold'>
                Sign up for an account
              </span>
              <span className='mt-2 text-zinc-700'>
                Either starting out with a free plan or
                choose our{' '}
                <Link
                  href='/pricing'
                  className='text-blue-600 underline underline-offset-2'>
                  pro plan
                </Link>
                .
              </span>
            </div>
          </li>
          <li className='md:flex-1'>
            <div className='flex flex-col space-y-2 border-l-4 border-blue-600 py-2 pl-4 md:border-l-0 md:border-t-2 md:pb-0 md:pl-0 md:pt-4'>
              <span className='text-sm font-medium text-blue-600'>
                Step 2
              </span>
              <span className='text-xl font-semibold'>
                Upload your PDF file
              </span>
              <span className='mt-2 text-zinc-700'>
                We&apos;ll process your file and make it
                ready for you to chat with.
              </span>
            </div>
          </li>
          <li className='md:flex-1'>
            <div className='flex flex-col space-y-2 border-l-4 border-blue-600 py-2 pl-4 md:border-l-0 md:border-t-2 md:pb-0 md:pl-0 md:pt-4'>
              <span className='text-sm font-medium text-blue-600'>
                Step 3
              </span>
              <span className='text-xl font-semibold'>
                Start asking questions
              </span>
              <span className='mt-2 text-zinc-700'>
                It&apos;s that simple. Try out Mocha today -
                it really takes less than a minute.
              </span>
            </div>
          </li>
        </ol>

        <div className='mx-auto max-w-6xl px-6 lg:px-8'>
          <div className='mt-16 flow-root sm:mt-24'>
            <div className='-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4'>
               <Image
               src='/dashboard-preview 2.jpg'
               alt='uploading preview'
             width={1419}
            height={732}
           quality={100}
        className='rounded-md bg-white p-2 sm:p-8 md:p-20 shadow-2xl ring-1 ring-gray-900/10'
                 />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
