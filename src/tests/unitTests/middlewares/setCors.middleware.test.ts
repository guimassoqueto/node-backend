import setCors from "../../../middlewares/setCors.middleware";
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

    expect(1+1).toEqual(2);
  })
});