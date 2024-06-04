import { compare, hash } from 'bcrypt';
import { NextFunction, Request, Response } from 'express';
import User from '../models/User.js';
import { COOKIE_NAME } from '../utils/constants.js';
import { createToken } from '../utils/tokenManager.js';

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await User.find();
    return res.status(201).json({ message: 'Here is all users', users });
  } catch (error) {
    console.log('🙀 ~ getAllUsers ~ error:', error);
    return res
      .status(500)
      .json({ message: "can't get all users", cause: error });
  }
};

export const userSignup = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = User.findOne({ email });
    if (existingUser) return res.status(401).send('User already registered');
    const hashedPassword = await hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    user.save();

    // create token and store cookie

    res.clearCookie(COOKIE_NAME, {
      path: '/',
      domain: 'localhost',
      httpOnly: true,
      signed: true,
    });

    const token = createToken(user._id.toString(), user.email, '7d');
    const expires = new Date();
    expires.setDate(expires.getDate() + 7);
    res.cookie(COOKIE_NAME, token, {
      path: '/',
      domain: 'localhost',
      expires,
      httpOnly: true,
      signed: true,
      // secure: true, // Make sure you use HTTPS in production
    });

    return res.status(200).json({
      message: 'A new user has been created',
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    console.log('🙀 ~ getAllUsers ~ error:', error);
    return res
      .status(500)
      .json({ message: 'Error during signup', cause: error });
  }
};

export const userLogin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).send('User not registered');
    const isPasswordCorrect = await compare(password, user.password);
    if (!isPasswordCorrect) return res.status(403).send('Incorrect password');

    // create token and store cookie

    res.clearCookie(COOKIE_NAME, {
      path: '/',
      domain: 'localhost',
      httpOnly: true,
      signed: true,
    });

    const token = createToken(user._id.toString(), user.email, '7d');
    const expires = new Date();
    expires.setDate(expires.getDate() + 7);
    res.cookie(COOKIE_NAME, token, {
      path: '/',
      domain: 'localhost',
      expires,
      httpOnly: true,
      signed: true,
      // secure: true, // Make sure you use HTTPS in production
    });

    return res.status(200).json({
      message: 'Successfully logged',
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    console.log('🙀 ~ getAllUsers ~ error:', error);
    return res
      .status(500)
      .json({ message: 'Error during signup', cause: error });
  }
};
