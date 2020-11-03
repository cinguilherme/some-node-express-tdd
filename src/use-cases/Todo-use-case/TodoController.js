const { createTodo } = require('./create-todo/CreateTodoController');
const { getTodos } = require('./get-todos/GetTodoController');
const { getTodoById } = require('./get-todo-by-id/GetTodoByIdController');
const { updateTodo } = require('./update-todo/UpdateTodoController');

exports.createTodo = createTodo;
exports.getTodos = getTodos;
exports.getTodoById = getTodoById;
exports.updateTodo = updateTodo;

