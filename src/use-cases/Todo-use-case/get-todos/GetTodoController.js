const TodoModel = require('../../../model/todo.model');

const {GetTodos} = require('./GetTodoUseCase');

exports.getTodos = async (request, response, next) => {
    
    const useCase = new GetTodos(TodoModel);
    const responder = await useCase.execute();
    
    response.status(200).json(responder).send();
}

