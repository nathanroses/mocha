import Link from 'next/link';
import MaxWidthWrapper from './MaxWidthWrapper';
import { buttonVariants } from './ui/button';
import {
  LoginLink,
  RegisterLink,
  getKindeServerSession,
} from '@kinde-oss/kinde-auth-nextjs/server';
import { ArrowRight } from 'lucide-react';
import UserAccountNav from './UserAccountNav';
import MobileNav from './MobileNav';
import Image from 'next/image';

const Navbar = () => {
  const { getUser } = getKindeServerSession();
  const user = getUser();

  return (
    <nav className='sticky h-16 inset-x-0 top-0 z-30 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all'>
      <MaxWidthWrapper>
        <div className='flex h-16 items-center justify-between'>
          <Link href='/' className='flex items-center gap-2 z-40'>
            <div className="flex items-center">
              <Image src='/mocha.png' alt='Mocha Logo' width={40} height={40} className="mr-2" />
              <span className="font-semibold text-xl text-gray-800">Mocha</span>
            </div>
          </Link>

          <MobileNav isAuth={!!user} />

          <div className='hidden items-center space-x-4 sm:flex'>
            {!user ? (
              <>
                <Link
                  href='/pricing'
                  className={buttonVariants({
                    variant: 'ghost',
                    size: 'sm',
                  })}>
                  Pricing
                </Link>
                <LoginLink
                  className={buttonVariants({
                    variant: 'ghost',
                    size: 'sm',
                  })}>
                  Sign in
                </LoginLink>
                <RegisterLink
                  className={buttonVariants({
                    size: 'sm',
                  })}>
                  Sign up
                  <ArrowRight className='ml-1.5 h-4 w-4' />
                </RegisterLink>
              </>
            ) : (
              <>
                <Link
                  href='/dashboard'
                  className={buttonVariants({
                    variant: 'ghost',
                    size: 'sm',
                  })}>
                  Dashboard
                </Link>

                <UserAccountNav
                  name={
                    !user.given_name || !user.family_name
                      ? 'Your Account'
                      : `${user.given_name} ${user.family_name}`
                  }
                  email={user.email ?? ''}
                  imageUrl={user.picture ?? ''}
                />
              </>
            )}
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  );
};

export default Navbar;
