import { AppDataSource } from '../data-source';
import { User } from '../entities/User';

export const findUserByUsername = async (username: string): Promise<User | null> => {
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({ where: { username } });
    return user || null;
  };