const express = require('express');

const todoController = require('../use-cases/Todo-use-case/TodoController');

const router = express.Router();

router.post('/', todoController.createTodo);
router.get('/', todoController.getTodos);
router.get('/:id', todoController.getTodoById);
router.put('/', todoController.updateTodo);
router.delete('/', todoController.deleteTodo);

module.exports = router;