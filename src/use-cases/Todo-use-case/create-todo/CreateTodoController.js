const TodoModel = require('../../../model/todo.model');

const { CreateTodo } = require('./CreateTodoUseCase');
const { Command } = require('./Command');

exports.createTodo = async (request, response, next) => {
    const command = new Command(request.body);
    const useCase = new CreateTodo(TodoModel, command);
    const responder = await useCase.execute();

    if(responder.isErr()) {
        response.status(400).json(responder.extract()).send(); 
    } else {
        response.status(201).json(responder.extract()).send();
    }
}