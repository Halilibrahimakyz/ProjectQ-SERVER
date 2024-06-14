import { AppDataSource } from '../data-source';
import { City } from '../entities/City';
import { University } from '../entities/University';

export const findCitiesByCountry = async (countryCode: string) => {
    const cityRepository = AppDataSource.getRepository(City);
  
    const cities = await cityRepository
      .createQueryBuilder('city')
      .innerJoinAndSelect('city.country', 'country')
      .where('country.countryCode = :countryCode', { countryCode })
      .orderBy('city.name', 'ASC')
      .getMany();
  
    return cities.map(city => ({
      label: city.name,
      value: city.id.toString()
    }));
  };



export const findUniversitiesByCountry = async (countryCode: string) => {
  const universityRepository =  AppDataSource.getRepository(University);
  const universities = await universityRepository
    .createQueryBuilder('university')
    .innerJoinAndSelect('university.country', 'country')
    .where('country.countryCode = :countryCode', { countryCode })
    .orderBy('university.name', 'ASC')
    .getMany();

    return universities.map(university => ({
        label: university.name,
        value: university.id.toString()
      }));
};