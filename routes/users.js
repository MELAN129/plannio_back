const express = require("express");
const router = express.Router();
const { User, Group } = require("../models/index");

const newName = "Nouveau nom";

router.get("/", async (req, res) => {
  try {
    const data = await User.findAll();
    res.status(200);
    res.send(data);
  } catch (err) {
    res.status(500);
    console.log(err);
  }
});

router.get("/:userId", async (req, res) => {
  try {
    const id = req.params.userId;
    const user = await User.findByPk(+id);

    if (user) {
      res.status(200);
      res.json(user);
    } else {
      res.status(404);
      res.send("Not found, sorry =(");
    }
  } catch (err) {
    res.status(500);
    console.log(err);
  }
});

router.post("/", async (req, res) => {
  try {
    const user = await User.create({
      name: req.body.name,
      role: req.body.role,
    });

    res.status(200);
    res.send();
  } catch (err) {
    res.status(500);
    res.send();
  }
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
    res.status(500);
    console.log(err);
  }
});

// Change the name

router.patch("/:userId", async (req, res) => {
  try {
    const id = req.params.userId;
    const user = await User.findByPk(+id);
    const newName = req.params.name;

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
    res.status(500);
    console.log(err);
  }
});

router.post("/:userId/groups", async (req, res) => {
  try {
    const userId = req.params.userId;
    const groupId = req.body.groupId;
    const user = await User.findByPk(+userId);
    console.log("user:", user);
    const group = await Group.findByPk(+groupId);
    console.log("group:", group);
    if (user && group) {
      await user.addGroup(group, { through: "User_Groups" });
      console.log("ok");
      const groups = await user.getGroups();
      res.status(200);
      res.json(groups);
    } else {
      res.status(404);
      res.send("Not found, sorry =(");
    }
  } catch (err) {
    res.status(500);
    console.log(err);
  }
});

router.get("/:userId/groups", async (req, res) => {
  try {
    const id = req.params.userId;
    const user = await User.findByPk(+id);
    const groups = await user.getGroups();
    res.status(200);
    res.json(groups);
  } catch (err) {
    res.status(500);
    res.send("Oups");
    console.log(err);
  }
});

router.delete("/:userId/groups", async (req, res) => {
  try {
    const userId = req.params.userId;
    const groupId = req.body.groupId;
    const user = await User.findByPk(+userId);
    console.log("user:", user);
    const group = await Group.findByPk(+groupId);
    console.log("group:", group);
    if (user && group) {
      await user.removeGroups(group);
      // console.log("ok");
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

module.exports = router;
