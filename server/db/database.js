const { Pool } = require('pg');
require("dotenv").config();
const pool = new Pool({
    connectionString: process.env.DB_CONNECTION_STRING,
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000
});

console.log("Executed code");

module.exports = pool;