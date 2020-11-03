const TodoController = require('../../src/use-cases/Todo-use-case/TodoController');
const TodoModel = require('../../src/model/todo.model')
const httpMocks = require('node-mocks-http');
const newTodo = require('../mock-data/new-todo.json');
const updatedTodo = require('../mock-data/updated-new-todo.json');
const severalTodos = require('../mock-data/all-todos.json');

TodoModel.create = jest.fn();
TodoModel.find = jest.fn();
TodoModel.findById = jest.fn();
TodoModel.findByIdAndUpdate = jest.fn();

describe('Update todos', () => {

    let request, response, next;

    beforeEach(() => {
        request = httpMocks.createRequest();
        response = httpMocks.createResponse();
        next = jest.fn();
        TodoModel.findByIdAndUpdate.mockReturnValue(updatedTodo);
    });

    it('should have a updateTodo function', () => {
        expect(typeof TodoController.updateTodo).toBe("function");
    });

    it('should update existing document', async () => {
        const todo = { ...newTodo, _id: '83748374' };
        request.body = todo;
        await TodoController.updateTodo(request, response, next);

        expect(response.statusCode).toBe(200);
        expect(response._isEndCalled()).toBeTruthy();
        expect(response._getJSONData()).toStrictEqual(updatedTodo);
    });

    it('should fail update due to rejected promise', async () => {
        const todo = { ...newTodo, _id: '83748374' };
        request.body = todo;

        const errorMessage = { message: "an error" };
        const rejectedPromise = Promise.reject(errorMessage);

        TodoModel.findByIdAndUpdate.mockReturnValue(rejectedPromise);
        await TodoController.updateTodo(request, response, next);

        expect(response.statusCode).toBe(500);
        expect(response._isEndCalled()).toBeTruthy();
        expect(response._getJSONData()).toStrictEqual({ errorMessage: { message: "an error", type: 500 } });
    });

});