import app from './app.js';
import { connectToDatabase } from './db/connection.js';

const PORT = process.env.PORT || 5000;

// connection and listener
connectToDatabase()
  .then(() => {
    console.log('port number:', PORT);
    app.listen(PORT, () =>
      console.log(
        `Server open and connected to DB 🤟, on http://localhost:${PORT}`
      )
    );
  })
  .catch((err) =>
    console.error(
      '❌ Failed to start server due to MongoDB connection issue:',
      err
    )
  );
