import { Router } from 'express';
import {
  getAllUsers,
  userLogin,
  userLogout,
  userSignup,
  verifyUser,
} from '../controllers/userControllers.js';
import { verifyToken } from '../utils/tokenManager.js';
import {
  loginValidation,
  signupValidator,
  validate,
} from '../utils/validators.js';

const userRoutes = Router();

userRoutes.get('/', getAllUsers);
userRoutes.post('/signup', validate(signupValidator), userSignup);
userRoutes.post('/login', validate(loginValidation), userLogin);
userRoutes.get('/auth-status', verifyToken, verifyUser);
userRoutes.get('/logout', verifyToken, userLogout);

export default userRoutes;
