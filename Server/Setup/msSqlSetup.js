const {Connection} = require('tedious');
const ConnectionPool = require('tedious-connection-pool');

var poolConfig = {
    min: 2,
    max: 4,
    log: false
}

const config = require('../config.json').MS_SQL_Credentials;

var pool = new ConnectionPool(poolConfig, {
    userName: "sa",
    password: "13098",
    server: "localhost",
    options:{
        database: "Dashboard"
    }
})

//const db = new Connection(config);
let db;
module.exports = pool;