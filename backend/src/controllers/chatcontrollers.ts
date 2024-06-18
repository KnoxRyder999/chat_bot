import { Request, Response } from 'express';
import OpenAI from 'openai';
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

    // après la flèche de la fonction (=>) les parenthèses sont nécessaires pour indiquer que ce qui suit est un objet littéral, et non un bloc de code.
    const chats = user.chats.map(({ role, content }) => ({
      role,
      content,
    })) as ChatCompletionUserMessageParam[];

    chats.push({ content: message, role: 'user' });
    user.chats.push({ content: message, role: 'user' });

    // send chats to openAI
    const config = configureOpenAI();
    const openai = new OpenAI({ apiKey: config.apiKey });

    const params: OpenAI.Chat.ChatCompletionCreateParams = {
      messages: [{ role: 'user', content: message }],
      model: 'gpt-3.5-turbo',
    };

    const chatCompletion = await openai.chat.completions.create(params);
    console.log(
      '🚀 ~ generateChatCompletion ~ chatCompletion:',
      chatCompletion
    );

    console.log(chatCompletion.choices[0].message);
    user.chats.push(chatCompletion.choices[0].message);
    await user.save();
    return res.status(200).json({ chats: user.chats });
  } catch (error) {
    console.log('🙀 ~ error:', error);
    return res.status(500).json({ message: 'Something went wrong: ' });
  }
};

export const getUserChats = async (req: Request, res: Response) => {
  try {
    // User Token verification
    const user = await User.findById(res.locals.jwtData.id);
    if (!user)
      return res.status(401).send('User not registered OR Token malfunctioned');
    if (user._id.toString() !== res.locals.jwtData.id)
      return res.status(403).send("Permissions didn't match");

    return res.status(200).json({
      message: 'Messages',
      chats: user.chats,
    });
  } catch (error) {
    console.log('🙀 ~ verifyUser ~ ERROR:', error);
    return res.status(500).json({ message: 'ERROR', cause: error.message });
  }
};
