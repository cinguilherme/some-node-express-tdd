const TodoModel = require('../../../model/todo.model');
const {Command} = require('./Command');
const {GetTodos} = require('./GetTodoUseCase');

exports.getTodos = async (request, response, next) => {
    const command = new Command(request.body);
    const useCase = new GetTodos(TodoModel, command);
    const responder = await useCase.execute();
    if(responder.isErr()){
        response.status(500).json(responder.extract()).send();
    } else {
        response.status(200).json(responder.extract()).send();
    }
}

