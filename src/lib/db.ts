import mongoose from 'mongoose';

interface Cached {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  var mongooseCache: Cached | undefined;
}

const cached: Cached = globalThis.mongooseCache ?? { conn: null, promise: null };

export async function connectToDatabase(): Promise<typeof mongoose> {
  const MONGODB_URI = process.env.MONGODB_URI ?? '';

  if (!MONGODB_URI) {
    throw new Error(
      'Missing MONGODB_URI. Add your MongoDB Atlas connection string to .env (e.g. MONGODB_URI=mongodb+srv://<user>:<password>@<cluster>.mongodb.net/mysaas)',
    );
  }

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI).then((mongoose) => mongoose);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
