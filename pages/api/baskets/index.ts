import type { NextApiRequest, NextApiResponse } from 'next';

import connectDB from 'db/connectDB';
import Baskets from 'db/models/Baskets';

const baskets = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  try {
    await connectDB();

    const baskets = await Baskets.find();

    res.status(200).json({ error: false, payload: baskets });
  } catch (error) {
    res.status(500).json({ error: true, message: error });
  }
};

export default baskets;
