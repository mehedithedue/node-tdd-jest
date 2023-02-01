const TodoController = require("../../controllers/todo.controller");
const todoModel = require("../../model/todo.model");
const TodoModel = require("../../model/todo.model");
const httpMocks = require("node-mocks-http");
const newTodo = require("../mock-data/new-todo.json");
const allTodos = require("../mock-data/all-todo.json");

TodoModel.create = jest.fn();
TodoModel.find = jest.fn();

let req, res, next;

beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
  next = jest.fn();;
});


describe("TodoController.getTodo", () => {

  it("should have a getTodo function", () => {
    expect(typeof TodoController.getTodo).toBe("function");
  });
  it("should call TodoModel find method", () => {
    TodoController.getTodo(req, res, next);
    expect(todoModel.find).toHaveBeenCalledWith({});
  });
  it("should return response code 200 and all todo", async () => {
    TodoModel.find.mockReturnValue(allTodos);

    await TodoController.getTodo(req, res, next);
    expect(res.statusCode).toBe(200);
    expect(res._isEndCalled()).toBeTruthy();
    expect(res._getJSONData()).toStrictEqual(allTodos);
  });
  it("should handle errors in getTodos", async()=>{
    let errormessage = {message : "Error in find todo"};
    const rejectedPromise = Promise.reject(errormessage)
    TodoModel.find.mockReturnValue(rejectedPromise);

    await TodoController.getTodo(req, res, next);
    expect(next).toHaveBeenCalledWith(errormessage)
  })
});

describe("TodoController.createTodo", () => {
  beforeEach(() => {
    req.body = newTodo;
  });
  it("should have a createTodo function", () => {
    expect(typeof TodoController.createTodo).toBe("function");
  });

  it("should call TodoModel create for creating todo", () => {
    TodoController.createTodo(req, res, next);
    expect(todoModel.create).toBeCalledWith(newTodo);
  });

  it("should return response code 201", async () => {
    await TodoController.createTodo(req, res, next);
    expect(res.statusCode).toBe(201);
    expect(res._isEndCalled()).toBeTruthy();
  });

  it("should return json body of the created Todo", async () => {
    TodoModel.create.mockReturnValue(newTodo);
    await TodoController.createTodo(req, res, next);
    expect(res._getJSONData()).toStrictEqual(newTodo);
  });
});
