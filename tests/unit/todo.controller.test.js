const TodoController = require("../../controllers/todo.controller");
const todoModel = require("../../model/todo.model");
const TodoModel = require("../../model/todo.model")
const httpMocks = require("node-mocks-http")
const newTodo = require("../mock-data/new-todo.json")

TodoModel.create = jest.fn();

let req, res, next;

beforeEach( () => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse()
    next = null;
})


describe("TodoController.createTodo", ()=> {
    it("should have a createTodo function", () => {
        expect(typeof TodoController.createTodo).toBe("function")
    });

    it("should call TodoModel create for creating todo", ()=> {
        req.body = newTodo;
        TodoController.createTodo(req, res, next);
        expect(todoModel.create).toBeCalledWith(newTodo);
    })
    it("should return response code 201", () => {
        req.body = newTodo;
        TodoController.createTodo(req, res, next);
        expect(res.statusCode).toBe(201);
        expect(res._isEndCalled()).toBeTruthy();
    })
})