import { MongoClient, ServerApiVersion } from "mongodb";

const uri = process.env.MONGODB_URI;
if (!uri) {
  console.warn("MONGODB_URI not found in environment variables");
}

let clientPromise: Promise<MongoClient> | null = null;

// Completely lazy connection - only connects when this function is called
export default function getMongoClient(): Promise<MongoClient> {
  if (!uri) {
    return Promise.reject(new Error("MONGODB_URI is not defined"));
  }

  if (clientPromise) {
    return clientPromise;
  }

  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
    connectTimeoutMS: 10000, // 10 second timeout
    socketTimeoutMS: 45000,
  });

  clientPromise = client.connect();
  return clientPromise;
}
