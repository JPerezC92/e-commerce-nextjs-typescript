import { ISession } from '@/types/*';
import { verify } from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';

const session = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  try {
    const auth = req.cookies.auth || '';
    const payload: any = verify(auth, process.env.JWT_SECRET_KEY);

    delete payload.iat;
    delete payload.exp;

    const session = payload as ISession;

    if (!session?.isLoggedIn) {
      return res
        .status(200)
        .json({ error: true, message: 'Not active session' });
    }

    return res.status(200).json({ error: false, session: payload });
  } catch (error) {
    return res.status(200).json({ error: true, message: error });
  }
};

export default session;
