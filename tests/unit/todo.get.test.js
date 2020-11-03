const TodoController = require('../../src/use-cases/Todo-use-case/TodoController');
const TodoModel = require('../../src/model/todo.model')
const httpMocks = require('node-mocks-http');
const newTodo = require('../mock-data/new-todo.json');
const severalTodos = require('../mock-data/all-todos.json');

jest.mock('../../src/model/todo.model');

describe('Get todos', () => {

    let request, response, next;

    beforeEach(() => {
        request = httpMocks.createRequest();
        response = httpMocks.createResponse();
        next = jest.fn();

        TodoModel.create.mockReturnValue(newTodo);
    });

    it('should have get todos function', () => {
        expect(typeof TodoController.getTodos).toBe("function");
    });

    it('should get all todos', async () => {
        TodoModel.find.mockReturnValue([newTodo]);
        await TodoController.getTodos(request, response, next);
        expect(response.statusCode).toBe(200);
        expect(response._getJSONData()).toStrictEqual([newTodo]);
        expect(response._isEndCalled()).toBeTruthy();
    })

    it('should return several todos', async () => {
        TodoModel.find.mockReturnValue(severalTodos);
        await TodoController.getTodos(request, response, next);
        expect(response.statusCode).toBe(200);
        expect(response._getJSONData()).toStrictEqual(severalTodos);
        expect(response._isEndCalled()).toBeTruthy();
    });

    it('should return zero todos', async () => {
        TodoModel.find.mockReturnValue([]);
        await TodoController.getTodos(request, response, next);
        expect(response.statusCode).toBe(200);
        expect(response._getJSONData()).toStrictEqual([]);
        expect(response._isEndCalled()).toBeTruthy();
    });

    it('should handle error on get todos', async () => {
        const errorMessage = { message: "unable to retrieve data from mongo" };
        const rejectedPromise = Promise.reject(errorMessage);
        TodoModel.find.mockReturnValue(rejectedPromise);
        await TodoController.getTodos(request, response, next);
        expect(response.statusCode).toBe(500);
        expect(response._getJSONData().errorMessage).toStrictEqual(errorMessage);
    });

    describe('get todo by id', () => {
        it('should have todo by id', async () => {
            expect(typeof TodoController.getTodoById).toBe("function");
        });

        it('should get todo by id', async () => {
            TodoModel.findById.mockReturnValue(newTodo);
            request.params.id = 1;
            await TodoController.getTodoById(request, response, next);
            expect(response.statusCode).toBe(200);
            expect(response._getJSONData()).toStrictEqual(newTodo);
        });

        it('should return 500 when db does not respond', async () => {
            const errorMessage = { message: "unable to retrieve data from mongo" };
            const rejectedPromise = Promise.reject(errorMessage);
            TodoModel.findById.mockReturnValue(rejectedPromise);
            request.params.id = 1;
            await TodoController.getTodoById(request, response, next);
            expect(response.statusCode).toBe(500);
            expect(response._getJSONData().errorMessage)
                .toStrictEqual({ message: "unable to retrieve data from mongo" });

        });

        it('should return 404 if no doc is found', async () => {
            TodoModel.findById.mockReturnValue(null);
            request.params.id = '5fa01f1c346bef4b98170d20';
            await TodoController.getTodoById(request, response, next);
            expect(response.statusCode).toBe(404);
        });
    });

});