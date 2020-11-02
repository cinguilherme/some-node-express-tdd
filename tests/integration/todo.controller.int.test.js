const request = require('supertest');
const app = require('../../src/app');

const newTodo = require('../mock-data/new-todo.json');
const endpoint_url = "/todos";

describe(endpoint_url, () => {

    it('POST ' + endpoint_url, async () => {
        
        const response = await 
        request(app)
        .post(endpoint_url)
        .send(newTodo);

        expect(response.statusCode).toBe(201);
        expect(response.body.title).toBe(newTodo.title);
        expect(response.body.done).toBe(newTodo.done);
        console.log(response.body);
    });


})