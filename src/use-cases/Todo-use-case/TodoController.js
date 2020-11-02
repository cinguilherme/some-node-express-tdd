const TodoModel = require('../../model/todo.model');

const createUseCase = require('./create-todo/CreateTodoUseCase');
const createCommand = require('./create-todo/Command');

const getUserCase = require('./GetTodoUseCase')

exports.createTodo = async (request, response, next) => {
    const command = new createCommand.Command(request.body);
    const useCase = new createUseCase.CreateTodo(TodoModel, command);
    const responder = await useCase.execute();

    if(responder.isErr()) {
        response.status(400).json(responder.extract()).send(); 
    } else {
        response.status(201).json(responder.extract()).send();
    }
}

exports.getTodos = async (request, response, next) => {
    
    const useCase = new getUserCase.GetTodos(TodoModel);
    const responder = await useCase.execute();
    
    response.status(200).json(responder).send();
}

