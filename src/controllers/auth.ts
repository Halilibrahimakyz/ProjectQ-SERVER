import { Request, Response } from 'express';
import { findUserByEmail, createUser, createStudent, createSupporter } from '../repositories/auth';
import ErrorResponse from '../helpers/errorResponse';
import { errors } from '../helpers/errors';
import { hashPassword, comparePassword } from '../helpers/hash';
import { generateAccessToken, generateRefreshToken, verifyRefreshToken, invalidateRefreshToken } from '../helpers/token';

export const httpLoginStudent = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    const user = await findUserByEmail(email);

    if (!user || user.userType !== 'student' || !(await comparePassword(password, user.password))) {
      throw new ErrorResponse(errors.UN_AUTHORIZED_ACCESS, 'EN', 'Invalid credentials');
    }

    const accessToken = generateAccessToken(user.id, user.userType);
    const refreshToken = await generateRefreshToken(user.id, user.userType);

    res.status(200).json({ 
      success: true, 
      message: 'Login successful', 
      data: { accessToken, refreshToken, user: { ...user, student: user.student } } 
    });
  } catch (error) {
    ErrorResponse.handleErrorResponse(res, error);
  }
};

export const httpLoginSupporter = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    const user = await findUserByEmail(email);

    if (!user || user.userType !== 'supporter' || !(await comparePassword(password, user.password))) {
      throw new ErrorResponse(errors.UN_AUTHORIZED_ACCESS, 'EN', 'Invalid credentials');
    }

    const accessToken = generateAccessToken(user.id, user.userType);
    const refreshToken = await generateRefreshToken(user.id, user.userType);

    res.status(200).json({ 
      success: true, 
      message: 'Login successful', 
      data: { accessToken, refreshToken, user: { ...user, supporter: user.supporter } } 
    });
  } catch (error) {
    ErrorResponse.handleErrorResponse(res, error);
  }
};

export const httpSignUpStudent = async (req: Request, res: Response): Promise<void> => {
  console.log("istek geldi",req.body)
  const { email, password, username, profilePicture, name, surname, idNumber, phoneNumber, gender, school, studentClass, country, city, department, gpa, goals, interests, birthDate, creatorId, modifierId } = req.body;
  try {
    const existingUser = await findUserByEmail(email);

    if (existingUser) {
      throw new ErrorResponse(errors.USER_ALREADY_EXISTS, 'EN', 'User already exists');
    }

    const hashedPassword = await hashPassword(password);
    const user = await createUser({
      email,
      password: hashedPassword,
      username,
      name,
      surname,
      userType: 'student',
      idNumber,
      phoneNumber,
      gender,
      country,
      profilePicture,
      city,
      interests,
      isActive: true,
      creatorId,
      modifierId,
    });

    const student = await createStudent({
      user,
      school,
      class: studentClass,
      gpa,
      goals,
      department,
      creatorId,
      modifierId,
    });

    const accessToken = generateAccessToken(user.id, user.userType);
    const refreshToken = await generateRefreshToken(user.id, user.userType);

    res.status(201).json({ 
      success: true, 
      message: 'User registered successfully', 
      data: { user, student, accessToken, refreshToken } 
    });
  } catch (error) {
    ErrorResponse.handleErrorResponse(res, error);
  }
};

export const httpSignUpSupporter = async (req: Request, res: Response): Promise<void> => {
  const { email, password, name, surname, idNumber, phoneNumber, gender, occupation, company, behalfCompany, wantsAnonymous, creatorId, modifierId } = req.body;

  try {
    const existingUser = await findUserByEmail(email);

    if (existingUser) {
      throw new ErrorResponse(errors.USER_ALREADY_EXISTS, 'EN', 'User already exists');
    }

    const hashedPassword = await hashPassword(password);
    const user = await createUser({
      email,
      password: hashedPassword,
      name,
      surname,
      userType: 'supporter',
      idNumber,
      phoneNumber,
      gender,
      isActive: true,
      creatorId,
      modifierId,
    });

    const supporter = await createSupporter({
      user,
      occupation,
      company,
      behalfCompany,
      wantsAnonymous,
      creatorId,
      modifierId,
    });

    const accessToken = generateAccessToken(user.id, user.userType);
    const refreshToken = await generateRefreshToken(user.id, user.userType);

    res.status(201).json({ 
      success: true, 
      message: 'User registered successfully', 
      data: { user, supporter, accessToken, refreshToken } 
    });
  } catch (error) {
    ErrorResponse.handleErrorResponse(res, error);
  }
};

export const httpRefreshToken = async (req: Request, res: Response): Promise<void> => {
  const { refreshToken } = req.body;

  try {
    if (!refreshToken) {
      throw new ErrorResponse(errors.UN_AUTHORIZED_ACCESS, 'EN', 'No refresh token provided');
    }

    const decoded = await verifyRefreshToken(refreshToken);
    const accessToken = generateAccessToken(decoded.id, decoded.role);

    res.status(200).json({ 
      success: true, 
      message: 'Token refreshed successfully', 
      data: { accessToken } 
    });
  } catch (error) {
    ErrorResponse.handleErrorResponse(res, error);
  }
};

export const httpLogout = async (req: Request, res: Response): Promise<void> => {
  const { refreshToken } = req.body;

  try {
    if (!refreshToken) {
      throw new ErrorResponse(errors.UN_AUTHORIZED_ACCESS, 'EN', 'No refresh token provided');
    }

    await invalidateRefreshToken(refreshToken);
    res.status(200).json({ 
      success: true, 
      message: 'Logged out successfully' 
    });
  } catch (error) {
    ErrorResponse.handleErrorResponse(res, error);
  }
};
