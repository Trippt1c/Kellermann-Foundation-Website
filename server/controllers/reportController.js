const excel = require("exceljs");
const mysql = require("mysql");
const { head } = require("../routes/report");

// Connection Pool
let connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  multipleStatements: true,
  port: process.env.DB_PORT,
});

exports.report = (req, res) => {
  connection.query("SELECT * FROM orgs", (err, rows) => {
    // When done with the connection, release it
    if (!err) {
      res.render("report", { rows });
    } else {
      console.log(err);
    }
    console.log("The data from orgs table: \n", rows);
  });
};

exports.reportGenerate = (req, res) => {
  connection.query("", (err, rows) => {
    // When done with the connection, release it
    if (!err) {
      res.render("report", { rows });
    } else {
      console.log(err);
    }
    console.log("The data from orgs table: \n", rows);
  });
};

exports.reportDefault = (req, res) => {
  var sql = `Select Orgs.org_id,org_name,designation, orggrants.status, application_due_date 'Application due date', 
  date_applied 'Date applied',grant_decision_date 'Approved date',funds_received_date 'Funded Date',
  report_due_date 'Report Due Date'
  From Orgs
  INNER JOIN OrgGrants ON Orgs.org_id = OrgGrants.org_id
  and application_due_date between '2019-12-05' and '2022-05-09' 
  ORDER BY application_due_date ASC;`

  connection.query(sql, (err, rows) => {
    if (!err) {
      // When done with the connection, release it
      let workbook = new excel.Workbook(); //creating workbook
      let worksheet = workbook.addWorksheet("Report Calendar"); //creating worksheet

      //  WorkSheet Header
      worksheet.columns = [
        { header: "Organization ID", key: "org_id" , bold: true},
        { header: "Organization Name", key: "org_name",bold: true},
        { header: "Designation", key: "designation",bold: true},
        { header: "Status", key: "status",bold: true},
        { header: "Application Due Date", key: "Application due date",bold: true},
        { header: "Date Applied", key: "Date applied",bold: true},
        { header: "Approved Date", key: "Approved date",bold: true},
        { header: "Funded Date", key: "Funded Date",bold: true},
        { header: "Report Due Date", key: "Report Due Date",bold: true},
      ];

      worksheet.columns.forEach(column => {
        column.width = column.header.length < 12 ? 12 : column.header.length + 5;
      })

      worksheet.getRow(1).font = { bold: true };

      // add array rows
      worksheet.addRows(rows);

      // download file
      workbook.xlsx.writeFile("report.xlsx").then(function (err) {
        console.log("file is written");
        if(!err){
          res.download(`./report.xlsx`);
        }else{
          res.redirect('/report');
        }
      });
    } else {
      console.log(err);
    }
    console.log(rows);
  });
};
