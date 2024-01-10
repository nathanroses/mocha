import { handleAuth } from '@kinde-oss/kinde-auth-nextjs/server'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  request: NextRequest,
  { params }: any
): Promise<NextResponse> {
  const endpoint = params.kindeAuth;
  const response: any = await handleAuth(request, endpoint);

  // You can modify the response if needed before returning it.
  // For example, you can set headers or status codes.

  return response;
}
