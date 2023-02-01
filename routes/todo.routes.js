const express = require("express");
const TodoController = require("../controllers/todo.controller")

const router = express.Router();

router.get("/", TodoController.getTodo)
router.post("/", TodoController.createTodo)


module.exports = router;