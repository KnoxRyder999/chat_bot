import { Router } from 'express';
import chatRoutes from './chatRoutes.js';
import userRoutes from './userRoutes.js';

const appRouter = Router();

appRouter.use('/test', () => console.log('test route'));
appRouter.use('/user', userRoutes);
appRouter.use('/chat', chatRoutes);

export default appRouter;
