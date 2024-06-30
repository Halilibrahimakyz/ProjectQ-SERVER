import { Request, Response, NextFunction } from 'express';
import { verify, TokenExpiredError } from 'jsonwebtoken';
import { AppDataSource } from '../data-source';
import ErrorResponse from '../helpers/errorResponse';
import { errors } from '../helpers/errors';
import { Student } from '../entities/Student';
import { Supporter } from '../entities/Supporter';
import { User } from '../entities/User';

interface TokenPayload {
  id: number;
  role: 'student' | 'supporter';
}

declare module 'express-serve-static-core' {
  interface Request {
    user?: Student | Supporter;
    role?: 'student' | 'supporter';
  }
}

const getTokenFromHeaders = (req: Request): string | null => {
  const { authorization } = req.headers;
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.split(' ')[1];
  }
  return null;
};

const protect = async (req: Request, res: Response, next: NextFunction) => {
  const token = getTokenFromHeaders(req);
  console.log("accessToken: ", token);

  if (!token) {
    return next(new ErrorResponse(errors.UN_AUTHORIZED_ACCESS, 'EN', 'Token missing'));
  }

  try {
    const decoded = verify(token, process.env.JWT_SECRET!) as TokenPayload;
    req.role = decoded.role;

    const user = await AppDataSource.getRepository(User).findOne({
      where: { id: decoded.id },
      relations: ['student', 'supporter'],
    });

    if (!user || !user.isActive) {
      return next(new ErrorResponse(errors.USER_NOT_ACTIVE, 'EN'));
    }

    if (decoded.role === 'student') {
      req.user = user.student;
    } else if (decoded.role === 'supporter') {
      req.user = user.supporter;
    }

    if (!req.user) {
      return next(new ErrorResponse(errors.UN_AUTHORIZED_ACCESS, 'EN', 'Invalid token'));
    }

    next();
  } catch (err) {
    if (err instanceof TokenExpiredError) {
      // Token expired error handling
      console.error('Token expired:', err);
      return res.status(401).json({ message: 'Token expired' });
    } else {
      console.error('Hata:', err);
      return next(new ErrorResponse(errors.UN_AUTHORIZED_ACCESS, 'EN', 'Invalid token'));
    }
  }
};

export default protect;
