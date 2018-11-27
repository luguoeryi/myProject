// 2. 池连接/连接池

let mysql = require('mysql')

var pool = mysql.createPool({
    connectionLimit: 5,
    host: 'localhost',
    user: 'root',
    password: 'aa123456', 
    database: 'yiibaidb'
})

pool.getConnection((err, connection) => {
    // execute query
    // ...
})

pool.getConnection((err, connection) => {
    // execute query
    // ...
    connnection.release()
})

pool.end(function(err) {
    if (err) {
        return console.log(err.message)
    }
  // close all connections
})