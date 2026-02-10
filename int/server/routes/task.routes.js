const express = require("express");
const Task = require("../models/Task");
const auth = require("../middleware/auth.middleware");

const router = express.Router();

router.get("/", auth, async (req, res) => {
  const tasks = await Task.find({ user: req.userId });
  res.json(tasks);
});


router.post("/", auth, async (req, res) => {
  const task = await Task.create({
    title: req.body.title,
    user: req.userId,
  });
  res.status(201).json(task);
});

router.delete("/:id", auth, async (req, res) => {
  await Task.findOneAndDelete({
    _id: req.params.id,
    user: req.userId,
  });

  res.json({ message: "Deleted" });
});

module.exports = router;
