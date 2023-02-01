const request = require("supertest");
const app = require("../../app");
const newTodo = require("../mock-data/new-todo.json");

const endPointURL = "/todos";

describe(endPointURL, () => {
  it("Test Post request of " + endPointURL, async () => {
    const response = await request(app).post(endPointURL).send(newTodo);

    expect(response.statusCode).toBe(201);
    expect(response.body.title).toBe(newTodo.title);
    expect(response.body.done).toBe(newTodo.done);
  });
});
