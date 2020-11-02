process.env.DB_NAME = 'testDB';

const request = require('supertest');
const app = require('../../src/app');
const dbConfig = require('../../src/configs/db');
const newTodo = require('../mock-data/new-todo.json');
const endpoint_url = "/todos";

describe(endpoint_url, () => {

    beforeEach( async () => {
        await dbConfig.clearTestDb();
    });

    it('POST ' + endpoint_url, async () => {
        
        const response = await 
        request(app)
        .post(endpoint_url)
        .send(newTodo);

        expect(response.statusCode).toBe(201);
        expect(response.body.title).toBe(newTodo.title);
        expect(response.body.done).toBe(newTodo.done);
        
    });

    it('POST error' + endpoint_url, async () => {
        const response = await 
        request(app)
        .post(endpoint_url)
        .send({title:"just title"});

        const expectedError = "Todo validation failed";

        expect(response.statusCode).toBe(400);
        expect(response.body.errorMessage._message)
        .toStrictEqual(expectedError);
    });


    it('GET ' + endpoint_url, async () => {
        await request(app).post(endpoint_url).send(newTodo);

        const response = await 
        request(app)
        .get(endpoint_url)
        .send();
        
        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBe(1);
    });
})