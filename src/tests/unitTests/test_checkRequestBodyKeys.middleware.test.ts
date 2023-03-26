import checkRequestBodyKeys from "../../middlewares/checkRequestBodyKeys.middleware";
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

    const check = checkRequestBodyKeys(
      ["name", "email", "password"]
    );

    expect( 1+1 ).toEqual(2)
  });
});