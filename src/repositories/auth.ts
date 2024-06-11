import { AppDataSource } from '../data-source';
import { User } from '../entities/User';
import { Student } from '../entities/Student';
import { Supporter } from '../entities/Supporter';

export const findUserByEmail = async (email: string): Promise<User | undefined> => {
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({ where: { email }, relations: ['student', 'supporter'] });
    return user || undefined;
};

export const createUser = async (userData: Partial<User>): Promise<User> => {
    const userRepository = AppDataSource.getRepository(User);
    const user = userRepository.create(userData);
    return await userRepository.save(user);
};

export const createStudent = async (studentData: Partial<Student>): Promise<Student> => {
    const studentRepository = AppDataSource.getRepository(Student);
    const student = studentRepository.create(studentData);
    return await studentRepository.save(student);
};

export const createSupporter = async (supporterData: Partial<Supporter>): Promise<Supporter> => {
    const supporterRepository = AppDataSource.getRepository(Supporter);
    const supporter = supporterRepository.create(supporterData);
    return await supporterRepository.save(supporter);
};