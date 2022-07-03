import { MongoClient } from 'mongodb';

const MONGODB_URI: string = process.env.MONGODB_URI

if (!MONGODB_URI) {
    throw new Error("Could not find Mongo DB URI from environment variables.")
}

let cachedMongoClient: any = null
let cachedMongoDb: any = null

export const mongoConnect = async () => {
    if (cachedMongoClient && cachedMongoDb) {
        return cachedMongoDb
    }
    const client = new MongoClient(MONGODB_URI)
    await client.connect()
    const database = client.db('collections')
    cachedMongoClient = client
    cachedMongoDb = database
    return cachedMongoDb
}