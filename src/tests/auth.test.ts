import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { getRepository } from 'typeorm';
import protect from '../middleware/auth';
import ErrorResponse from '../helpers/errorResponse';
import { Student } from '../entities/Student';
import { Supporter } from '../entities/Supporter';
import { mockRequest, mockResponse, mockNext } from '../utils/testUtils';
import { errors } from '../helpers/errors';
// Jest türlerini import edin
import 'jest';

jest.mock('jsonwebtoken', () => ({
  verify: jest.fn(),
}));

jest.mock('typeorm', () => ({
  getRepository: jest.fn().mockReturnValue({
    findOne: jest.fn(),
  }),
}));

describe('protect middleware', () => {
  let req: Request;
  let res: Response;
  let next: NextFunction;

  beforeEach(() => {
    req = mockRequest();
    res = mockResponse();
    next = mockNext();
  });

  it('should call next with error if token is missing', async () => {
    req.headers.authorization = '';

    await protect(req, res, next);

    expect(next).toHaveBeenCalledWith(new ErrorResponse(errors.UN_AUTHORIZED, 'EN', 'Token missing'));
  });

  it('should call next with error if token is invalid', async () => {
    req.headers.authorization = 'Bearer invalidtoken';
    (verify as jest.Mock).mockImplementation(() => {
      throw new Error('Invalid token');
    });

    await protect(req, res, next);

    expect(next).toHaveBeenCalledWith(new ErrorResponse(errors.UN_AUTHORIZED, 'EN', 'Invalid token'));
  });

  it('should call next if token is valid and user is active', async () => {
    req.headers.authorization = 'Bearer validtoken';
    (verify as jest.Mock).mockReturnValue({ id: 1, role: 'student' });
    (getRepository(Student).findOne as jest.Mock).mockResolvedValue({ user: { isActive: true } });

    await protect(req, res, next);

    expect(req.user).toEqual({ user: { isActive: true } });
    expect(next).toHaveBeenCalled();
  });

  it('should call next with error if user is not active', async () => {
    req.headers.authorization = 'Bearer validtoken';
    (verify as jest.Mock).mockReturnValue({ id: 1, role: 'student' });
    (getRepository(Student).findOne as jest.Mock).mockResolvedValue({ user: { isActive: false } });

    await protect(req, res, next);

    expect(next).toHaveBeenCalledWith(new ErrorResponse(errors.UN_AUTHORIZED, 'EN'));
  });
});
