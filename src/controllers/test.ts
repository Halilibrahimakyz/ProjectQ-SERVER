import { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { AppDataSource } from '../data-source';
import { University } from '../entities/University';
import { Domain } from '../entities/Domain';

dotenv.config();

interface UniversityData {
    name: string;
    domains: string[];
    web_pages: string[];
    country: string;
    alpha_two_code: string;
    'state-province': string | null;
  }
  
  const universitiesFilePath = path.resolve(__dirname, '../..', 'universities.json');
  const universities: UniversityData[] = JSON.parse(fs.readFileSync(universitiesFilePath, 'utf-8'));
  

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
  export const httpCreateUniversityAndDomain = async (req: Request, res: Response): Promise<void> => {
    console.log("İstek geldi");
  
    try {
      // Veritabanı bağlantısının başlatıldığından emin olun
      if (!AppDataSource.isInitialized) {
        await AppDataSource.initialize();
      }
  
      const connection = AppDataSource.manager;
  
      // Veritabanına verileri ekle
      for (const universityData of universities) {
        const university = new University();
        university.name = universityData.name;
        university.alphaTwoCode = universityData.alpha_two_code;
        university.stateProvince = universityData['state-province'] ?? null;
        university.country = universityData.country;
  
        await connection.save(university);
  
        for (const domain of universityData.domains) {
          const domainentities = new Domain();
          domainentities.domain = domain;
          domainentities.university = university;
          await connection.save(domainentities);
        }
      }
  
      console.log('Data inserted successfully');
      res.json({ message: "Data inserted successfully" });
    } catch (error) {
      console.error('Error inserting data', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
