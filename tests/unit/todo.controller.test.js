const TodoController = require('../../src/use-cases/Todo-use-case/TodoController');
const TodoModel = require('../../src/model/todo.model')
const httpMocks = require('node-mocks-http');
const newTodo = require('../mock-data/new-todo.json');
const severalTodos = require('../mock-data/all-todos.json');

TodoModel.create = jest.fn();
TodoModel.find = jest.fn();

describe('Todo Controller', () => {
    
    let request, response, next;
    
    beforeEach(() => {
        request = httpMocks.createRequest();
        response = httpMocks.createResponse();
        next = jest.fn();
        TodoModel.create.mockReturnValue(newTodo);
    });

    describe('Get todos', () => {

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

        it('should return several todos' , async () => {
            TodoModel.find.mockReturnValue(severalTodos);
            await TodoController.getTodos(request, response, next);
            expect(response.statusCode).toBe(200);
            expect(response._getJSONData()).toStrictEqual(severalTodos);
            expect(response._isEndCalled()).toBeTruthy();
        });

        it('should return zero todos' , async () => {
            TodoModel.find.mockReturnValue([]);
            await TodoController.getTodos(request, response, next);
            expect(response.statusCode).toBe(200);
            expect(response._getJSONData()).toStrictEqual([]);
            expect(response._isEndCalled()).toBeTruthy();
        });

        it('should handle error on get todos', async () => {
            const errorMessage = {message: "unable to retrieve data from mongo"};
            const rejectedPromise = Promise.reject(errorMessage);
            TodoModel.find.mockReturnValue(rejectedPromise);
            await TodoController.getTodos(request, response, next);
            expect(response.statusCode).toBe(500);
            expect(response._getJSONData().errorMessage).toStrictEqual(errorMessage);
        });


    });

    describe('Todo create todo', () => {

        beforeEach(() => {
            request.body = newTodo;
        })

        it('should have a create todo function', () => {
            expect(typeof TodoController.createTodo).toBe("function");
        })

        it('should call db model with correct data', async () => {
            await TodoController.createTodo(request, response, next);
            expect(TodoModel.create).toBeCalledWith(newTodo);
        });


        it('should return a response code 201 created when create document is success', async () => {
            await TodoController.createTodo(request, response, next);
            
            expect(response.statusCode).toBe(201);
            expect(response._isEndCalled()).toBeTruthy();
        });

        it('should return json body in response', async () => {
            
            TodoModel.create.mockReturnValue(newTodo);
            await  TodoController.createTodo(request, response, next);
            
            expect(response._getJSONData()).toStrictEqual(newTodo);

        });

        it('should handle errors from mongo', async () => {
            const errorMessage = {message: "Done property missing"};
            const rejectedPromise = Promise.reject(errorMessage);

            TodoModel.create.mockReturnValue(rejectedPromise);

            await TodoController.createTodo(request, response, next);
            expect(response._getJSONData().errorMessage).toStrictEqual(errorMessage);
        });
    } )
})