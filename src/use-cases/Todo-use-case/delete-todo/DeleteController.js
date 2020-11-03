const TodoModel = require('../../../model/todo.model');

exports.deleteTodo = async (req, res, next) => {

    const id = req.body._id;

    await TodoModel.findByIdAndDelete(id);

    res.status(200).json({ delete: true }).send();
}