import { Request, Response, NextFunction } from 'express';

export const mockRequest = (sessionData: any = {}): Request => {
  const req = {
    body: {},
    headers: {},
    ...sessionData,
  } as Request;
  return req;
};

export const mockResponse = (): Response => {
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
    send: jest.fn().mockReturnThis(), 
  } as unknown as Response;
  return res;
};

export const mockNext = (): NextFunction => jest.fn();
