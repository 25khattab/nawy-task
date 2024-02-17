import { Db, MongoClient, ServerApiVersion } from "mongodb";
const password = process.env.db_passowrd as string;
let cachedDb: Db;

export async function connectDB() {
  const uri = `mongodb+srv://nawy:${password}@nawy.08ln2ro.mongodb.net/?retryWrites=true&w=majority`;
  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });
  if (cachedDb) {
    return cachedDb;
  }
  await client.connect();
  const db = client.db("nawy");
  cachedDb = db;

  return db;
}
