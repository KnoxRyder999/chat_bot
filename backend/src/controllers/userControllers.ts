import { hash } from 'bcrypt';
import { NextFunction, Request, Response } from 'express';
import User from '../models/User.js';

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await User.find();
    return res.status(200).json({ message: 'OK', users });
  } catch (error) {
    console.log('🙀 ~ getAllUsers ~ error:', error);
    return res
      .status(500)
      .json({ message: "can't get all users", cause: error });
  }
};
export const userSignup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    newUser.save();
    return res.status(200).json({
      message: 'A new user has been created',
      id: newUser._id.toString(),
    });
  } catch (error) {
    console.log('🙀 ~ getAllUsers ~ error:', error);
    return res
      .status(500)
      .json({ message: 'Error during signup', cause: error });
  }
};
