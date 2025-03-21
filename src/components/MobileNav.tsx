'use client'

import { ArrowRight, Menu, X } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Button } from './ui/button'

const MobileNav = ({ isAuth }: { isAuth: boolean }) => {
  const [isOpen, setOpen] = useState<boolean>(false)

  const toggleOpen = () => setOpen((prev) => !prev)

  const pathname = usePathname()

  // Close the mobile menu when changing routes
  useEffect(() => {
    if (isOpen) toggleOpen()
  }, [pathname])

  return (
    <div className='sm:hidden'>
      <Button
        onClick={toggleOpen}
        variant='ghost'
        className='relative z-50 h-10 w-10 p-0'
        aria-label='Toggle mobile menu'
      >
        {isOpen ? (
          <X className='h-5 w-5 text-gray-700' />
        ) : (
          <Menu className='h-5 w-5 text-gray-700' />
        )}
      </Button>

      {isOpen && (
        <div className='fixed inset-0 z-40 animate-in fade-in-20 slide-in-from-top-5'>
          <div className='absolute inset-0 bg-gray-50/90 backdrop-blur-sm' onClick={toggleOpen} />
          <nav className='absolute left-0 top-0 w-full h-screen bg-white shadow-xl p-6 flex flex-col'>
            <div className='h-16 border-b border-gray-100 flex items-center justify-between'>
              <Link href="/" className="font-semibold text-xl" onClick={toggleOpen}>
                Mocha
              </Link>
              <Button onClick={toggleOpen} variant='ghost' className='p-0 h-10 w-10'>
                <X className='h-5 w-5 text-gray-700' />
              </Button>
            </div>

            <ul className='mt-8 flex flex-col gap-5'>
              {!isAuth ? (
                <>
                  <li>
                    <Link
                      onClick={toggleOpen}
                      className='flex items-center w-full font-medium text-lg text-gray-800 hover:text-blue-600 transition-colors'
                      href='/dashboard'>
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link
                      onClick={toggleOpen}
                      className='flex items-center w-full font-medium text-lg text-gray-800 hover:text-blue-600 transition-colors'
                      href='/pricing'>
                      Pricing
                    </Link>
                  </li>
                  <li className='my-3 h-px w-full bg-gray-200' />
                  <li>
                    <Link
                      onClick={toggleOpen}
                      className='flex items-center w-full font-medium text-lg text-gray-800 hover:text-blue-600 transition-colors'
                      href='/sign-in'>
                      Sign in
                    </Link>
                  </li>
                  <li>
                    <Link
                      onClick={toggleOpen}
                      className='mt-4 flex items-center justify-center rounded-md bg-blue-600 px-4 py-3 text-white hover:bg-blue-700 transition-colors'
                      href='/sign-up'>
                      Get started
                      <ArrowRight className='ml-2 h-5 w-5' />
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link
                      onClick={toggleOpen}
                      className='flex items-center w-full font-medium text-lg text-gray-800 hover:text-blue-600 transition-colors'
                      href='/dashboard'>
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link
                      onClick={toggleOpen}
                      className='flex items-center w-full font-medium text-lg text-gray-800 hover:text-blue-600 transition-colors'
                      href='/pricing'>
                      Pricing
                    </Link>
                  </li>
                  <li className='my-3 h-px w-full bg-gray-200' />
                  <li>
                    <Link
                      onClick={toggleOpen}
                      className='flex items-center w-full font-medium text-lg text-gray-800 hover:text-blue-600 transition-colors'
                      href='/sign-out'>
                      Sign out
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </div>
      )}
    </div>
  )
}

export default MobileNav
