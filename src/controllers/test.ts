import { Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

export const httpTest = (req: Request, res: Response): void => {
    console.log("istek geldi");
    res.send("Hello World");
};
