const express = require("express");
const router = express.Router();
const mysql = require("mysql2");

const initialConnect = {
  host: "192.168.70.5",
  user: "appuser",
  password: "pass",
  insecureAuth: true,
};

//check connection to db
router.get("/check", async (req, res) => {
  try {
    mysql.createConnection(initialConnect).connect((err) => {
      if (err) throw err;
      else res.json({ msg: "MySQL Connected" });
    });
  } catch (err) {
    res.status(500).send("Ошибка сервера");
    throw err;
  }
});

module.exports = router;
