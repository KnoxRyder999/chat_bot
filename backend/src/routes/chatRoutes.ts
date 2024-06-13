import { Router } from 'express';
import { generateChatCompletion } from '../controllers/chatcontrollers.js';
import { verifyToken } from '../utils/tokenManager.js';
import { chatCompletionValidator, validate } from '../utils/validators.js';

const chatRoutes = Router();

chatRoutes.post(
  '/new',
  validate(chatCompletionValidator),
  verifyToken,
  generateChatCompletion
);

export default chatRoutes;
