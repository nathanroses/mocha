import { getUserSubscriptionPlan } from '@/lib/stripe'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { Button } from './ui/button'
import { Avatar, AvatarFallback } from './ui/avatar'
import Image from 'next/image'
import { Icons } from './Icons'
import Link from 'next/link'
import { Gem, LogOut, Settings, User, FileText } from 'lucide-react'
import { LogoutLink } from '@kinde-oss/kinde-auth-nextjs/server'

interface UserAccountNavProps {
  email: string | undefined
  name: string
  imageUrl: string
}

const UserAccountNav = async ({
  email,
  imageUrl,
  name,
}: UserAccountNavProps) => {
  const subscriptionPlan = await getUserSubscriptionPlan()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        asChild
        className='overflow-visible'>
        <Button className='rounded-full h-10 w-10 aspect-square p-0 shadow-sm'>
          <Avatar className='relative w-10 h-10'>
            {imageUrl ? (
              <div className='relative aspect-square h-full w-full'>
                <Image
                  fill
                  src={imageUrl}
                  alt='profile picture'
                  referrerPolicy='no-referrer'
                  className='rounded-full'
                />
              </div>
            ) : (
              <AvatarFallback className='bg-gray-100 text-gray-700'>
                <User className='h-6 w-6' />
              </AvatarFallback>
            )}
          </Avatar>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className='bg-white shadow-lg rounded-lg border border-gray-200 p-1 w-64' align='end'>
        <div className='flex items-center justify-start gap-2 p-3 border-b border-gray-100'>
          <div className='flex flex-col space-y-0.5 leading-none'>
            {name && (
              <p className='font-medium text-base text-gray-800'>
                {name}
              </p>
            )}
            {email && (
              <p className='w-full truncate text-sm text-gray-600'>
                {email}
              </p>
            )}
            
            {/* Subscription badge */}
            <div className='mt-1.5'>
              {subscriptionPlan?.isSubscribed ? (
                <span className='inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800'>
                  <Gem className='w-3 h-3 mr-1' />
                  Pro Plan
                </span>
              ) : (
                <span className='inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800'>
                  Free Plan
                </span>
              )}
            </div>
          </div>
        </div>

        <div className='py-1'>
          <DropdownMenuItem asChild className='cursor-pointer py-2 px-3 text-sm text-gray-700 flex items-center gap-2 hover:bg-gray-50'>
            <Link href='/dashboard'>
              <FileText className='h-4 w-4 text-gray-500' />
              My Documents
            </Link>
          </DropdownMenuItem>
          
          <DropdownMenuItem asChild className='cursor-pointer py-2 px-3 text-sm text-gray-700 flex items-center gap-2 hover:bg-gray-50'>
            <Link href='/dashboard/billing'>
              {subscriptionPlan?.isSubscribed ? (
                <>
                  <Settings className='h-4 w-4 text-gray-500' />
                  Manage Subscription
                </>
              ) : (
                <>
                  <Gem className='h-4 w-4 text-blue-600' />
                  Upgrade to Pro
                </>
              )}
            </Link>
          </DropdownMenuItem>
        </div>

        <DropdownMenuSeparator />

        <DropdownMenuItem className='cursor-pointer py-2 px-3 text-sm text-gray-700 flex items-center gap-2 hover:bg-gray-50'>
          <LogoutLink className='w-full flex items-center gap-2'>
            <LogOut className='h-4 w-4 text-gray-500' />
            Log out
          </LogoutLink>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserAccountNav
