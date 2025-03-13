const { Client } = require('pg');
require('dotenv').config();

const connectionString =
  'postgresql://cli_owner:npg_qkwe1NBYf6Ed@ep-nameless-cake-a1kg3tu3-pooler.ap-southeast-1.aws.neon.tech/cli?sslmode=require';

const client = new Client({
  connectionString,
  ssl: {
    rejectUnauthorized: false,
  },
});

async function connectToDB() {
  try {
    await client.connect();
    console.log('Connected:');
  } catch (err) {
    console.error('Connection error:', err);
  }
}

// connectToDB();

module.exports = {
  client,
  connectToDB,
};
