const express = require('express');

const todoController = require('../use-cases/Todo-use-case/TodoController');

const router = express.Router();

router.post('/', todoController.createTodo);
router.get('/', todoController.getTodos);

module.exports = router;