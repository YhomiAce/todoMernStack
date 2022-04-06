const express = require("express");
const TodoController = require("../../controllers/TodoController");
const Auth = require("../../middleware/auth");
const {
  todoValidator,
  validate,
} = require("../../helpers/validators");
const router = express.Router();

// @route  api/todo
// @method GET
// @access private
router.get("/", Auth, TodoController.getAllUserTodo);

router.get("/:id", Auth, TodoController.getSingleTodo);

router.post("/", Auth, todoValidator(), validate, TodoController.createTodo);

router.delete("/:id", Auth, TodoController.deleteTodo);

router.patch("/:id", Auth, TodoController.updateTodo);

module.exports = router;
