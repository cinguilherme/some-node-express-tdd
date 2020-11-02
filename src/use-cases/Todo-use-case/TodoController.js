const createController = require('./create-todo/CreateTodoController');
const getTodo = require('./get-todos/GetTodoController');

exports.createTodo = createController.createTodo;
exports.getTodos = getTodo.getTodos;

