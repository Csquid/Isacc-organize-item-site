const mysql = require('mysql');
const mysql_json = require('../private/mysql.json');

const db_info = {
    host: 'localhost',
    user: mysql_json.id,
    password: mysql_json.pw,
    database: 'isaac'
}

function connect() {
    connection.connect();

    // console.log("yes")
    // console.log(connection.state);
    connection.query('SHOW TABLES;', function(error, rows, fields) {
        console.log('data: ', rows[0]);
    })
}

module.exports = {
    init: function() {
        return mysql.createConnection(db_info);
    },
    connect: function(conn) {
        this.init();
        
        return conn.connect();
        conn.connect(function(err) {
            if(err) { 
                console.log('mysql connection error: ' + err);
            } else {
                console.log('mysql is connected successfully!');
            }
        })
    }
}
// exports.connect = function() { connect() };