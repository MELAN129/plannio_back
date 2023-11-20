const express = require("express");
const router = express.Router();
const { Group, User } = require("../models/index.js");

router.get("/", async (req, res) => {
  try {
    const data = await Group.findAll();
    res.status(200);
    res.send(data);
  } catch (err) {
    res.status(500);
    res.send("Oups");
    console.log(err);
  }
});

router.get("/:groupId", async (req, res) => {
  try {
    const id = req.params.groupId;
    const group = await Group.findByPk(+id);
    if (group) {
      res.status(200);
      res.json(group);
    } else {
      res.status(404);
      res.send("Not found, sorry =(");
    }
  } catch (err) {
    res.status(500);
    res.send("Something happened =/");
    console.log(err);
  }
});

router.post("/", async (req, res) => {
  try {
    const group = await Group.create({
      name: req.body.name,
      description: req.body.description,
      head: req.body.head,
    });
    res.status(200);
    res.send();
  } catch (err) {
    res.status(500);
    res.send(err);
  }
});

router.delete("/:groupId", async (req, res) => {
  try {
    const id = req.params.groupId;
    const group = await Group.findByPk(+id);
    if (group) {
      await group.destroy();
      res.status(200);
      res.send("Removed successfully");
    } else {
      res.status(404);
      res.send("Not found, sorry =(");
    }
  } catch (err) {
    res.status(500);
    console.log(err);
  }
});

router.patch("/:groupId", async (req, res) => {
  try {
    const id = req.params.groupId;
    const group = await Group.findByPk(+id);

    if (group) {
      group.name = newName;
      await group.save();
      res.status(200);
      res.send("Updating successfully");
    } else {
      res.status(404);
      res.send("Not found, sorry =(");
    }
  } catch (err) {
    res.status(500);
    console.log(err);
  }
});

// Add a user to a group

router.post("/:groupId/users", async (req, res) => {
  try {
    const groupId = req.params.groupId;
    const userId = req.body.id;
    const group = await Group.findByPk(+groupId);
    const user = await User.findByPk(+userId);
    if (group && user) {
      await group.addUser(user, { through: "User_Groups" });
      console.log("ok");
      res.status(200);
      res.send("Updating successfully");
    } else {
      res.status(404);
      res.send("Not found, sorry =(");
    }
  } catch (err) {
    res.status(500);
    console.log(err);
  }
});

// Get users from a specific group

router.get("/:groupId/users", async (req, res) => {
  try {
    const groupId = req.params.groupId;
    const group = await Group.findByPk(groupId);
    const users = await group.getUsers();
    console.log(users);
    // await User_Groups.findAll({
    //   groupId: groupId,
    // });
    res.status(200);
    res.json(users);
  } catch (err) {
    res.status(500);
    res.send("Oups");
    console.log(err);
  }
});

module.exports = router;
