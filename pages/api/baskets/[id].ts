import connectDB from 'db/connectDB';
import Baskets from 'db/models/Baskets';
import { FunctionRequest, IBasketReq } from '@/types/*';
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { verify } from 'jsonwebtoken';
import process from 'process';

const authenticated = (fn: NextApiHandler) => async (req: NextApiRequest, res: NextApiResponse) => {
  const auth = req.cookies.auth;
  verify(auth, process.env.JWT_SECRET_KEY, (err, decoded) => {
    if (!err && decoded) return fn(req, res);

    return res.status(401).json({ error: true, message: 'Sorry, you are not authenticated' });
  });
};

const basket: FunctionRequest = async (req, res): Promise<void> => {
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

export default authenticated(basket);
