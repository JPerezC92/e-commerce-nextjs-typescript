import type { NextApiRequest, NextApiResponse } from 'next';
import { hash } from 'db/Utils/bcrypt.min.js';
import connectDB from 'db/connectDB';
import Users from 'db/models/Users';
import Baskets from 'db/models/Baskets';

interface ISignupBody {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const signup = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  try {
    await connectDB();

    const values = { ...req.body } as ISignupBody;

    const emailIsRegistered = await Users.find({ email: values.email });

    if (emailIsRegistered.length > 0)
      return res.status(200).json({
        error: true,
        message: `Email ${emailIsRegistered[0].email} is already registered`,
      });

    const newBasket = await Baskets.create({ items: [] });
    const newBasketId = newBasket._id;

    values.password = await hash(values.password, 10);

    const user = await Users.create({ ...values, basketId: `${newBasketId}` });

    if (user._id)
      return res
        .status(200)
        .json({ error: false, message: 'Account created successfully' });

    return res
      .status(500)
      .json({ error: true, message: 'Error creating account' });
  } catch (error) {
    return res
      .status(500)
      .json({ error: true, message: error || 'Error creating account' });
  }
};

export default signup;
