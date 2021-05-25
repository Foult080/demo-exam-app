const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const config = require("config");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/Users");
const auth = require("../middleware/Auth");

//@route PUT /api/users
//desc add database options to user record
router.put(
  "/",
  auth,
  [
    check("host", "Укажите адрес хоста для подключения").not().isEmpty(),
    check("username", "Укажите пользователя базы данных").not().isEmpty(),
    check("password", "Укажите пароль базы данных").not().isEmpty(),
  ],
  async (req, res) => {
    //validate requset
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      //get data from request
      const { host, username, password } = req.body;
      let user = await User.findById(req.user.id).select("-password");
      user.options = { host, username, password };
      await user.save();
      res.json(user);
    } catch {
      console.error(error.message);
      res.status(500).send("Ошибка сервера");
    }
  }
);

// @route POST api/users
// @desc register new user
router.post("/", auth, async (req, res) => {
  //check user grants
  if (req.user.role !== "admin") {
    return res.status(401).json({ msg: "Нет доступа" });
  }
  //validate req
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { name, email, passwordEx, role } = req.body;
  try {
    //check email
    let user = await User.findOne({ email });
    if (user) {
      res.status(400).json([{
        msg: "Пользователь уже зарегистрирован",
        variant: "success",
      }]);
    }

    //create user obj
    user = new User({
      name,
      email,
      password: passwordEx,
      role,
    });

    //hash pass
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(passwordEx, salt);
    //save user
    await user.save();
    res.json([{ msg: "Эксперn добавлен", variant: "success" }]);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Ошибка сервера");
  }
});

module.exports = router;
