import { handleAuth, type AuthEndpoints } from '@kinde-oss/kinde-auth-nextjs/server'
import { NextRequest } from 'next/server'

export async function GET(
  request: NextRequest,
  { params }: { params: { kindeAuth: string } }
) {
  // Convert the param to the expected enum type
  const endpoint = params.kindeAuth as AuthEndpoints
  return handleAuth(request, endpoint)
}

export async function POST(
  request: NextRequest,
  { params }: { params: { kindeAuth: string } }
) {
  // Convert the param to the expected enum type
  const endpoint = params.kindeAuth as AuthEndpoints
  return handleAuth(request, endpoint)
}
