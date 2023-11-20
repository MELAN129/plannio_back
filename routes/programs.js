const express = require("express");
const router = express.Router();
const { Group, User, Program } = require("../models/index.js");

router.get("/", async (req, res) => {
  try {
    const data = await Program.findAll();
    res.status(200);
    res.send(data);
  } catch (err) {
    res.status(500);
    res.send("Oups");
    console.log(err);
  }
});

router.get("/:programId", async (req, res) => {
  try {
    const id = req.params.programId;
    const program = await Program.findByPk(+id);
    if (program) {
      res.status(200);
      res.json(program);
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
    const program = await Program.create({
      name: req.body.name,
      recurrence: req.body.recurrence,
      fields: JSON.stringify(req.body.fields),
    });
    res.status(200);
    res.send();
  } catch (err) {
    res.status(500);
    res.send(err);
  }
});

router.delete("/:programId", async (req, res) => {
  try {
    const id = req.params.programId;
    const program = await Program.findByPk(+id);
    if (program) {
      await program.destroy();
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

// A finir et vérifier -------------------------------
router.patch("/:programId", async (req, res) => {
  try {
    const id = req.params.programId;
    const program = await Program.findByPk(+id);
    const newName = "Nouveau nom";
    if (program) {
      program.name = newName;
      await program.save();
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
// -------------------------------

module.exports = router;
