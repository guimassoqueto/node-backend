import validateRequestBody from "../../middlewares/validateRequestBody.middleware";
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

  test('invalid body should return error', async () => {
    const expectedResponse = [{error: "corpo inválido"}];
    mockRequest = {
      body: {
        invalidKey: "test",
        another: "test"
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

  test('short name should return error', async () => {
    const expectedResponse = [{error: "nome inválido"}];
    mockRequest = {
      body: {
        name: "aa",
        email: "test@test.com"
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
    const expectedResponse = [{error: "email inválido"}];

    mockRequest = {
      body: {
        name: "Guilherme",
        email: "test"
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
    const expectedResponse = [{error: "nome inválido"}];

    mockRequest = {
      body: {
        name: "",
        email: "test@gmail.com"
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
    const expectedResponse = [{error: "nome inválido"}, {error: "email inválido"}];

    mockRequest = {
      body: {
        name: "aa",
        email: "test"
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
        email: "test@gmail.com"
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