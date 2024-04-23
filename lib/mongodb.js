import { MongoClient, ServerApiVersion } from "mongodb";

const uri = process.env.MONGODB_URI; // It's safer to use an environment variable for your URI
const client = new MongoClient(uri, {
  serverApi: ServerApiVersion.v1,
});

let cachedClient = null;
let cachedDb = null;

export async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  try {
    if (!cachedClient) {
      await client.connect();
      cachedClient = client;
      console.log("Connected to MongoDB!");
    }
    const db = client.db("fizyoaksu"); // Replace 'yourDatabaseName' with your actual db name
    cachedDb = db;
    return { client: cachedClient, db: cachedDb };
  } catch (e) {
    console.error("Failed to connect to MongoDB", e);
    throw e;
  }
}