const { createTodo } = require('./create-todo/CreateTodoController');
const { getTodos } = require('./get-todos/GetTodoController');
const { getTodoById } = require('./get-todo-by-id/GetTodoByIdController');
const { updateTodo } = require('./update-todo/UpdateTodoController');
const { deleteTodo } = require('./delete-todo/DeleteController');

exports.createTodo = createTodo;
exports.getTodos = getTodos;
exports.getTodoById = getTodoById;
exports.updateTodo = updateTodo;
exports.deleteTodo = deleteTodo;

