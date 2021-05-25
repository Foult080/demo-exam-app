const express = require("express");
const router = express.Router();
const mysql = require("mysql2");

//@route GET api/database/check
//@desc check connection to db
router.post("/check", async (req, res) => {
  const { host, username, password } = req.body;
  try {
    mysql
      .createConnection({ host, user: username, password })
      .connect((err) => {
        if (err) {
          res.json([{ msg: "MySQL NOT Connected", variant: "danger" }]);
          console.log(err);
        } else res.json([{ msg: "MySQL Connected", variant: "success" }]);
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
