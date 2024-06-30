import express, { Application } from 'express';
import path from 'path';
import config from '../config';

const setupExpress = async (app: Application): Promise<void> => {
  const { PUBLIC_FOLDER } = config.env;

  if (!PUBLIC_FOLDER) {
    throw new Error('PUBLIC_FOLDER is not defined in environment variables.');
  }
  console.log("PUBLIC_FOLDER: ",PUBLIC_FOLDER)

  // app.use(bodyParser.json());
    // app.use(bodyParser.urlencoded({ extended: false }));
  app.use(express.json({ limit: '50MB' }));
  app.use(`/public`, express.static(path.resolve(__dirname, '..', PUBLIC_FOLDER))); // Ensure the correct path
};

export default setupExpress;