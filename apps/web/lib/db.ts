import mongoose from 'mongoose';
import 'dotenv/config';

const MONGODB_URI =
  'mongodb+srv://lzybert:LURfNvDesmYJUzv3@cluster0.jgati.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'; //process.env.MONGODB_URI as string;
console.log(MONGODB_URI);
if (!MONGODB_URI) {
  throw new Error('Please define MONGODB_URI in .env.local');
}

const cached = (global as any).mongoose || { conn: null, promise: null };

export async function connectToDB(): Promise<typeof mongoose> {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI, {
        dbName: 'SessionForge',
      })
      .then((mongoose) => mongoose)
      .catch((error) => console.log(error));
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
