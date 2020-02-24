var mysql = require("mysql");
var con = require("./connection");

class UserDao {
  constructor(req, res, next) {}

  async getEmployeeList(req, cb) {
    let employeeList = [];
    return new Promise(function(resolve, reject) {
      try {
        con.query("SELECT * FROM emplyoee", function(err, results, fields) {
          if (err) throw err;
          else {
            for (let i = 0; i < results.length; i++) {
              employeeList.push({
                id: results[i]["id"],
                name: results[i]["name"],
                Email: results[i]["email_id"],
                Conatct: results[i]["contact_no"]
              });
            }
          }
          console.log(employeeList);
          resolve(employeeList);
        });
      } catch (error) {
        resolve(employeeList);
      }
    });
  }

  addEmployee(req, cb) {
    var send_data = "";
    try {
      var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "employee_timing_system"
      });
      con.connect();
      con.query(
        'insert into emplyoee (name, email_id, contact_no) values ("' +
          req.body.name +
          '","' +
          req.body.email +
          '","' +
          req.body.contact +
          '")',
        function(err, results) {
          if (err) throw err;
          else {
            send_data = "Record Added Successfully";
            console.log(send_data);
            console.log("Record(s) added Successfully");
          }
          cb(null, send_data);
        }
      );
      // con.end();
    } catch (error) {}
  }

  updateEmployee(req, cb) {
    try {
      var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "employee_timing_system"
      });
      con.connect();
      con.query(
        'UPDATE emplyoee SET name = "' +
          req.body.name +
          '", email_id = "' +
          req.body.email +
          '", contact_no = "' +
          req.body.contact +
          '" WHERE id = ' +
          req.params.id,
        function(err, results) {
          if (err) throw err;
          else {
            console.log("Record(s) Updated Successfully");
          }
        }
      );
      con.end();
    } catch (error) {}
  }

  updateemployeedetails(req, cb) {
    try {
      var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "employee_timing_system"
      });
      con.connect();
      con.query(
        'UPDATE employee_details SET date = "' +
          req.body.date +
          '", time_in = "' +
          req.body.timein +
          '", time_out = "' +
          req.body.timeout +
          '" WHERE id = ' +
          req.params.id,
        function(err, results) {
          if (err) throw err;
          else {
            console.log("Record(s) Updated Successfully");
          }
        }
      );
      con.end();
    } catch (error) {}
  }

  deleteEmployee(req, cb) {
    try {
      console.log(req.params.id);
      con.query("DELETE FROM emplyoee WHERE id =" + req.params.id, function(
        err,
        results
      ) {
        if (err) throw err;
        else {
          console.log("Record Deleted Successfully");
        }
      });
    } catch (error) {}
  }

  deleteemployeedetails(req, cb) {
    try {
      var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "employee_timing_system"
      });
      con.connect();
      console.log(req.params.id);
      con.query(
        "DELETE FROM employee_details WHERE id = " + req.params.id,
        function(err, results) {
          if (err) throw err;
          else {
            console.log("Record Deleted Successfully");
          }
        }
      );
      con.end();
    } catch (error) {}
  }

  addemployeetime(req, cb) {
    var send_data = "";
    try {
      var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "employee_timing_system"
      });
      con.connect();
      con.query(
        'insert into employee_details (employee_id, date, time_in, time_out) values ("' +
          req.body.id +
          '","' +
          req.body.date +
          '","' +
          req.body.in +
          '","' +
          req.body.out +
          '")',
        function(err, results) {
          if (err) throw err;
          else {
            send_data = "Record Added Successfully";
            console.log(send_data);
            console.log("Record(s) added Successfully");
          }
          cb(null, send_data);
        }
      );
      // con.end();
    } catch (error) {}
  }

  getemployeedetails(req, cb) {
    let details = [];
    try {
      var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "employee_timing_system"
      });
      con.connect();
      con.query(
        "SELECT *, DATE_FORMAT(date,'%M %d %Y')date FROM employee_details WHERE employee_id = " +
          req.params.id,
        function(err, results, fields) {
          if (err) throw err;
          else {
            for (let i = 0; i < results.length; i++) {
              details.push({
                id: results[i]["id"],
                date: results[i]["date"],
                timein: results[i]["time_in"],
                timeout: results[i]["time_out"]
              });
            }
          }
          cb(null, details);
        }
      );

      con.end();
    } catch (error) {
      cb(null, details);
    }
  }

  checklogin(req, cb) {
    console.log(req.body);
    let login = "";
    try {
      var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "employee_timing_system"
      });
      con.connect();
      con.query(
        'SELECT * FROM emplyoee WHERE email_id= "' +
          req.body.email +
          '" AND password= "' +
          req.body.password +
          '" ',
        function(err, results, fields) {
          if (err) {
            console.log("User Credentials are Worng");
          } else {
            var data = JSON.parse(JSON.stringify(results));
            var result = data[0];
            login = result;
          }
          cb(null, login);
        }
      );

      con.end();
    } catch (error) {
      cb(null, login);
    }
  }

  register(req, cb) {
    var send_data = "";
    try {
      var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "employee_timing_system"
      });
      con.connect();
      con.query(
        'insert into emplyoee (name, email_id,password,contact_no,created_at) values ("' +
          req.body.username +
          '","' +
          req.body.email +
          '","' +
          req.body.password +
          '","' +
          req.body.contact +
          '","' +
          req.body.created_at +
          '")',
        function(err, results) {
          if (err) throw err;
          else {
            var data = JSON.parse(JSON.stringify(results));
            // var result = data[0];
            // console.log({msg:"", status: "",data:data});
            send_data = {
              msg: "Success",
              status: "true",
              data: data,
              date: new Date()
            };
          }
          cb(null, send_data);
        }
      );
      // con.end();
    } catch (error) {
      cb(null, send_data);
    }
  }
}

module.exports = UserDao;
