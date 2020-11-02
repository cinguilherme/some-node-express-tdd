const TodoModel = require('../../model/todo.model');
const createUseCase = require('./CreateTodoUseCase');
const getUserCase = require('./GetTodoUseCase')

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
    
    const useCase = new getUserCase.GetTodos(TodoModel);
    const responder = await useCase.execute();
    
    response.status(200).json(responder).send();
}

