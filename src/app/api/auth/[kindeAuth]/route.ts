import { handleAuth } from '@kinde-oss/kinde-auth-nextjs/server';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Construct an options object. The actual structure depends on handleAuth's requirements.
  const options = {
    // Example property - replace with actual required properties
    endpoint: req.query.kindeAuth as string,
  };

  // Call handleAuth with the options object.
  await handleAuth(options);

  // Since handleAuth should handle the response, no need to send a response here.
}
