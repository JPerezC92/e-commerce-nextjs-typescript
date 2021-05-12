import connectDB from 'db/connectDB';
import Baskets from 'db/models/Baskets';
import { FunctionRequest, IBasketReq } from '@/types/*';
import { NextApiRequest, NextApiResponse } from 'next';

const basket: FunctionRequest = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  await connectDB();
  try {
    switch (req.method) {
      case 'GET':
        return getBasketById(req, res);

      case 'POST':
        return updateBasket(req, res);

      default:
        break;
    }
  } catch (error) {
    res.status(500).json({ error: true, message: error });
  }
};

const updateBasket: FunctionRequest = async (req, res) => {
  const id = req.query.id as string;
  const { basketProducts } = req.body as IBasketReq;
  const basket = await Baskets.findByIdAndUpdate(id, { items: basketProducts });

  res.status(200).json({ error: false, payload: basket });
};

const getBasketById: FunctionRequest = async (req, res) => {
  const id = req.query.id as string;
  const basket = await Baskets.findOne({ _id: id });

  res.status(200).json({ error: false, payload: basket });
};

export default basket;
