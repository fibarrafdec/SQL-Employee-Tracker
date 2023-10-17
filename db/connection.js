const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'username',
  password: 'password',
  database: 'database_name',
});

connection.connect((err) => {
  if (err) throw err;
});

module.exports = connection;
