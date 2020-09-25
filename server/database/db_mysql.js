const mysql = require('mysql');
const mysql_json = require('../private/mysql.json');

const db_info = {
    host: mysql_json.cafe24.host,
    user: mysql_json.cafe24.id,
    password: mysql_json.cafe24.pw,
    database: mysql_json.cafe24.db
}

module.exports = {
    init: function() {
        return mysql.createConnection(db_info);
    },
    connect: function(conn) {
        this.init();
        
        return conn.connect();
    }
}