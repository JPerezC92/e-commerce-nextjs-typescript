import type { NextApiRequest, NextApiResponse } from 'next';
import { hash } from 'bcrypt';
import connectDB from 'db/connectDB';
import Users from 'db/models/Users';
import Baskets from 'db/models/Baskets';

const signup = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  try {
    await connectDB();

    const emailIsRegistered = await Users.find({ email: req.body.email });

    if (emailIsRegistered.length > 0)
      return res.status(200).json({
        error: true,
        message: `Email ${emailIsRegistered[0].email} is already registered`,
      });

    const newBasket = await Baskets.create({ items: [] });
    const newBasketId = newBasket._id;

    req.body.password = await hash(req.body.password, 10);

    const user = await Users.create({ ...req.body, basketId: `${newBasketId}` });

    console.log({ user });

    return res.status(200).json({ error: false, message: 'Account created successfully' });
  } catch (error) {
    res.status(500).json({ error: true, message: error || 'Error creating account' });
  }
};

export default signup;
