import { handleAuth } from '@kinde-oss/kinde-auth-nextjs/server';
import { NextApiRequest, NextApiResponse } from 'next';

// Function to handle GET requests
export async function get(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Assuming handleAuth requires an options object
  const options = {
    endpoint: req.query.kindeAuth as string,
    // Include other properties as required by handleAuth
  };

  try {
    // Call handleAuth with the options object
    await handleAuth(options);

    // handleAuth should manage the response
  } catch (error) {
    // Handle any errors
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
