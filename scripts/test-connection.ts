import { config } from 'dotenv';
import { MongoClient } from 'mongodb';

config();

const uri = process.env.MONGODB_URI;

if (!uri) {
  console.error('❌ MONGODB_URI not found in .env');
  process.exit(1);
}

console.log('🔍 Testing MongoDB connection...');
console.log('📍 Connection string:', uri.replace(/\/\/([^:]+):([^@]+)@/, '//$1:****@'));

const client = new MongoClient(uri, {
  serverSelectionTimeoutMS: 10000,
  connectTimeoutMS: 10000,
});

async function testConnection() {
  try {
    console.log('⏳ Connecting...');
    await client.connect();
    console.log('✅ Connected successfully!');
    
    const db = client.db('nmz');
    const collections = await db.listCollections().toArray();
    console.log('📚 Collections:', collections.map(c => c.name).join(', ') || 'none');
    
    await client.close();
    console.log('👋 Connection closed');
    process.exit(0);
  } catch (error: any) {
    console.error('❌ Connection failed:', error.message);
    console.error('💡 Possible issues:');
    console.error('   1. Check MongoDB Atlas IP Whitelist (add your IP or 0.0.0.0/0)');
    console.error('   2. Verify cluster is running (not paused)');
    console.error('   3. Check network/firewall settings');
    console.error('   4. Verify credentials in .env file');
    process.exit(1);
  }
}

testConnection();
