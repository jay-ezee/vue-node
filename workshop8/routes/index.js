var express = require("express");
var router = express.Router();
var userController = require("../controller/UserController");
var cors = require("cors");

var jwt = require("jsonwebtoken");

/* GET home page. */
router.get("/", function(req, res, next) {
  res.send("Welcome TO Express frameWorks");
});

router.get("/getemployee", function(req, res, next) {
  new userController().getEmployeeList(req, function(err, data) {
    res.send(data);
  });
});

router.post("/addemployee", function(req, res) {
  new userController().addEmployee(req, function(err, data) {
    console.log(data + "index");
    res.send(data);
  });
});

router.post("/updateemployee/:id", function(req, res) {
  new userController().updateEmployee(req, function(err, data) {
    res.send(data);
  });
});

router.delete("/deleteemployee/:id", function(req, res) {
  new userController().deleteEmployee(req, function(err, data) {
    res.send(data);
  });
});

router.get("/deleteemployeedetails/:id", function(req, res) {
  new userController().deleteemployeedetails(req, function(err, data) {
    res.send(data);
  });
});

router.post("/addemployeetime", function(req, res) {
  new userController().addemployeetime(req, function(err, data) {
    console.log(data + "index");
    res.send(data);
  });
});

router.get("/getemployeedetails/:id", function(req, res, next) {
  new userController().getemployeedetails(req, function(err, data) {
    res.send(data);
  });
});

router.post("/updateemployeedetails/:id", function(req, res) {
  new userController().updateemployeedetails(req, function(err, data) {
    res.send(data);
  });
});

router.post("/checklogin", function(req, res) {
  new userController().checklogin(req, function(err, data) {
    if (data != null) {
      const user = {
        data: data
      };
      const token = jwt.sign(
        {
          user
        },
        "my_secret_key",
        {
          expiresIn: 86400
        }
      );
      res.status(200).send({
        token: token
      });
    } else {
      res.send("no");
    }
  });
});

router.post("/register", function(req, res) {
  new userController().register(req, function(err, data) {
    // console.log(data.date);
    // res.send(data);
    if (data != null) {
      const user = {
        data: data
      };
      const token = jwt.sign(
        {
          user
        },
        "my_secret_key",
        {
          expiresIn: 86400
        }
      );
      // console.log(token);
      res.status(200).send({
        token: token,
        data: data
      });
    } else {
      res.send("Something Wrong Occured!!!!!");
    }
  });
});

router.get("/usertoken", verifyToken, (req, res) => {
  jwt.verify(req.token, "my_secret_key", (err, data) => {
    if (err) {
      res.sendStatus(403);
    } else {
      console.log(data);
      res.send({
        data: data
      });
    }
  });
});

function verifyToken(req, res, next) {
  const dashHeader = req.headers["authorization"];
  if (typeof dashHeader !== undefined) {
    const dashToken = dashHeader;
    req.token = dashToken;
    next();
  } else {
    res.sendStatus();
  }
}

module.exports = router;
