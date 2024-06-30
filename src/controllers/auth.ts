import { Request, Response } from 'express';
import { findUserByEmail,findUserByEmailOrUsername, createUser, createStudent, createSupporter,addInterestsToUser } from '../repositories/auth';
import ErrorResponse from '../helpers/errorResponse';
import { errors } from '../helpers/errors';
import { hashPassword, comparePassword } from '../helpers/hash';
import { generateAccessToken, generateRefreshToken, verifyRefreshToken, invalidateRefreshToken } from '../helpers/token';

export const httpLoginStudent = async (req: Request, res: Response): Promise<void> => {
  const { emailOrUsername, password } = req.body;
  const clientLanguage = req.headers['accept-language']?.toUpperCase() === 'TR' ? 'TR' : 'EN';
  console.log("clientLanguage: ",req.headers['accept-language'])

  try {
    const user = await findUserByEmailOrUsername(emailOrUsername);

    if (!user) {
      throw new ErrorResponse(errors.USER_NOT_FOUND, clientLanguage);
    }


    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      throw new ErrorResponse(errors.INCORRECT_PASSWORD, clientLanguage);
    }

    const accessToken = generateAccessToken(user.id, user.userType);
    const refreshToken = await generateRefreshToken(user.id, user.userType);

    res.status(200).json({
      success: true,
      message: 'Login successful',
      accessToken,
      refreshToken,
     user: { ...user, student: user.student } 
    });
  } catch (error) {
    ErrorResponse.handleErrorResponse(res, error);
  }
};

export const httpLogin = async (req: Request, res: Response): Promise<void> => {
  const { emailOrUsername, password } = req.body;
  const clientLanguage = req.headers['accept-language']?.toUpperCase() === 'TR' ? 'TR' : 'EN';
  console.log("clientLanguage: ",req.headers['accept-language'])

  try {
    const user = await findUserByEmailOrUsername(emailOrUsername);

    if (!user) {
      throw new ErrorResponse(errors.USER_NOT_FOUND, clientLanguage);
    }


    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      throw new ErrorResponse(errors.INCORRECT_PASSWORD, clientLanguage);
    }

    const accessToken = generateAccessToken(user.id, user.userType);
    const refreshToken = await generateRefreshToken(user.id, user.userType);

    let userInfo = { ...user };
    if (user.userType === 'student') {
      userInfo = { ...userInfo, student: user.student };
    } else {
      userInfo = { ...userInfo, supporter: user.supporter };
    }

    res.status(200).json({
      success: true,
      message: 'Login successful',
      accessToken,
      refreshToken,
      user: userInfo
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
  console.log("Request received with body:", req.body);
  
  const {
    username,
    name,
    surname,
    password,
    email,
    profilePicture,
    idNumber,
    phoneNumber,
    gender,
    country,
    city,
    birthDate,
    bio,
    identificate,
    isActive,
    userType,
    interests,
    school,
    studentClass,
    department,
    gpa,
    verification,
    goals,
    creatorId,
    modifierId
  } = req.body;
  
  try {
    console.log("Checking if user already exists with email:", email);
    const existingUserByEmail = await findUserByEmail(email);
    
    if (existingUserByEmail) {
      console.log("User already exists with email:", existingUserByEmail);
      throw new ErrorResponse(errors.USER_ALREADY_EXISTS, 'EN', 'User already exists with this email');
    }

    console.log("Hashing password for user:", username);
    const hashedPassword = await hashPassword(password);
    
    // console.log("Creating user with details:", {
    //   email,
    //   username,
    //   name,
    //   surname,
    //   idNumber,
    //   phoneNumber,
    //   gender,
    //   country,
    //   profilePicture,
    //   city,
    //   birthDate,
    //   bio,
    //   identificate,
    //   isActive: true,
    //   userType,
    //   creatorId,
    //   modifierId
    // });

    let user = await createUser({
      email,
      password: hashedPassword,
      username,
      name,
      surname,
      idNumber,
      phoneNumber,
      gender,
      country,
      profilePicture,
      city,
      birthDate,
      bio,
      identificate,
      isActive: true,
      userType,
      creatorId,
      modifierId
    });

    console.log("Adding interests to user:", interests);
    user = await addInterestsToUser(user, interests);

    console.log("Creating student profile for user:", user.id);
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

    console.log("Generating access and refresh tokens for user:", user.id);
    const accessToken = generateAccessToken(user.id, user.userType);
    const refreshToken = await generateRefreshToken(user.id, user.userType);
    const userdata = await findUserByEmailOrUsername(user.email);
    
    console.log("User registered successfully:", user.id);

    res.status(200).json({
      success: true,
      message: 'User registered successfully',
      accessToken,
      refreshToken,
     user: { ...userdata, student: userdata?.student } 
    });
  } catch (error) {
    console.log("Error occurred during user registration:", error);
    ErrorResponse.handleErrorResponse(res, error);
  }
};


export const httpSignUpSupporter = async (req: Request, res: Response): Promise<void> => {
  

  const {
    username,
    name,
    surname,
    password,
    email,
    profilePicture,
    idNumber,
    phoneNumber,
    gender,
    country,
    city,
    birthDate,
    bio,
    identificate,
    isActive,
    userType,
    interests,
    occupation,
    company,
    behalfCompany,
    wantsAnonymous,
    creatorId,
    modifierId
  } = req.body;
 
  
  try {
    console.log("Checking if user already exists with email:", email);
    const existingUserByEmail = await findUserByEmail(email);
    
    if (existingUserByEmail) {
      console.log("User already exists with email:", existingUserByEmail);
      throw new ErrorResponse(errors.USER_ALREADY_EXISTS, 'EN', 'User already exists with this email');
    }

    console.log("Hashing password for user:", username);
    const hashedPassword = await hashPassword(password);

      console.log("Creating user with details:", {
      email,
      username,
      name,
      surname,
      idNumber,
      phoneNumber,
      gender,
      country,
      profilePicture,
      city,
      birthDate,
      bio,
      identificate,
      isActive: true,
      userType,
      creatorId,
      modifierId
    });

    let user = await createUser({
      email,
      password: hashedPassword,
      username,
      name,
      surname,
      idNumber,
      phoneNumber,
      gender,
      country,
      profilePicture,
      city,
      birthDate,
      bio,
      identificate,
      isActive: true,
      userType,
      creatorId,
      modifierId:1
    });

    console.log("Adding interests to user:", interests);
    user = await addInterestsToUser(user, interests);

    console.log("Creating supporter profile for user:", user.id);
    const supporter = await createSupporter({
      user,
      occupation,
      company,
      behalfCompany: behalfCompany == 'yes' ? true : false,
      wantsAnonymous:wantsAnonymous == 'yes' ? true : false,
      creatorId,
      modifierId,
    });

    const accessToken = generateAccessToken(user.id, user.userType);
    const refreshToken = await generateRefreshToken(user.id, user.userType);
    const userdata = await findUserByEmailOrUsername(user.email);
    
    console.log("User registered successfully:", user.id);

    res.status(200).json({
      success: true,
      message: 'User registered successfully',
      accessToken,
      refreshToken,
     user: { ...userdata, supporter: userdata?.supporter } 
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
      accessToken
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
