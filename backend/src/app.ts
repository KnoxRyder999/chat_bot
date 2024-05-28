import { config } from 'dotenv';
import express from 'express';

config();
const app = express();

// Middleware pour analyser les corps de requête JSON
app.use(express.json());

export default app;
