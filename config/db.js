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
    await client.query(
      "CREATE TABLE IF NOT EXISTS tasks (id SERIAL PRIMARY KEY, name VARCHAR(255) NOT NULL, status VARCHAR(255) CHECK (status IN ('todo', 'inprogress', 'done')) DEFAULT 'todo')"
    );
  } catch (err) {
    console.error('Connection error:', err);
  }
}

// connectToDB();

module.exports = {
  client,
  connectToDB,
};
