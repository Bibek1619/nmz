import getMongoClient from './mongodb';
import { Collection, Db, Document } from 'mongodb';

// Cache for database instance
let cachedDb: Db | null = null;

/**
 * Get database instance with caching
 */
export async function getDatabase(dbName: string = 'nmz'): Promise<Db> {
  if (cachedDb && cachedDb.databaseName === dbName) {
    return cachedDb;
  }
  
  const client = await getMongoClient();
  cachedDb = client.db(dbName);
  return cachedDb;
}

/**
 * Get a collection from the database
 */
export async function getCollection<T extends Document>(
  collectionName: string,
  dbName: string = 'nmz'
): Promise<Collection<T>> {
  const db = await getDatabase(dbName);
  return db.collection<T>(collectionName);
}

/**
 * Generic CRUD operations
 */
export const db = {
  /**
   * Find all documents in a collection
   */
  async findAll<T extends Document>(
    collectionName: string,
    filter: any = {},
    options: any = {}
  ): Promise<T[]> {
    const collection = await getCollection<T>(collectionName);
    return collection.find(filter, options).toArray();
  },

  /**
   * Find one document by filter
   */
  async findOne<T extends Document>(
    collectionName: string,
    filter: any
  ): Promise<T | null> {
    const collection = await getCollection<T>(collectionName);
    return collection.findOne(filter);
  },

  /**
   * Find one document by ID
   */
  async findById<T extends Document>(
    collectionName: string,
    id: string
  ): Promise<T | null> {
    const collection = await getCollection<T>(collectionName);
    return collection.findOne({ id } as any);
  },

  /**
   * Insert one document
   */
  async insertOne<T extends Document>(
    collectionName: string,
    document: T
  ): Promise<T> {
    const collection = await getCollection<T>(collectionName);
    const now = new Date();
    const docWithTimestamps = {
      ...document,
      createdAt: now,
      updatedAt: now,
    };
    const result = await collection.insertOne(docWithTimestamps as any);
    return { ...docWithTimestamps, _id: result.insertedId } as T;
  },

  /**
   * Insert many documents
   */
  async insertMany<T extends Document>(
    collectionName: string,
    documents: T[]
  ): Promise<T[]> {
    const collection = await getCollection<T>(collectionName);
    const now = new Date();
    const docsWithTimestamps = documents.map(doc => ({
      ...doc,
      createdAt: now,
      updatedAt: now,
    }));
    const result = await collection.insertMany(docsWithTimestamps as any);
    return docsWithTimestamps.map((doc, index) => ({
      ...doc,
      _id: result.insertedIds[index],
    })) as T[];
  },

  /**
   * Update one document
   */
  async updateOne<T extends Document>(
    collectionName: string,
    filter: any,
    update: Partial<T>
  ): Promise<boolean> {
    const collection = await getCollection<T>(collectionName);
    const result = await collection.updateOne(filter, {
      $set: {
        ...update,
        updatedAt: new Date(),
      },
    });
    return result.modifiedCount > 0;
  },

  /**
   * Update one document by ID
   */
  async updateById<T extends Document>(
    collectionName: string,
    id: string,
    update: Partial<T>
  ): Promise<boolean> {
    return this.updateOne(collectionName, { id }, update);
  },

  /**
   * Delete one document
   */
  async deleteOne(collectionName: string, filter: any): Promise<boolean> {
    const collection = await getCollection(collectionName);
    const result = await collection.deleteOne(filter);
    return result.deletedCount > 0;
  },

  /**
   * Delete one document by ID
   */
  async deleteById(collectionName: string, id: string): Promise<boolean> {
    return this.deleteOne(collectionName, { id });
  },

  /**
   * Count documents
   */
  async count(collectionName: string, filter: any = {}): Promise<number> {
    const collection = await getCollection(collectionName);
    return collection.countDocuments(filter);
  },
};
