import validateRequestBody from "../../../middlewares/validateRequestBody.middleware";
import { Request, Response, NextFunction } from "express";


describe("validateRequestBody middleware", () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let nextFunction: NextFunction = jest.fn();

  beforeEach(() => {
    mockRequest = {};
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  test('short name should return error', async () => {
    const expectedResponse = [{error: "Invalid name"}];
    mockRequest = {
      body: {
        name: "aa",
        email: "test@yahoo.com",
        password: "###!!!AAAbbb111222"
      }
    }

    validateRequestBody(
      mockRequest as Request,
      mockResponse as Response,
      nextFunction
    );

    expect(mockResponse.status).toBeCalledWith(400);
    expect(mockResponse.json).toBeCalledWith(expectedResponse);
    expect(nextFunction).not.toBeCalled();
  });

  test("wrong email format", async () => {
    const expectedResponse = [{error: "Invalid email"}];

    mockRequest = {
      body: {
        name: "Guilherme",
        email: "test.com",
        password: "###!!!AAAbbb111222"
      }
    }

    validateRequestBody(
      mockRequest as Request,
      mockResponse as Response,
      nextFunction
    );

    expect(mockResponse.status).toBeCalledWith(400);
    expect(mockResponse.json).toBeCalledWith(expectedResponse);
    expect(nextFunction).not.toBeCalled()
  });

  test("empty name provided should return error", async () => {
    const expectedResponse = [{error: "Invalid name"}];

    mockRequest = {
      body: {
        name: "",
        email: "adidas@gmail.com",
        password: "###!!!AAAbbb111222"
      }
    }

    validateRequestBody(
      mockRequest as Request,
      mockResponse as Response,
      nextFunction
    );

    expect(mockResponse.status).toBeCalledWith(400);
    expect(mockResponse.json).toBeCalledWith(expectedResponse);
    expect(nextFunction).not.toBeCalled();
  });

  test("invalid name and email", async () => {
    const expectedResponse = [{error: "Invalid name"}, {error: "Invalid email"}];

    mockRequest = {
      body: {
        name: "aa",
        email: "test",
        password: "###!!!AAAbbb111222"
      }
    }

    validateRequestBody(
      mockRequest as Request,
      mockResponse as Response,
      nextFunction
    );

    expect(mockResponse.status).toBeCalledWith(400);
    expect(mockResponse.json).toBeCalledWith(expectedResponse);
    expect(nextFunction).not.toBeCalled();
  });

  test("Weak password should return error", async () => {
    const expectedResponse = [{error: "Invalid password"}];

    mockRequest = {
      body: {
        name: "guilherme",
        email: "test@yahoo.com",
        password: "password123"
      }
    }

    validateRequestBody(
      mockRequest as Request,
      mockResponse as Response,
      nextFunction
    );

    expect(mockResponse.status).toBeCalledWith(400);
    expect(mockResponse.json).toBeCalledWith(expectedResponse);
    expect(nextFunction).not.toBeCalled();
  });

  test('correct request body should pass and call next()', async () => {
    mockRequest = {
      body: {
        name: "Username",
        email: "test@hotmail.com",
        password: "###!!!AAAbbb111222"
      }
    }

    validateRequestBody(
      mockRequest as Request,
      mockResponse as Response,
      nextFunction
    );

    expect(nextFunction).toBeCalledTimes(1);
  });
});