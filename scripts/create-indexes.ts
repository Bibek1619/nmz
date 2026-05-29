import 'dotenv/config';
import { getCollection } from '../lib/db';
import {
  TrekCollection,
  BlogCollection,
  ContactCollection,
  HeroCollection,
  AboutCollection,
} from '../models';

async function createIndexes() {
  console.log('🔧 Creating database indexes...\n');

  try {
    // Treks indexes
    console.log('📝 Creating indexes for Treks...');
    const treksCollection = await getCollection(TrekCollection);
    try {
      await treksCollection.createIndex({ id: 1 }, { unique: true });
    } catch (e: any) {
      if (e.code !== 11000) throw e; // Ignore duplicate key errors
    }
    await treksCollection.createIndex({ featured: 1, isActive: 1 });
    await treksCollection.createIndex({ difficulty: 1, isActive: 1 });
    await treksCollection.createIndex({ isActive: 1 });
    console.log('✅ Trek indexes created\n');

    // Blogs indexes
    console.log('📝 Creating indexes for Blogs...');
    const blogsCollection = await getCollection(BlogCollection);
    try {
      await blogsCollection.createIndex({ id: 1 }, { unique: true });
      await blogsCollection.createIndex({ slug: 1 }, { unique: true });
    } catch (e: any) {
      if (e.code !== 11000) throw e;
    }
    await blogsCollection.createIndex({ published: 1, featured: 1 });
    await blogsCollection.createIndex({ category: 1, published: 1 });
    await blogsCollection.createIndex({ tags: 1 });
    console.log('✅ Blog indexes created\n');

    // Contacts indexes
    console.log('📝 Creating indexes for Contacts...');
    const contactsCollection = await getCollection(ContactCollection);
    await contactsCollection.createIndex({ status: 1 });
    await contactsCollection.createIndex({ email: 1 });
    await contactsCollection.createIndex({ createdAt: -1 });
    console.log('✅ Contact indexes created\n');

    // Heroes indexes
    console.log('📝 Creating indexes for Heroes...');
    const heroesCollection = await getCollection(HeroCollection);
    await heroesCollection.createIndex({ isActive: 1 });
    console.log('✅ Hero indexes created\n');

    // About indexes
    console.log('📝 Creating indexes for About...');
    const aboutCollection = await getCollection(AboutCollection);
    await aboutCollection.createIndex({ isActive: 1 });
    console.log('✅ About indexes created\n');

    console.log('🎉 All indexes created successfully!');
  } catch (error) {
    console.error('❌ Error creating indexes:', error);
    throw error;
  }
}

// Run the function
createIndexes()
  .then(() => {
    console.log('\n✅ Done!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Failed:', error);
    process.exit(1);
  });
