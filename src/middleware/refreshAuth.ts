import { Request, Response, NextFunction } from 'express';
import { verify, JwtPayload } from 'jsonwebtoken';
import ErrorResponse from '../helpers/errorResponse';
import { errors } from '../helpers/errors';
import { Student } from '../entities/Student';
import { Supporter } from '../entities/Supporter';

declare module 'express-serve-static-core' {
  interface Request {
    user?: Student | Supporter;
    role?: 'student' | 'supporter';
  }
}

const refreshAuth = async (req: Request, res: Response, next: NextFunction) => {
    const { refreshToken } = req.body;
    console.log("refreshtoken: ",refreshToken)
    if (!refreshToken) {
      return next(new ErrorResponse(errors.UN_AUTHORIZED_REFRESH, 'EN', 'Refresh token missing'));
    }
  
    try {
      const decoded = verify(refreshToken, process.env.JWT_REFRESH_SECRET!) as JwtPayload;
  
      if (typeof decoded !== 'string' && decoded.role) {
        req.role = decoded.role as 'student' | 'supporter'; // Role'ü belirliyoruz
      } else {
        return next(new ErrorResponse(errors.UN_AUTHORIZED_REFRESH, 'EN', 'Invalid token'));
      }
  
      next();
    } catch (err) {
      return next(new ErrorResponse(errors.UN_AUTHORIZED_REFRESH, 'EN', 'Invalid token'));
    }
  };
  
export default refreshAuth;
