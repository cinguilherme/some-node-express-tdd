const TodoModel = require('../../../model/todo.model');
const { UseCase } = require('./UseCase');
const { Command } = require('./Command');

exports.updateTodo = async (req, res, next) => {

    const command = new Command(req.body);
    const useCase = new UseCase(TodoModel, command);
    const responder = await useCase.execute();

    res.status(responder.status()).json(responder.extract()).send();

}