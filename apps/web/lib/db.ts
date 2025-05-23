import 'dotenv/config';

import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error('Please define MONGODB_URI in .env.local');
}

const cached = (global as any).mongoose || { conn: null, promise: null };

export async function connectToDB(): Promise<typeof mongoose> {
  console.log('Connecting to DB');
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
