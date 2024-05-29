import { Router } from 'express';
import { getAllUsers } from '../controllers/userControllers.js';

const userRoutes = Router();

userRoutes.get('/test', function (req, res) {
  console.log('🚀 ~ res:', res);
  res.sendFile('test.html', { root: __dirname });
});
userRoutes.get('/', getAllUsers);

export default userRoutes;
