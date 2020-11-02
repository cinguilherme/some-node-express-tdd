const TodoModel = require('../../model/todo.model');

exports.createTodo = async (request, response, next) => {
    
    const createModel = await TodoModel.create(request.body);

    response.status(201).json(createModel);
}

exports.getTodos = async (request, response, next) => {
    const todos = await TodoModel.find();
    response.status(200).json(todos);
}

