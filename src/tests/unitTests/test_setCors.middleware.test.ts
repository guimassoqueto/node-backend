import setCors from "../../middlewares/setCors.middleware";
import { Request, Response, NextFunction } from "express";

describe("setCors middleware", () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let nextFunction: NextFunction = jest.fn();

  beforeEach(() => {
    mockRequest = {};
    mockResponse = {
      setHeader: jest.fn(),
    };
  });

  test("middleware should add values to the headers before continue", () => {

    setCors(
      mockRequest as Request, 
      mockResponse as Response, 
      nextFunction
    );

    expect(mockResponse.setHeader).toBeCalledTimes(3);
    expect(mockResponse.setHeader).toBeCalledWith('Access-Control-Allow-Origin', '*');
    expect(mockResponse.setHeader).toBeCalledWith('Access-Control-Allow-Methods', 'GET, POST, DELETE');
    expect(mockResponse.setHeader).toBeCalledWith('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    expect(nextFunction).toBeCalled();
  })
});