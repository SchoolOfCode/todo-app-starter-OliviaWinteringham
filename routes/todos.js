const express = require("express");
const connect = require("../connect");
const shortid = require("shortid");
const router = express.Router();

let db;

connect("todoapp").then(database => {
  db = database;
});

router.get("/", (req, res, next) => {
  // GET / -> all of the todos in the db
  db.collection("todos")
    .find({})
    .toArray()
    .then(todos => {
      res.json({ payload: todos });
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
});

router.post("/", (req, res, next) => {
  // POST / -> create a new todo in the db
  const todo = {
    title: req.body.title,
    completed: false,
    id: shortid.generate()
  };
  db.collection("todos")
    .insert(todo)
    .then(() => {
      res.status(201).json({ message: "All good, created it" });
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
});

router.get("/:id", (req, res, next) => {
  // GET /:id -> individual todo with the id given
  db.collection("todos")
    .findOne({ id: req.params.id })
    .then(todo => {
      res.json({ payload: todo });
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
});

router.patch("/:id", (req, res, next) => {
  // GET /:id -> individual todo with the id given
  db.collection("todos")
    .update({ id: req.params.id }, { $set: { completed: true } })
    .then(() => {
      res.json({ message: "Completed" });
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
});

module.exports = router;
