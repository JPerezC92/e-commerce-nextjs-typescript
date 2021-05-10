import type { NextApiRequest, NextApiResponse } from 'next';
import connectDB from 'db/connectDB';
import Products from 'db/models/Products';

const products = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  try {
    await connectDB();
    const products = await Products.find();
    res.status(200).json({ error: false, payload: products });
  } catch (error) {
    res.status(500).json({ error: true, message: error });
  }
};

export default products;
