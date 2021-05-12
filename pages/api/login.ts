import type { NextApiRequest, NextApiResponse } from 'next';
import { sign } from 'jsonwebtoken';
import cookie from 'cookie';
import { compare } from 'bcrypt';
import connectDB from 'db/connectDB';
import Users from 'db/models/Users';

interface ISignupBody {
  email: string;
  password: string;
}

interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  basketId: string;
}

const login = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  try {
    await connectDB();

    const values = { ...req.body } as ISignupBody;
    const emailIsRegistered = await Users.find({ email: values.email });

    if (emailIsRegistered.length === 0)
      return res.status(200).json({
        error: true,
        message: `Email ${emailIsRegistered[0].email} isn't registered`,
      });

    const user = emailIsRegistered[0] as IUser;
    const isValid = await compare(values.password, user.password);

    if (!isValid)
      return res
        .status(401)
        .json({ error: true, message: 'El email o contraseña es incorrecto' });

    const claims = {
      isLoggedIn: true,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      basketId: user.basketId,
    };
    const jwt =
      sign(claims, process.env.JWT_SECRET_KEY, { expiresIn: '1h' }) || 'here';

    res.setHeader(
      'Set-Cookie',
      cookie.serialize('auth', jwt, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'strict',
        maxAge: 3600,
        path: '/',
      })
    );

    return res
      .status(200)
      .json({
        error: false,
        message: 'Welcome back to the app!',
        session: claims,
      });
  } catch (error) {
    return res
      .status(500)
      .json({ error: true, message: 'Error creating account' });
  }
};

export default login;
