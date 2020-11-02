const {createTodo} = require('./create-todo/CreateTodoController');
const {getTodos} = require('./get-todos/GetTodoController');
const {getTodoById} = require('./get-todo-by-id/GetTodoByIdController');

exports.createTodo = createTodo;
exports.getTodos = getTodos;
exports.getTodoById = getTodoById;

