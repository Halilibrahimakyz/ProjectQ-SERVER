import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { getRepository } from 'typeorm';
import ErrorResponse from '../helpers/errorResponse';
import { errors } from '../helpers/errors';
import { Student } from '../entities/Student';
import { Supporter } from '../entities/Supporter';

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
    const decoded = verify(token, process.env.JWT_SECRET!) as unknown as TokenPayload;
    req.role = decoded.role;

    let user;
    if (decoded.role === 'student') {
      user = await getRepository(Student).findOne({ where: { id: decoded.id }, relations: ["user"] });
    } else if (decoded.role === 'supporter') {
      user = await getRepository(Supporter).findOne({ where: { id: decoded.id }, relations: ["user"] });
    }

    if (!user || !user.user.isActive) {
      return next(new ErrorResponse(errors.USER_NOT_ACTIVE, 'EN'));
    }

    req.user = user;

    next();
  } catch (err) {
    console.error('Hata:', err);
    return next(new ErrorResponse(errors.UN_AUTHORIZED_ACCESS, 'EN', 'Invalid token'));
  }
};

export default protect;
