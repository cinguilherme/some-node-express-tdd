
const TodoController = require('../../src/use-cases/Todo-use-case/TodoController');
const TodoModel = require('../../src/model/todo.model')
const httpMocks = require('node-mocks-http');
const newTodo = require('../mock-data/new-todo.json');
const severalTodos = require('../mock-data/all-todos.json');

jest.mock('../../src/model/todo.model');

describe('Todo Delete', () => {

    let request, response, next;

    beforeEach(() => {
        request = httpMocks.createRequest();
        response = httpMocks.createResponse();
        next = jest.fn();
        TodoModel.findByIdAndDelete.mockReturnValue(true);
    })

    it('should delete sucess', async () => {
        request.body = { _id: '123', ...newTodo };

        await TodoController.deleteTodo(request, response, next);

        expect(response.statusCode).toBe(200);
        expect(response._getJSONData()).toStrictEqual({ delete: true });
    });

});