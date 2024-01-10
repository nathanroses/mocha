import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import UpgradeButton from '@/components/UpgradeButton'
import { buttonVariants } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { PLANS } from '@/config/stripe'
import { cn } from '@/lib/utils'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import {
  ArrowRight,
  Check,
  HelpCircle,
  Minus,
} from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const Page = () => {
  const { getUser } = getKindeServerSession()
  const [user, setUser] = useState(null)

  useEffect(() => {
    getUser().then(userData => setUser(userData))
  }, [getUser])

  const pricingItems = [
    {
      plan: 'Free',
      tagline: 'For small side projects.',
      quota: 10,
      features: [
        {
          text: '5 pages per PDF',
          footnote: 'The maximum amount of pages per PDF-file.',
        },
        {
          text: '4MB file size limit',
          footnote: 'The maximum file size of a single PDF file.',
        },
        {
          text: 'Mobile-friendly interface',
        },
        {
          text: 'Higher-quality responses',
          footnote: 'Better algorithmic responses for enhanced content quality',
          negative: true,
        },
        {
          text: 'Priority support',
          negative: true,
        },
      ],
    },
    {
      plan: 'Pro',
      tagline: 'For larger projects with higher needs.',
      quota: PLANS.find((p) => p.slug === 'pro')!.quota,
      features: [
        {
          text: '25 pages per PDF',
          footnote: 'The maximum amount of pages per PDF-file.',
        },
        {
          text: '16MB file size limit',
          footnote: 'The maximum file size of a single PDF file.',
        },
        {
          text: 'Mobile-friendly interface',
        },
        {
          text: 'Higher-quality responses',
          footnote: 'Better algorithmic responses for enhanced content quality',
        },
        {
          text: 'Priority support',
        },
      ],
    },
    // ... other plans if available
  ];

  return (
    <>
      <MaxWidthWrapper className='mb-8 mt-24 text-center max-w-5xl'>
        {/* Your JSX code for rendering the pricing page */}
        {/* Utilize 'pricingItems' and 'user' state variable as needed */}
      </MaxWidthWrapper>
    </>
  )
}

export default Page
