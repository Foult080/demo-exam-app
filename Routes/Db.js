const express = require("express");
const router = express.Router();
const mysql = require("mysql2");

const initialConnect = {
  host: "192.168.70.5",
  user: "appuser",
  password: "pass",
  insecureAuth: true,
};

//@route GET api/database/check
//@desc check connection to db
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

//@route POST api/database/create
//@desc create database with data from request
router.post("/create", async (req, res) => {
  const { databases } = req.body;
  try {
    let connection = mysql.createConnection(initialConnect);
    connection.beginTransaction((err) => {
      if (err) {
        throw err;
      }
      databases.forEach((database) => {
        connection.query(
          `DROP DATABASE IF EXISTS ${database.name}`,
          (error, results, fields) => {
            if (error) {
              return connection.rollback((error) => {
                throw error;
              });
            }
            connection.query(
              `CREATE DATABASE ${database.name}`,
              (error, results, fields) => {
                if (error) {
                  return connection.rollback((error) => {
                    throw error;
                  });
                }
                connection.commit((err) => {
                  if (err) {
                    return connection.rollback((err) => {
                      throw err;
                    });
                  }
                });
              }
            );
          }
        );
      });
      res.json({ msg: "Databases created" });
    });
  } catch (err) {
    res.status(500).send("Ошибка сервера");
    throw err;
  }
});

module.exports = router;
