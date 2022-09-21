const { append } = require('express/lib/response');
const mysql = require('mysql');

// Connection Pool
let connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
});

// View Users
exports.view = (req, res) => {
  // User the connection
  res.render('home');
}
// // Find User by Search
// exports.find = (req, res) => {
//   let searchTerm = req.body.search;
//   // User the connection
//   connection.query('SELECT * FROM donorgrants WHERE title LIKE ? OR amount LIKE ?', ['%' + searchTerm + '%', '%' + searchTerm + '%'], (err, rows) => {
//     if (!err) {
//       res.render('home', { rows });
//     } else {
//       console.log(err);
//     }
//     console.log('The data from mygrant table: \n', rows);
//   });
// }