import type { NextApiRequest, NextApiResponse } from 'next';
import Products from '../../../db/models/Products';
import connectDB from '../../../db/connectDB';

const product = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  connectDB();
  try {
    switch (req.method) {
      case 'GET':
        return getProduct(req, res);

      case 'DELETE':
        return deleteProduct(req, res);

      default:
        break;
    }
  } catch (error) {
    res.status(500).json({ error: true, message: error });
  }
};

const getProduct = async (req: NextApiRequest, res: NextApiResponse) => {
  const { pid } = req.query;
  const product = await Products.findOne({ _id: pid });

  res.status(200).json({ error: false, payload: product });
};

const deleteProduct = async (req: NextApiRequest, res: NextApiResponse) => {
  const { pid } = req.query;
  await Products.findByIdAndDelete({ _id: pid });
  res.status(200).json({ error: false, message: 'Product deleted' });
};

export default product;
