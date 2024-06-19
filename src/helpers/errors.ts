import { ErrorDetail } from './errorDetail';

export const errorPriorities = Object.freeze({
  Fatal: 5,
  High: 4,
  Medium: 3,
  Low: 2,
} as const);

type ErrorPriority = typeof errorPriorities[keyof typeof errorPriorities];

export const errors = Object.freeze({
  TEST: {
    code: 1001,
    messageTR: 'TEST',
    messageEN: 'TEST',
    statusCode: 403,
    priority: errorPriorities.Low,
  },
  UN_AUTHORIZED_ACCESS: {
    code: 1002,
    messageTR: 'Yetkisiz erişim',
    messageEN: 'Unauthorized access',
    statusCode: 401,
    priority: errorPriorities.High,
  },
  UN_AUTHORIZED_REFRESH: {
    code: 1003,
    messageTR: 'Yetkisiz erişim',
    messageEN: 'Unauthorized refresh',
    statusCode: 401,
    priority: errorPriorities.High,
  },
  USER_NOT_ACTIVE: {
    code: 1004,
    messageTR: 'Kullanıcı aktif değil',
    messageEN: 'User not active',
    statusCode: 403,
    priority: errorPriorities.Medium,
  },
  USER_ALREADY_EXISTS: {
    code: 1005,
    messageTR: 'Kullanıcı zaten mevcut',
    messageEN: 'User already exists',
    statusCode: 400,
    priority: errorPriorities.Medium,
  },
  SERVER_ERROR: {
    code: 1006,
    messageTR: 'Sunucu hatası',
    messageEN: 'Server error',
    statusCode: 500,
    priority: errorPriorities.Fatal,
  },
  USERNAME_TAKEN: {
    code: 1007,
    messageTR: 'Kullanıcı adı zaten alınmış',
    messageEN: 'Username is already taken',
    statusCode: 400,
    priority: errorPriorities.Medium,
  },
  INVALID_COUNTRY: {
    code: 1008,
    messageTR: 'Geçersiz ülke',
    messageEN: 'Invalid country',
    statusCode: 400,
    priority: errorPriorities.Medium,
  },
  USER_NOT_FOUND: {
    code: 1009,
    messageTR: 'Kullanıcı bulunamadı',
    messageEN: 'User not found',
    statusCode: 404,
    priority: errorPriorities.Medium,
  },
  INCORRECT_PASSWORD: {
    code: 1010,
    messageTR: 'Yanlış şifre',
    messageEN: 'Incorrect password',
    statusCode: 400,
    priority: errorPriorities.Medium,
  }
} as const);

export type ErrorCode = keyof typeof errors;
export type ErrorDetails = typeof errors[ErrorCode];
