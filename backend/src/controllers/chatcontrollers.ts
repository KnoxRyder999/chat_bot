import { Request, Response } from 'express';
import { ChatCompletionUserMessageParam } from 'openai/resources/index.mjs';
import { configureOpenAI } from '../config/openaiConfig.js';
import User from '../models/User.js';

export const generateChatCompletion = async (req: Request, res: Response) => {
  const { message } = req.body;
  try {
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res.status(401).send('User not registered OR Token malfunctioned');
    }

    const chats = user.chats.map(({ role, content }) => ({
      role,
      content,
    })) as ChatCompletionUserMessageParam[];
    // après la flèche de la fonction (=>) les parenthèses sont nécessaires pour indiquer que ce qui suit est un objet littéral, et non un bloc de code.
    chats.push({ content: message, role: 'user' });
    user.chats.push({ content: message, role: 'user' });

    // send chats to openAI
    const openai = configureOpenAI();
    const chatCompletion = await openai.chat.completions.create({
      messages: [{ role: 'user', content: message }],
      model: 'gpt-3.5-turbo',
    });
    console.log(chatCompletion.choices[0].message);
    user.chats.push(chatCompletion.choices[0].message);
    await user.save();
    return res.status(200).json({ chats: user.chats });
  } catch (error) {
    console.log('🙀 ~ error:', error);
    return res.status(500).json({ message: 'Something went wrong: ' });
  }
};
