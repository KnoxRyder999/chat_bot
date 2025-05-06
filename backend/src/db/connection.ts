import { connect, disconnect } from 'mongoose';

async function connectToDatabase() {
  try {
    await connect(process.env.MONGODB_URL);
    console.log('✅ MongoDB connected');
  } catch (error) {
    console.error('😱 ~ connectToDatabase ~ error:', error);
    throw new Error('Cannot connect to MongoDB');
  }
}
async function disconnectToDatabase() {
  try {
    await disconnect();
  } catch (error) {
    console.error('😱 ~ connectToDatabase ~ error:', error);
    throw new Error('Could not disconnect to MongoDB');
  }
}

export { connectToDatabase, disconnectToDatabase };
