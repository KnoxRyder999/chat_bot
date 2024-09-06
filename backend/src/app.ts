import cookieParser from 'cookie-parser';
import cors from 'cors';
import { config } from 'dotenv';
import express from 'express';
import morgan from 'morgan';
import appRouter from './routes/index.js';

// import path from 'path';
// import { fileURLToPath } from 'url';

// Resolving dirname for ES module
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// console.log('🚀 ~ __dirname:', __dirname);
// const clientPath = path.join(__dirname, '/frontend');
// console.log('🚀 ~ clientPath:', clientPath);

config();
const app = express();

// Middleware pour analyser les corps de requête JSON
app.use(cors({ origin: process.env.FRONT_URL, credentials: true }));
console.log('🚀 ~ process.env.FRONT_URL:', process.env.FRONT_URL);
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));

// remove it in production
app.use(morgan('dev'));

app.use('/api/v1', appRouter);

export default app;
