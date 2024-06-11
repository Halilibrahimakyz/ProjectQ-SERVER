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
    code: 1002,
    messageTR: 'Yetkisiz erişim',
    messageEN: 'Unauthorized refresh',
    statusCode: 401,
    priority: errorPriorities.High,
  },
  USER_NOT_ACTIVE: {
    code: 1003,
    messageTR: 'Kullanıcı aktif değil',
    messageEN: 'User not active',
    statusCode: 403,
    priority: errorPriorities.Medium,
  },
  USER_ALREADY_EXISTS: {
    code: 1004,
    messageTR: 'Kullanıcı zaten mevcut',
    messageEN: 'User already exists',
    statusCode: 400,
    priority: errorPriorities.Medium,
  },
  SERVER_ERROR: {
    code: 1005,
    messageTR: 'Sunucu hatası',
    messageEN: 'Server error',
    statusCode: 500,
    priority: errorPriorities.Fatal,
  },
} as const);

export type ErrorCode = keyof typeof errors;
export type ErrorDetails = typeof errors[ErrorCode];
