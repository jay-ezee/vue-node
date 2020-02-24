var userDao = require("../dao/UserDao.js");

class UserController {
  constructor(req, res, next) {}

  async getEmployeeList(req, cb) {
    let employeeList = [];
    try {
      employeeList = await new userDao().getEmployeeList(req);
    } catch (error) {}
    cb(null, employeeList);
  }

  addEmployee(req, cb) {
    let send_data = "";
    try {
      new userDao().addEmployee(req, function(err, data) {
        // send_data = data;
        // console.log(send_data + "controller");
        cb(null, data);
      });
    } catch (error) {}
  }

  updateEmployee(req, cb) {
    // let affectedRows = "";
    try {
      new userDao().updateEmployee(req, function(err, data) {
        // affectedRows = data;
        // cb(null, affectedRows);
      });
    } catch (error) {}
  }

  updateemployeedetails(req, cb) {
    // let affectedRows = "";
    try {
      new userDao().updateemployeedetails(req, function(err, data) {
        // affectedRows = data;
        // cb(null, affectedRows);
      });
    } catch (error) {}
  }

  deleteEmployee(req, cb) {
    // let affectedRows = "";
    try {
      new userDao().deleteEmployee(req, function(err, data) {});
    } catch (error) {}
  }

  deleteemployeedetails(req, cb) {
    // let affectedRows = "";
    try {
      new userDao().deleteemployeedetails(req, function(err, data) {
        // affectedRows = data;
        // cb(null, affectedRows);
      });
    } catch (error) {}
  }

  addemployeetime(req, cb) {
    let send_data = "";
    try {
      new userDao().addemployeetime(req, function(err, data) {
        // send_data = data;
        // console.log(send_data + "controller");
        cb(null, data);
      });
    } catch (error) {}
  }

  getemployeedetails(req, cb) {
    let details = [];
    try {
      new userDao().getemployeedetails(req, function(err, data) {
        details = data;
        cb(null, details);
      });
    } catch (error) {
      cb(null, details);
    }
  }

  checklogin(req, cb) {
    let login = "";
    try {
      new userDao().checklogin(req, function(err, data) {
        login = data;
        cb(null, login);
      });
    } catch (error) {
      cb(null, login);
    }
  }

  register(req, cb) {
    try {
      new userDao().register(req, function(err, data) {
        cb(null, data);
      });
    } catch (error) {}
  }
}

module.exports = UserController;
