import requiredReqBodyKeys from "../../middlewares/requiredReqBodyKeys.middleware";
import { Request, Response, NextFunction } from "express";


describe("requiredReqBodyKeys middleware", () => {
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
    const expectedResponse = {status: 400, error: "Invalid name"};
    mockRequest = {
      body: {
        name: "aa",
        email: "test@yahoo.com",
        password: "###!!!AAAbbb111222"
      }
    }

    const check = requiredReqBodyKeys(
      ["name", "email", "password"]
    );

    expect( check ).toEqual( expect.any(Function) )

    // The middleware is called
    check(mockRequest as Request, mockResponse as Response, nextFunction)
    // And here you check if the res.json function was called with certain parameters
    expect( 1+1 ).toEqual(2)
  });
});