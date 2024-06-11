import { AppDataSource } from '../data-source';
import { RefreshToken } from '../entities/RefreshToken';

export const saveRefreshToken = async (token: string, userId: number, expiryDate: Date): Promise<void> => {
  const refreshTokenRepository = AppDataSource.getRepository(RefreshToken);
  const refreshToken = refreshTokenRepository.create({ token, userId, expiryDate });
  await refreshTokenRepository.save(refreshToken);
};

export const findRefreshToken = async (token: string): Promise<RefreshToken | undefined> => {
  const refreshTokenRepository = AppDataSource.getRepository(RefreshToken);
  const refreshToken = await refreshTokenRepository.findOne({ where: { token } });
  return refreshToken || undefined;
};

export const deleteRefreshToken = async (token: string): Promise<void> => {
  const refreshTokenRepository = AppDataSource.getRepository(RefreshToken);
  await refreshTokenRepository.delete({ token });
};
