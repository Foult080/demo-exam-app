const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const Events = require("../models/Events");
const auth = require("../middleware/Auth");

//@route POST api/events/
//@desc add new event
router.post(
  "/",
  [
    check("name", "Укажите название события").not().isEmpty(),
    check("students", "укажите хотябы одного студента").not().isEmpty(),
  ],
  auth,
  async (req, res) => {
    //valid data
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      //get data from request
      const { name, students } = req.body;
      //gen data object
      let data = { name: name, students: students, expert: req.user.id };
      //save data
      let event = new Events(data);
      await event.save();
      //response to user
      res.send(event);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ msg: "Ошибка сервера" });
    }
  }
);

//@route GET api/events/
//@desc get my events
router.get("/", auth, async (req, res) => {
  try {
    const events = await Events.find({ expert: req.user.id });
    res.send(events);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Ошибка сервера" });
  }
});

//route PUT api/events
//@desc edit event record
router.put(
  "/",
  [
    check("name", "Укажите название события").not().isEmpty(),
    check("students", "Укажите хотябы одного студента").not().isEmpty(),
  ],
  auth,
  async (req, res) => {
    const { id, name, students } = req.body;
    try {
      let data = { name, students };
      let event = await Events.findOneAndUpdate(
        { _id: id },
        { $set: data },
        { new: true, upsert: true }
      );
      await event.save();
      res.send(event);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ msg: "Ошибка сервера" });
    }
  }
);

//@route DELETE api/events/:id
//@desc delete event by id
router.delete("/:id", auth, async (req, res) => {
  try {
    await Events.findOneAndRemove(req.params.id);
    res.json([{ msg: "Событие удалено", variant: "success" }]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json([{ msg: "Ошибка сервера", variant: "danger"}]);
  }
});

module.exports = router;
