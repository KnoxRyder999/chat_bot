import app from './app.js';
import { connectToDatabase } from './db/connection.js';

const PORT = process.env.PORT || 5000;

// connection and listener
connectToDatabase().then(() => {
  app.listen(PORT, () => console.log('Server open and connected to DB 🤟'));
});
app.listen(PORT, () => console.log('Server open'));
