import type { NextApiRequest, NextApiResponse } from 'next';
import connectDB from 'db/connectDB';

const signup = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  try {
    await connectDB();

    console.log(req.body);

    res.status(200).json({ error: false, message: 'Account created successfully' });
  } catch (error) {
    res.status(500).json({ error: true, message: error });
  }
};

export default signup;
