const TodoModel = require('../../../model/todo.model');

exports.getTodoById = async (request, response, next) => {
    
    const doc = await TodoModel.findById("0");
    response.status(200).json(doc).send();
}