import { Request, Response } from 'express';
import { findCitiesByCountry,findUniversitiesByCountry  } from '../repositories/info'
import ErrorResponse from '../helpers/errorResponse';
import { errors } from '../helpers/errors';

export const httpGetCities = async (req: Request, res: Response): Promise<void> => {
    const { countryCode } = req.query;

    if (!countryCode) {
        throw new ErrorResponse(errors.INVALID_COUNTRY, 'EN', 'Invalid country');
    }

    try {
        const cities = await findCitiesByCountry(countryCode as string);
        res.status(200).json({ success: true, data: cities });
    } catch (error) {
        ErrorResponse.handleErrorResponse(res, error);
    }
};

export const httpGetUniversities = async (req: Request, res: Response): Promise<void> => {
    const { countryCode } = req.query;
  
    if (!countryCode) {
      return ErrorResponse.handleErrorResponse(res, errors.INVALID_COUNTRY);
    }
  
    try {
      const universities = await findUniversitiesByCountry(countryCode as string);
      res.status(200).json({ success: true, data: universities });
    } catch (error) {
      ErrorResponse.handleErrorResponse(res, error);
    }
  };