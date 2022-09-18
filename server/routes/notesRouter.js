const express = require("express");
const Note = require("../models/note");

const router = express.Router();

router.get("/notes", async (req, res, next) => {
  try {
    const notes = await Note.query().orderBy("updated_at", "desc");
    res.json(notes);
  } catch (err) {
    res.json(err.message);
  }
});

router.get("/note/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const note = await Note.query().findById(id);
    res.json(note);
  } catch (err) {
    res.json(err.message);
  }
});

router.post("/note", async (req, res) => {
  try {
    const note = await Note.query().insertAndFetch({
      title: req.body.title,
      body: req.body.body,
      type: "text",
      owner_id: 1,
    });
    res.json(note);
  } catch (err) {
    res.json(err.message);
  }
});

router.patch("/note/:id", async (req, res) => {
  try {
    let newValues = {};
    req.body.title ? (newValues.title = req.body.title) : "";
    req.body.body ? (newValues.body = req.body.body) : "";
    newValues.updated_at = new Date().toISOString();
    await Note.query().patch(newValues).where("id", req.params.id);
    res.sendStatus(204);
  } catch (err) {
    res.json(err.message);
  }
});

router.delete("/note/:id", async (req, res) => {
  try {
    await Note.query().delete().where("id", req.params.id);
    res.sendStatus(204);
  } catch (err) {
    res.json(err.message);
  }
});

module.exports = router;
