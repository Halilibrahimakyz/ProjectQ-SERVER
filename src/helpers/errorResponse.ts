import { Response } from 'express';
import { ErrorDetail } from './errorDetail';
import { errors } from './errors';

class ErrorResponse extends Error {
  statusCode: number;
  priority: number;
  code: number;

  constructor(error: ErrorDetail, language: 'EN' | 'TR' = 'EN', customMessage?: string) {
    const message = (language === 'TR' ? error.messageTR : error.messageEN) + ' ' + (customMessage || '');
    super(message);
    
    this.statusCode = error.statusCode;
    this.priority = error.priority;
    this.code = error.code || 0;

    Object.setPrototypeOf(this, ErrorResponse.prototype);
    Error.captureStackTrace(this, this.constructor);
  }

  toJSON() {
    const alt: { [key: string]: any } = {};
    Object.getOwnPropertyNames(this).forEach((key) => {
      alt[key] = (this as any)[key];
    });
    return alt;
  }

  static handleErrorResponse(res: Response, error: any,language: 'EN' | 'TR' = 'EN') {
    if (error instanceof ErrorResponse) {
      res.status(error.statusCode).json({ success: false, message: error.message, error: error.toJSON() });
    } else {
      console.error("Unhandled error: ", error);
      const serverError = errors.SERVER_ERROR;
      const message = language === 'TR' ? serverError.messageTR : serverError.messageEN;
      res.status(500).json({ success: false, error: errors.SERVER_ERROR });
    }
  }
}

export default ErrorResponse;
