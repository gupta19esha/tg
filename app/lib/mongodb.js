import mongoose from 'mongoose';

if (!process.env.MONGODB_URI) {
  throw new Error('Please add your MONGODB_URI to .env.local');
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  try {
    if (cached.conn) {
      return cached.conn;
    }

    if (!cached.promise) {
      const opts = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // This will create the database if it doesn't exist
        dbName: 'tictactoe_db'
      };

      cached.promise = mongoose.connect(process.env.MONGODB_URI, opts).then((mongoose) => {
        return mongoose;
      });
    }

    cached.conn = await cached.promise;
    return cached.conn;
  } catch (error) {
    throw new Error('Failed to connect to MongoDB');
  }
}

// Initialize database and collections
async function initializeDatabase() {
  try {
    const conn = await dbConnect();
    const db = conn.connection.db;

    // List of collections to create if they don't exist
    const collections = ['users'];

    for (const collectionName of collections) {
      const collectionExists = await db.listCollections({ name: collectionName }).hasNext();
      if (!collectionExists) {
        await db.createCollection(collectionName);
      }
    }

  } catch (error) {
    console.error('Database initialization error:', error);
    throw error;
  }
}

// Run initialization when the module is imported
initializeDatabase().catch(console.error);

export default dbConnect;
