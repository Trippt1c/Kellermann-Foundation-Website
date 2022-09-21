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

// DONE ( view organization page)
exports.view = (req, res) => {
  // User the connection
  var sql = `SELECT orgs.org_id, org_name, type, orgs.status, concat('$',FORMAT(ROUND(SUM(amount),'C'),2)) AS grants_total_amount, contact_name, address_line1,webaddress, address_line2,city,zipcode,state,phone_number, 
  COUNT( * ) totalgrants
  FROM orgs, orggrants 
  WHERE orgs.org_id = orggrants.org_id 
  AND orggrants.status ='funded'
  group by orggrants.org_id;`;
  connection.query(sql, (err, rows) => {
    // When done with the connection, release it
    if (!err) {
      let removedUser = req.query.removed;
      res.render("orgs", { rows, removedUser });
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
    "SELECT * FROM donorgrants WHERE title LIKE ? OR amount LIKE ?",
    ["%" + searchTerm + "%", "%" + searchTerm + "%"],
    (err, rows) => {
      if (!err) {
        res.render("grants", { rows });
      } else {
        console.log(err);
      }
      console.log("The data from mygrant table: \n", rows);
    }
  );
};

exports.form = (req, res) => {
  connection.query("SELECT org_id, org_name FROM orgs", (err, donors) => {
    // When done with the connection, release it
    if (!err) {
      res.render("orgs/add-org", { donors });
    } else {
      console.log(err);
    }
    console.log("The data from mygrant table: \n", donors);
  });
};

// Add new user
exports.create = (req, res) => {
  const {
    org_name,
    type,
    status,
    webaddress,
    contact_name,
    phone_number,
    email,
    address_line1,
    address_line2,
    city,
    state,
    zipcode,
    comments,
  } = req.body;

  if (org_name == "" || type == "Type") {
    res.render("orgs/add-org", {
      alert: "Make sure to add organization name and type",
    });
  } else {
    connection.query(
      `INSERT INTO orgs SET 
    org_name = ?, 
    type = ?,
    status = ?, 
    webaddress = ?, 
    contact_name = ?, 
    phone_number = ?, 
    email = ?,
    address_line1 = ?,
    address_line2 = ?,
    city = ?,
    state = ?,
    zipcode = ?,
    comments = ?
    `,
      [
        org_name,
        type,
        status,
        webaddress,
        contact_name,
        phone_number,
        email,
        address_line1,
        address_line2,
        city,
        state,
        zipcode,
        comments,
      ],
      (err, rows) => {
        if (!err) {
          res.render("orgs/add-org", {
            alert: "Grant added successfully.",
            good: true
          });
        } else {
          console.log(err);
        }
        console.log("The data from mygrant table: \n", rows);
      }
    );
  }
};

// Edit user
exports.edit = (req, res) => {
  connection.query(
    "SELECT * FROM orgs WHERE org_id = ? ",
    [req.params.id],
    (err, rows) => {
      if (!err) {
        res.render("orgs/edit-org", { rows });
      } else {
        console.log(err);
      }
      console.log("The data from mygrant table: \n", rows);
    }
  );
};

// Update User
exports.update = (req, res) => {
  const {
    org_name,
    type,
    status,
    webaddress,
    contact_name,
    phone_number,
    email,
    address_line1,
    address_line2,
    city,
    state,
    zipcode,
    comments,
  } = req.body;

  // User the connection
  connection.query(
    `UPDATE orgs SET 
    org_name = ?, 
    type = ?,
    status = ?, 
    webaddress = ?, 
    contact_name = ?, 
    phone_number = ?, 
    email = ?,
    address_line1 = ?,
    address_line2 = ?,
    city = ?,
    state = ?,
    zipcode = ?,
    comments = ?
    WHERE org_id = ?
    `,
    [
      org_name,
      type,
      status,
      webaddress,
      contact_name,
      phone_number,
      email,
      address_line1,
      address_line2,
      city,
      state,
      zipcode,
      comments,
      req.params.id,
    ],
    (err, rows) => {
      if (!err) {
        connection.query(
          "SELECT * FROM orgs WHERE org_id = ? ",
          [req.params.id],
          (err, rows) => {
            if (!err) {
              res.render(`orgs/edit-org`, {
                rows,
                alert: "Org updated successfully.",
              });
            } else {
              console.log(err);
            }
            console.log("The data from mygrant table: \n", rows);
          }
        );
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



exports.viewall = (req, res) => {
  var sql = `SELECT * FROM orgs WHERE org_id = ${req.params.id};
    SELECT FORMAT(SUM(amount), 'c') AS grants_total_amount FROM orggrants WHERE org_id=${req.params.id} AND status='funded';
    SELECT org_id, title, CONCAT('$', FORMAT(amount, 'C')) as amount, designation,
    application_due_date,  date_applied, grant_decision_date, funds_received_date, report_due_date,
    report_submitted_date, grant_cycle, comments, status FROM orggrants WHERE org_id=${req.params.id};
    SELECT org_id, year(funds_received_date) FundsRecvdDate, CONCAT('$', FORMAT(sum(amount), 'C')) as TotalAmount
    from orggrants
    where org_id = ${req.params.id} and status = 'funded' 
    group by year(funds_received_date) desc;
  `;

  // User the connection
  connection.query(sql, [1, 2, 3, 4], (err, results) => {
    if (!err) {
      var rows = results[0];
      var grants = results[2];
      rows[0].sum = results[1][0].grants_total_amount;
      var yearlyTotal = results[3];

      console.log("The data from mygrant table: \n", rows);
      console.table(yearlyTotal);
      // console.log("The data from mygrant table: \n", grants);

      res.render("orgs/view-org", { rows, grants, yearlyTotal});
    } else {
      console.log(err);
    }
  });
};
