import { Router } from 'express';
import {
  getAllUsers,
  userLogin,
  userSignup,
} from '../controllers/userControllers.js';
import {
  loginValidation,
  signupValidator,
  validate,
} from '../utils/validators.js';

const userRoutes = Router();

userRoutes.get('/', getAllUsers);
userRoutes.post('/signup', validate(signupValidator), userSignup);
userRoutes.post('/login', validate(loginValidation), userLogin);

export default userRoutes;
