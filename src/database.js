const mysql = require('promise-mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'usuariomariadb',
    password: 'clavemariadb',
    database: 'basemariadb'
});

function getConnection() {
    return connection;
}

module.exports = {
    getConnection
};