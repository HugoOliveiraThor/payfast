var mysql = require('mysql');

function createDBConnection() {
    return mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'r13'
    });

}

module.exports = function() {
    return createDBConnection;
}