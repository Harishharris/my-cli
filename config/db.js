const { Client } = require('pg');
require('dotenv').config();

const connectionString = process.env.DATABASE_URL;

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
