import cookieParser from 'cookie-parser';
import { config } from 'dotenv';
import express from 'express';
import morgan from 'morgan';
import appRouter from './routes/index.js';

config();
const app = express();

// Middleware pour analyser les corps de requête JSON
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));

// remove it in production
app.use(morgan('dev'));

app.use('/api/v1', appRouter);

export default app;
