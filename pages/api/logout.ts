import type { NextApiRequest, NextApiResponse } from 'next';
import cookie from 'cookie';

const logout = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  if (req.method === 'DELETE') {
    try {
      res.setHeader(
        'Set-Cookie',
        cookie.serialize('auth', '', {
          httpOnly: true,
          secure: process.env.NODE_ENV !== 'development',
          sameSite: 'strict',
          maxAge: 3600,
          path: '/',
        })
      );

      return res.status(200).json({
        error: false,
        message: 'Come back soon!',
      });
    } catch (error) {
      return res.status(500).json({ error: true, message: error });
    }
  }
};

export default logout;
