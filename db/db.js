const { Client } = require('pg');
require('dotenv').config();

const connectionString = process.env.CONNECTION_URI;

const client = new Client({
  connectionString,
});

module.exports = {
  client,
};
