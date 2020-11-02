const TodoModel = require('../../../model/todo.model');

const { UseCase } = require('./UseCase');
const { Command } = require('./Command');

exports.getTodoById = async (request, response, next) => {
    
    const { id } = request.params;
    console.log(id);
    const command = new Command(id);
    const useCase = new UseCase(TodoModel, command);
    const responder = await useCase.execute();
    
    const status = responder.isErr() ? 400 : 200;
    
    response.status(status).json(responder.extract()).send();
    
}