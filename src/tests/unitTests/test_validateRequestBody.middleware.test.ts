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

  test("wrong email format", async () => {
    const expectedResponse = [{ error: "email inválido", invalidField: "email" }];

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
    const expectedResponse = [{error: "nome vazio", invalidField: "nome"}];

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
    expect(nextFunction).not.toBeCalled()
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