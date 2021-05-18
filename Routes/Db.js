const express = require("express");
const router = express.Router();
const mysql = require("mysql2");

const initialConnect = {
  host: "192.168.70.5",
  user: "appuser",
  password: "pass",
  database: "DemoExam",
  insecureAuth: true,
};

//check connection to db
router.get("/", async (req, res) => {
  try {
    console.log(
      mysql.createConnection(initialConnect).connect((err) => {
        if (err) throw err;
        else console.log("MySQL connected");
      })
    );
    res.send("Hello");
  } catch (err) {
    res.status(500).send("Ошибка сервера");
    throw err;
  }
});

module.exports = router;
