const { Pool } = require('pg');
require("dotenv").config();

const pool = new Pool({
    connectionString: process.env.DB_CONNECTION_STRING,
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000
})

pool.connect((err, client, done) => {
    if (err) {
        console.error('Error creating connection pool', err);
    } else {
        console.log('Connection pool created successfull');
        done();
    }
});

module.exports = pool;