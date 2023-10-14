const express = require("express");
const router = express.Router();
const User = require("../models/usersModel.js");

const newName = "Nouveau nom";

router.get("/", (req, res) => {
  res.status(200);
  User.findAll().then((data) => res.send(data));
});

router.get("/:userId", (req, res) => {
  const id = req.params.userId;
  const user = User.findByPk(+id)
    .then((user) => {
      if (user) {
        res.status(200);
        res.json(user);
      } else {
        res.status(404);
        res.send("Not found, sorry =(");
      }
    })
    .catch((err) => {
      res.status(400);
      console.log(err);
    });
});

router.post("/", (req, res) => {
  const user = User.create({
    name: req.body.name,
    role: req.body.role,
    assignments: req.body.assignments,
  })
    .then(() => {
      res.status(200);
      res.send();
    })
    .catch(() => {
      res.status(500);
      res.send();
    });
});

router.delete("/:userId", async (req, res) => {
  try {
    const id = req.params.userId;
    const user = await User.findByPk(+id);

    if (user) {
      await user.destroy();
      res.status(200);
      res.send("Removed successfully");
    } else {
      res.status(404);
      res.send("Not found, sorry =(");
    }
  } catch (err) {
    res.status(400);
    console.log(err);
  }
});

router.patch("/:userId", async (req, res) => {
  try {
    const id = req.params.userId;
    const user = await User.findByPk(+id);

    if (user) {
      user.name = newName;
      await user.save();
      res.status(200);
      res.send("Updating successfully");
    } else {
      res.status(404);
      res.send("Not found, sorry =(");
    }
  } catch (err) {
    res.status(400);
    console.log(err);
  }
});

User.sync();

module.exports = router;
