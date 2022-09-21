const mysql = require("mysql");

// Connection Pool
let connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  multipleStatements: true,
  port: process.env.DB_PORT,
});

// View Users
exports.view = (req, res) => {
  // User the connection
  var sql = `SELECT * from orgrants;
  SELECT COUNT(org_id) FROM orggrants WHERE org.org_id =;
  `;

  connection.query("SELECT * FROM orgs", (err, rows) => {
    // When done with the connection, release it
    if (!err) {
      let removedUser = req.query.removed;
      res.render("orgs", { rows, removedUser });
    } else {
      console.log(err);
    }
    console.log("The data from orgs table: \n", rows);
  });
};

// Find User by Search
exports.find = (req, res) => {
  let searchTerm = req.body.search;
  // User the connection
  connection.query(
    "SELECT * FROM orggrants WHERE title LIKE ? OR amount LIKE ?",
    ["%" + searchTerm + "%", "%" + searchTerm + "%"],
    (err, rows) => {
      if (!err) {
        res.render("orgs", { rows });
      } else {
        console.log(err);
      }
      console.log("The data from orggrants table: \n", rows);
    }
  );
};

exports.form = (req, res) => {
  connection.query("SELECT org_id, org_name FROM orgs", (err, orgs) => {
    // When done with the connection, release it
    if (!err) {
      res.render("grants/add-grant", { orgs });
    } else {
      console.log(err);
    }
    console.log("The data from orgs table: \n", orgs);
  });
};

// Add new user
exports.create = (req, res) => {
  const {
    grant_cycle,
    amount,
    designation,
    application_due_date,
    date_applied,
    grant_decision_date,
    report_submitted_date,
    funds_received_date,
    report_due_date,
    org_id,
    status,
    comments,
  } = req.body;

  connection.query(
    /*removed donor=? because no attribute called donor present in orggrants table*/
    `INSERT INTO orggrants SET
          grant_cycle =?,
          amount = ?,
          designation = ?,
          application_due_date =?,
          date_applied = ?,
          grant_decision_date = ?,
          report_submitted_date = ?,
          funds_received_date = ?,
          report_due_date = ?,
          org_id = ?,
          status = ?,
          comments = ?  
    `,
    [
      grant_cycle,
      amount,
      designation,
      application_due_date,
      date_applied,
      grant_decision_date,
      report_submitted_date,
      funds_received_date,
      report_due_date,
      org_id,
      status,
      comments,
    ],
    (err, rows) => {
      if (!err) {
        res.render("grants/add-grant", {
          alert: "Grant added successfully.",
          good: true,
        });
      } else {
        res.render("grants/add-grant", {
          alert: "Something went wrong try again",
        });
      }
      console.log("The data from mygrant table: \n", rows);
    }
  );
};

// Edit user
exports.edit = (req, res) => {
  // User the connectionnpm
  connection.query(
    "SELECT org_id, org_name FROM orgs",
    [req.params.id],
    (err, orgs) => {
      // When done with the connection, release it
      if (!err) {
        connection.query(
          "SELECT * FROM orggrants WHERE id = ?",
          [req.params.id],
          (err, rows) => {
            rows[0].orgs = orgs;

            for (const n of orgs) {
              if(rows[0].org_id == n.org_id){
                rows[0].org_name = n.org_name;
              }
            }

            if (!err) {
              res.render("grants/edit-grant", { rows, orgs });
            } else {
              console.log(err);
            }
            console.log("The data from mygrant table: \n", rows, orgs);
          }
        );
      } else {
        console.log(err);
      }
    }
  );
};

// Update User
exports.update = (req, res) => {
  const {
    grant_cycle,
    amount,
    designation,
    application_due_date,
    date_applied,
    grant_decision_date,
    report_submitted_date,
    funds_received_date,
    report_due_date,
    org_id,
    status,
    comments,
  } = req.body;

  // User the connection
  connection.query(
    "SELECT org_name FROM orgs WHERE org_id = ?",
    [org_id],
    (err, donors) => {
      // When done with the connection, release it
      if (!err) {
        donor_name = donors[0].name;
        connection.query(
          /*removed donor=? because no attribute called donor present in orggrants table*/
          `UPDATE orggrants SET  
            grant_cycle =?,
            amount = ?,
            designation = ?,
            application_due_date = ?,
            date_applied = ?,
            grant_decision_date = ?,
            report_submitted_date = ?,
            funds_received_date = ?,
            report_due_date = ?,
            org_id = ?,
            status = ?,
            comments = ?
            WHERE id = ?`,
          [
            grant_cycle,
            amount,
            designation,
            application_due_date,
            date_applied,
            grant_decision_date,
            report_submitted_date,
            funds_received_date,
            report_due_date,
            org_id,
            status,
            comments,
            req.params.id
          ],
          (err, rows) => {
            if (!err) {
              connection.query(
                "SELECT org_id, org_name FROM orgs",
                [req.params.id],
                (err, orgs) => {
                  // When done with the connection, release it
                  if (!err) {
                    connection.query(
                      "SELECT * FROM orggrants WHERE id = ? ",
                      [req.params.id],
                      (err, rows) => {
                        rows[0].orgs = orgs;

                        for (const n of orgs) {
                          if(rows[0].org_id == n.org_id){
                            rows[0].org_name = n.org_name;
                          }
                        }

                        if (!err) {
                          res.render("grants/edit-grant", {
                            rows,
                            orgs,
                            alert: "grant updated successfully.",
                          });
                        } else {
                          console.log(err);
                        }
                        console.log(
                          "The data from mygrant table: \n",
                          rows,
                          orgs
                        );
                      }
                    );
                  } else {
                    console.log(err);
                  }
                }
              );
            } else {
              console.log(err);
            }
            console.log("The data from mygrant table: \n", rows);
          }
        );
      } else {
        console.log(err);
      }
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
  // User the connection
  connection.query(
    "SELECT * FROM orggrants WHERE org_id = ?",
    [req.params.id],
    (err, rows) => {
      if (!err) {
        res.render("grants/view-grant", { rows });
      } else {
        console.log(err);
      }
      console.log("The data from mygrant table: \n", rows);
    }
  );
};
