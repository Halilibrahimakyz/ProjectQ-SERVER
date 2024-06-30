import { Request, Response } from 'express';
import { findProjectById, updateProjectAmount } from '../repositories/project';
import ErrorResponse from '../helpers/errorResponse';
import { errors } from '../helpers/errors';

export const httpPostDonate = async (req: Request, res: Response): Promise<Response<any> | void> => {
  const user = req.user;
  const { projectId, amount } = req.body;

  if (!projectId || !amount) {
    return res.status(400).json({ error: 'Project ID and donation amount are required.' });
  }

  try {
    // Find the project by ID
    const project = await findProjectById(projectId);

    if (!project) {
      return res.status(404).json({ error: 'Project not found.' });
    }

    // Update the current amount
    const updatedProject = await updateProjectAmount(project, amount);

    return res.status(200).json({ success: true,message: 'Donation successful.' });
  } catch (error) {
    return ErrorResponse.handleErrorResponse(res, error);
  }
};
