import { config } from 'dotenv';
import getMongoClient from '../lib/mongodb';

config();

async function updateAbout() {
  try {
    const client = await getMongoClient();
    const db = client.db('nmz');
    
    const result = await db.collection('about').updateOne(
      { isActive: true },
      { $set: { mainPageImage: '/profile.jpg' } }
    );
    
    console.log('✅ Updated about document with mainPageImage field');
    console.log(`   Matched: ${result.matchedCount}, Modified: ${result.modifiedCount}`);
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

updateAbout();
