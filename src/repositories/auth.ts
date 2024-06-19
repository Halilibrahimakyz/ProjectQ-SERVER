import { AppDataSource } from '../data-source';
import { User } from '../entities/User';
import { Student } from '../entities/Student';
import { Supporter } from '../entities/Supporter';
import { Interest } from '../entities/Interest';
import { University } from '../entities/University';
import { Country } from '../entities/Country'

export const findUserByEmail = async (email: string): Promise<User | undefined> => {
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({ where: { email }, relations: ['student', 'supporter'] });
    return user || undefined;
};

export const findUserByEmailOrUsername = async (emailOrUsername: string): Promise<User | undefined> => {
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({
        where: [
            { email: emailOrUsername },
            { username: emailOrUsername }
        ],
        relations: [
            'student',
            'student.school',
            'student.school.country',
            'supporter',
            'interests',
            'city'
        ]
    });
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

export const addInterestsToUser = async (user: User, interestNames: string[]): Promise<User> => {
    console.log("Adding interests to user with ID:", user.id);
    const interestRepository = AppDataSource.getRepository(Interest);
  
    const interests = await Promise.all(interestNames.map(async (interestName: string) => {
      console.log("Processing interest:", interestName);
      let interest = await interestRepository.findOne({ where: { name: interestName } });
  
      if (!interest) {
        console.log("Interest not found, creating new one:", interestName);
        interest = interestRepository.create({ name: interestName });
        await interestRepository.save(interest);
        console.log("New interest created:", interest);
      } else {
        console.log("Interest found:", interest);
      }
      return interest;
    }));
  
    // Update the user's interests relation without saving the user entity again
    user.interests = interests;
    console.log("User interests updated:", interests);
  
    // Use query builder to insert user interests without updating the user entity
    await AppDataSource.createQueryBuilder()
      .relation(User, "interests")
      .of(user)
      .add(interests);
  
    console.log("User interests relation updated in user_interests table");
  
    return user;
  };
  