const Pool = require('pg').Pool;

const pool = new Pool({
    user: 'ayush',
    password: 'ayush310',
    host: 'localhost',
    port: 5432,
    database: 'loginsys',
    idleTimeoutMillis: 0,
    connectionTimeoutMillis: 0,
});

module.exports = pool;