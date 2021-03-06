process.env.DB_NAME = 'testDB';

const request = require('supertest');
const app = require('../../src/app');
const dbConfig = require('../../src/configs/db');
const newTodo = require('../mock-data/new-todo.json');
const updatedTodo = require('../mock-data/updated-new-todo.json');
const endpoint_url = "/todos";


let appx = request(app);
let preexistingId;

describe(endpoint_url, () => {

    beforeAll(async () => {
        await dbConfig.clearTestDb();
        const response = await appx.post(endpoint_url).send(newTodo);
        preexistingId = response.body._id;
    })

    afterAll(async () => {
        await dbConfig.clearTestDb();
    })

    it('POST ' + endpoint_url, async () => {

        const response = await
            appx
                .post(endpoint_url)
                .send(newTodo);

        expect(response.statusCode).toBe(201);
        expect(response.body.title).toBe(newTodo.title);
        expect(response.body.done).toBe(newTodo.done);

    });

    it('PUT ' + endpoint_url, async () => {

        const response = await
            appx
                .put(endpoint_url)
                .send({
                    done: true,
                    title: "updated",
                    _id: preexistingId
                });

        expect(response.statusCode).toBe(200);
        expect(response.body.title).toBe("updated");
        expect(response.body.done).toBe(true);

    });

    it('PUT error' + endpoint_url, async () => {

        const response = await
            appx
                .put(endpoint_url)
                .send({ ...newTodo });

        expect(response.statusCode).toBe(400);
    });

    it('POST error' + endpoint_url, async () => {
        const response = await
            appx
                .post(endpoint_url)
                .send({ title: "just title" });

        const expectedError = "Todo validation failed";

        expect(response.statusCode).toBe(400);
        expect(response.body.errorMessage._message)
            .toStrictEqual(expectedError);
    });


    it('GET ' + endpoint_url, async () => {
        await dbConfig.clearTestDb();
        const response = await
            appx
                .get(endpoint_url)
                .send();

        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBe(0);
    });

})