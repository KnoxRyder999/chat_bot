import { NextFunction, Request, Response } from 'express';
import User from '../models/User.js';

export const generateChatCompletion = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { message } = req.body;
  const user = await User.findById(res.locals.jwtData.id);
  if (!user) {
    return res.status(401).send('User not registered OR Token malfunctioned');
  }

  const chats = user.chats.map(({ role, content }) => ({ role, content }));
  chats.push({ content: message, role: 'user' });

  // après la flèche de la fonction (=>) les parenthèses sont nécessaires pour indiquer que ce qui suit est un objet littéral, et non un bloc de code.

  //   const chatCompletion = await configureOpenAI.chat.completions.create({
  //     model: 'gpt-3.5-turbo',
  //     messages: [{ role: 'user', content: 'Hello!' }],
  //   });
  // console.log(chatCompletion.choices[0].message);
};
