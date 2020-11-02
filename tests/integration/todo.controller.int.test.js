process.env.DB_NAME = 'testDB';

const request = require('supertest');
const app = require('../../src/app');
const dbConfig = require('../../src/configs/db');
const newTodo = require('../mock-data/new-todo.json');
const endpoint_url = "/todos";

describe(endpoint_url, () => {

    beforeEach( async () => {
        console.log('before each run');
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
        console.log(response.body);
    });

    it('GET ' + endpoint_url, async () => {
        
        const response = await 
        request(app)
        .get(endpoint_url)
        .send();

        expect(response.statusCode).toBe(200);
       
        console.log(response.body.length);
    });


})