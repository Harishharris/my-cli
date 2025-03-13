const { Client } = require('pg');
require('dotenv').config();

const connectionString =

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
