// 1. nodejs 中创建mysql表

let mysql = require('mysql')
let config = require('../config.js')

let connection = mysql.createConnection(config)

connection.connect(err => {
    if (err) {
        return console.error('error: ' + err.message)
    }

    let createTodos = `create table if not exists todos(
        id int primary key auto_increment,
        title varchar(255) not null,
        completed tinyint(1) not null default 0
    )`

    connection.query(createTodos, (err, results, fields) => {
        if (err) {
            console.log(err.message)
        }
    })

    connection.end(err => {
        if (err) {
            return console.log( err.message)
        }
    })
})
