import app from './app.js';
import { connectToDatabase } from './db/connection.js';

const PORT = process.env.PORT || 5000;

// connection and listener
connectToDatabase()
  .then(() => {
    console.log('port number:', PORT);
    app.listen(5000, () => console.log('Server open and connected to DB 🤟'));
  })
  .catch((err) => console.log('😱 ~ err:', err));
