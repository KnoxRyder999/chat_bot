import { Router } from 'express';
import {
  getAllUsers,
  userLogin,
  userLogout,
  userSignup,
  verifyUser,
} from '../controllers/userControllers.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { verifyToken } from '../utils/tokenManager.js';
import {
  loginValidation,
  signupValidator,
  validate,
} from '../utils/validators.js';

const userRoutes = Router();

userRoutes.get('/', asyncHandler(getAllUsers));
userRoutes.post('/signup', validate(signupValidator), asyncHandler(userSignup));
userRoutes.post('/login', validate(loginValidation), asyncHandler(userLogin));
userRoutes.get(
  '/auth-status',
  asyncHandler(verifyToken),
  asyncHandler(verifyUser)
);
userRoutes.get('/logout', asyncHandler(verifyToken), asyncHandler(userLogout));

export default userRoutes;
