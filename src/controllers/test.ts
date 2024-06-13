import { Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();


export const httpTest = async (req: Request, res: Response): Promise<void> => {
    console.log("httpTest: İstek geldi");
  
    // console.log("Request: ",req)
    res.send("hello world");
    
  };

  export const httpTestRefreshToken = async (req: Request, res: Response): Promise<void> => {
    console.log("httpTestRefreshToken: İstek geldi");
  
    // console.log("Request: ",req)
    res.send("hello world");
    
  };
