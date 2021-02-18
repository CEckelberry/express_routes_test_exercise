process.env.NODE_ENV = "test";

const request = require("supertest");

const app = require("./item_app");
const items = require('./fakeDb');

let popcorn = {name: "Popcorn", price: 4.20};

beforeEach(function() {
    items.push(popcorn);
})

afterEach(function() {
    items.length = 0;
})

describe("GET /items", function() {
    test("Gets list of items", async function(){
        const resp = await request(app).get('/items');
        expect(resp.statusCode).toBe(200);

        expect(resp.body).toEqual({items:[popcorn]});
    });
});

describe("POST /items", function() {
    test("Creates a new item", async function() {
        const resp = await request(app).post('/items').send({name: "pancakes", price: 3.69});
        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual({added: {name: "pancakes", price: 3.69}});
    });
});

describe("PATCH /items:name", function() {
    test("Updates a single item", async function() {
        const resp = await request(app).patch(`/items/${popcorn.name}`).send({name: "Kettle Corn"});
        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual({"updated":{name: "Kettle Corn"}})
    })
    test("Responds with 404 if name does not exist", async function() {
        const resp = await request(app).patch(`/items/cupcakes`);
        expect(resp.statusCode).toBe(404);
    });
});

describe("DELETE /items/:name", function() {
    test("Deletes a single item", async function() {
        const resp = await request(app).delete(`/items/${popcorn.name}`);
        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual({message: "Deleted"})
    });
});