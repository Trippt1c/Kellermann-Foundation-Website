const mysql = require("mysql");

// Connection Pool
let connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  multipleStatements: true,
  port: process.env.DB_PORT
});

// View Users
exports.view = (req, res) => {
  // User the connection
  connection.query("SELECT * FROM orgs", (err, rows) => {
    // When done with the connection, release it
    if (!err) {
      let removedUser = req.query.removed;
      res.render("donors", { rows, removedUser });
    } else {
      console.log(err);
    }
    console.log("The data from mygrant table: \n", rows);
  });
};

// Find User by Search
exports.find = (req, res) => {
  let searchTerm = req.body.search;
  // User the connection
  connection.query(
    "SELECT * FROM donors WHERE title LIKE ? OR amount LIKE ?",
    ["%" + searchTerm + "%", "%" + searchTerm + "%"],
    (err, rows) => {
      if (!err) {
        res.render("donors", { rows });
      } else {
        console.log(err);
      }
      console.log("The data from mygrant table: \n", rows);
    }
  );
};

exports.form = (req, res) => {
  res.render("donors/add-donor");
};

// Add new user
exports.create = (req, res) => {
  const { name, type, contact_name, email, comments } = req.body;
  console.log(req.body);

  // User the connection
  connection.query(
    "INSERT INTO donors SET name = ?, type = ?, contact_name = ?, email = ?, comments = ?",
    [name, type, contact_name, email, comments],
    (err, rows) => {
      if (!err) {
        res.render("donors/add-donor", { alert: "Donor added successfully." });
      } else {
        console.log(err);
      }
      console.log("The data from mygrant table: \n", rows);
    }
  );
};

// Edit user
exports.edit = (req, res) => {
  // User the connection
  connection.query(
    "SELECT * FROM donors WHERE id = ?",
    [req.params.id],
    (err, rows) => {
      if (!err) {
        res.render("donors/edit-donor", { rows });
      } else {
        console.log(err);
      }
      console.log("The data from mygrant table: \n", rows);
    }
  );
};

// Update User
exports.update = (req, res) => {
  const { name, type, contact_name, email, comments } = req.body;
  // User the connection
  connection.query(
    "UPDATE donors SET name = ?, type = ?, contact_name = ?, email = ?, comments = ? WHERE id = ?",
    [name, type, contact_name, email, comments, req.params.id],
    (err, rows) => {
      if (!err) {
        // User the connection
        connection.query(
          "SELECT * FROM donors WHERE id = ?",
          [req.params.id],
          (err, rows) => {
            // When done with the connection, release it

            if (!err) {
              res.render("donors/edit-donor", {
                rows,
                alert: `${name} has been updated.`,
              });
            } else {
              console.log(err);
            }
            console.log("The data from mygrant table: \n", rows);
          }
        );
      } else {
        console.log(err);
      }
      console.log("The data from mygrant table: \n", rows);
    }
  );
};

// Delete User
exports.delete = (req, res) => {
  // Delete a record
  // User the connection
  // connection.query('DELETE FROM mygrant WHERE id = ?', [req.params.id], (err, rows) => {
  //   if(!err) {
  //     res.redirect('/');
  //   } else {
  //     console.log(err);
  //   }
  //   console.log('The data from mygrant table: \n', rows);
  // });
  // Hide a record
  // connection.query('UPDATE donorgrants SET status = ? WHERE id = ?', ['removed', req.params.id], (err, rows) => {
  //   if (!err) {
  //     let removedUser = encodeURIComponent('Grant successeflly removed.');
  //     res.redirect('/?removed=' + removedUser);
  //   } else {
  //     console.log(err);
  //   }
  //   console.log('The data from beer table are: \n', rows);
  // });
};

// View Users
exports.viewall = (req, res) => {
  var sql = `SELECT * FROM donors WHERE id = ${req.params.id};
    SELECT SUM(amount) AS grants_total_amount FROM donorgrants WHERE donor_id=${req.params.id};
    SELECT * FROM donorgrants WHERE donor_id=${req.params.id};
  `;

  // User the connection
  connection.query(sql, [1, 2, 3], (err, results) => {
    if (!err) {
      var rows = results[0];
      var grants = results[2];

      rows[0].sum = results[1][0].grants_total_amount;

      console.log("The data from mygrant table: \n", rows);
      console.log("The data from mygrant table: \n", grants);

      res.render("donors/view-donor", { rows, grants });
    } else {
      console.log(err);
    }
  });
};
