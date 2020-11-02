const TodoModel = require('../../model/todo.model');
const createUseCase = require('./CreateTodoUseCase');

exports.createTodo = async (request, response, next) => {
    const useCase = new createUseCase.CreateTodo(TodoModel, request.body);
    const responder = await useCase.execute();
    
    if (responder.errorMessage) {
        response.status(400).json(responder).send();    
    } else {
        response.status(201).json(responder).send();    
    } 
}

exports.getTodos = async (request, response, next) => {
    const todos = await TodoModel.find();
    response.status(200).json(todos);
}

