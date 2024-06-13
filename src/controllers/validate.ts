import { Request, Response } from 'express';
import { findUserByUsername } from '../repositories/validate';
import ErrorResponse from '../helpers/errorResponse';
import { errors } from '../helpers/errors';
import { hashPassword, comparePassword } from '../helpers/hash';
import { generateAccessToken, generateRefreshToken, verifyRefreshToken, invalidateRefreshToken } from '../helpers/token';

export const httpCheckUserName = async (req: Request, res: Response): Promise<void> => {
    const { username } = req.body;
  
    try {
        if (!username) {
            throw new ErrorResponse(errors.UN_AUTHORIZED_ACCESS, 'EN', 'Username is required');
          }
      const user = await findUserByUsername(username);
  
    //   if (user) {
    //     throw new ErrorResponse(errors.USERNAME_TAKEN, 'EN', 'Username is already taken');
    //   }
  
    if (user) {
        res.status(200).json({ 
          success: false, 
          message: 'Username is already taken' 
        });
      } else {
        res.status(200).json({ 
          success: true, 
          message: 'Username is available' 
        });
    }
    } catch (error) {
      ErrorResponse.handleErrorResponse(res, error);
    }
  };
