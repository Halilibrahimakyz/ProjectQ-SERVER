import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { createProject,getProjects } from '../repositories/project';
import ErrorResponse from '../helpers/errorResponse';
import { errors } from '../helpers/errors';

interface ProjectData {
  title: string;
  description: string;
  endDate: string;
  starDate:string;
  currentAmount:number;
  projectType:string;
  goalAmount: string;
  photos: string[];
}

export const httpPostCreateProject = async (req: Request, res: Response): Promise<void> => {
  const user = req.user;
  const projectData = req.body as ProjectData;

  console.log("projectData: ", projectData);

  try {
    // Base64 fotoğrafları işleme
    if (projectData.photos && projectData.photos.length > 0) {
      const photoPaths: string[] = projectData.photos.map((photo: string, index: number) => {
        const matches = photo.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
        if (matches) {
          const ext = matches[1].split('/')[1];
          const data = matches[2];
          const buffer = Buffer.from(data, 'base64');
          const fileName = `${uuidv4()}.${ext}`;
          const filePath = path.join(__dirname, `../public/images/${fileName}`);
          
          fs.writeFileSync(filePath, buffer);
          return `/public/images/${fileName}`;
        }
        return null;
      }).filter((photo: string | null): photo is string => photo !== null);

      projectData.photos = photoPaths;
    } else {
      projectData.photos = [];
    }

    const newProject = await createProject(projectData, user);
    res.status(201).json({ newProject });
  } catch (error) {
    ErrorResponse.handleErrorResponse(res, error);
  }
};

export const httpGetProjects = async (req: Request, res: Response): Promise<void> => {
  
  try {
      const cities = await getProjects();
      res.status(200).json({ success: true, data: cities });
  } catch (error) {
      ErrorResponse.handleErrorResponse(res, error);
  }
};
