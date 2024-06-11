import { Application } from 'express';
import morganBody from 'morgan-body';

const setupLogging = (app: Application) => {
  if (process.env.NODE_ENV === 'development') {
    morganBody(app, {
      logReqDateTime: true,
      prettify: true,
      maxBodyLength: 1000000,
      timezone: 'Europe/Istanbul',
    });
  }
};

export default setupLogging;
