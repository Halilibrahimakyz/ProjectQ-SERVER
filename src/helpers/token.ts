import jwt from 'jsonwebtoken';
import { saveRefreshToken, findRefreshToken, deleteRefreshToken } from '../repositories/refreshTokenRepository';

export const generateAccessToken = (id: number, role: string): string => {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined');
  }
  return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

export const generateRefreshToken = async (id: number, role: string): Promise<string> => {
  if (!process.env.REFRESH_TOKEN_SECRET) {
    throw new Error('REFRESH_TOKEN_SECRET is not defined');
  }
  const token = jwt.sign({ id, role }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
  const expiryDate = new Date();
  expiryDate.setDate(expiryDate.getDate() + 7);
  await saveRefreshToken(token, id, expiryDate);
  return token;
};

export const verifyAccessToken = (token: string): any => {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined');
  }
  return jwt.verify(token, process.env.JWT_SECRET);
};

export const verifyRefreshToken = async (token: string): Promise<any> => {
  if (!process.env.REFRESH_TOKEN_SECRET) {
    throw new Error('REFRESH_TOKEN_SECRET is not defined');
  }
  const refreshToken = await findRefreshToken(token);
  if (!refreshToken) {
    throw new Error('Invalid refresh token');
  }
  return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
};

export const invalidateRefreshToken = async (token: string): Promise<void> => {
  await deleteRefreshToken(token);
};
