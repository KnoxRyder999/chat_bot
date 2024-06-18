import { Router } from 'express';
import {
  generateChatCompletion,
  getUserChats,
} from '../controllers/chatControllers.js';
import { verifyToken } from '../utils/tokenManager.js';
import { chatCompletionValidator, validate } from '../utils/validators.js';

const chatRoutes = Router();

chatRoutes.post(
  '/new',
  validate(chatCompletionValidator),
  verifyToken,
  generateChatCompletion
);
chatRoutes.get('/all-chats', verifyToken, getUserChats);

export default chatRoutes;
