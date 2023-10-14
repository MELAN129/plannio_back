const express = require("express");
const router = express.Router();
const Group = require("../models/groupsModel.js");

const newName = "yo";

router.get("/", (req, res) => {
  res.status(200);
  Group.findAll().then((data) => res.send(data));
});

router.get("/:groupId", (req, res) => {
  const id = req.params.groupId;
  const group = Group.findByPk(+id)
    .then((group) => {
      if (group) {
        res.status(200);
        res.json(group);
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
  const group = Group.create({
    name: req.body.name,
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
    res.status(400);
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
    res.status(400);
    console.log(err);
  }
});

module.exports = router;
