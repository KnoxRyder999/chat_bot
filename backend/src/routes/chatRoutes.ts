import { Router } from 'express';
import {
  generateChatCompletion,
  getUserChats,
} from '../controllers/chatControllers.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { verifyToken } from '../utils/tokenManager.js';
import { chatCompletionValidator, validate } from '../utils/validators.js';

const chatRoutes = Router();

chatRoutes.post(
  '/new',
  validate(chatCompletionValidator),
  asyncHandler(verifyToken),
  asyncHandler(generateChatCompletion)
);

chatRoutes.get(
  '/all-chats',
  asyncHandler(verifyToken),
  asyncHandler(getUserChats)
);

export default chatRoutes;
