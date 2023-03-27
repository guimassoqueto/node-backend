import isAuth from "../../middlewares/isAuth.middleware";
import { Request, Response, NextFunction } from "express";
import { Status } from "../../enums/statusCodes.enum";
import { Message } from "../../enums/Messages.enum";


describe("isAuth middleware", () => {
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

  test('invalid Token', async () => {
    const expectedResponse = { status: Status.Forbidden, message: Message.NotAuthenticated };
    mockRequest = {
      headers: {
        authorization: "Bearer INVALIDTOKEN"
      }
    }

    isAuth(
      mockRequest as Request,
      mockResponse as Response,
      nextFunction
    );

    expect(nextFunction).not.toBeCalled();
    expect(mockResponse.status).toBeCalledWith(Status.Forbidden);
    expect(mockResponse.json).toBeCalledWith(expectedResponse);
  });

});