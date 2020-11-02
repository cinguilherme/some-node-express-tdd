const createController = require('./create-todo/CreateTodoController');
const getTodo = require('./get-todos/GetTodoController');
const todoById = require('./get-todo-by-id/GetTodoByIdController');

exports.createTodo = createController.createTodo;
exports.getTodos = getTodo.getTodos;
exports.getTodoById = todoById.getTodoById;

