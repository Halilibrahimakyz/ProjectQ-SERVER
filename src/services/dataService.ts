import { AppDataSource } from '../data-source';
import { Country } from '../entities/Country';
import { City } from '../entities/City';
import { University } from '../entities/University';
import { Domain } from '../entities/Domain';
import countriesData from './countries.json';
import citiesData from './cities.json';
import universities from './universities.json';
import ProgressBar from 'progress';

export class DataService {
    async importData() {
        const countryRepository = AppDataSource.getRepository(Country);
        const cityRepository = AppDataSource.getRepository(City);
        const universityRepository = AppDataSource.getRepository(University);
        const domainRepository = AppDataSource.getRepository(Domain);

        console.log('Starting import of countries...');
        let bar = new ProgressBar('Importing countries [:bar] :percent :etas', { total: countriesData.length });
        for (const countryData of countriesData) {
            const country = countryRepository.create({
                countryCode: countryData.country_code,
                phoneCode: countryData.phone_code,
                name_tr: countryData.translations.tr,
                name_eng: countryData.name
            });
            await countryRepository.save(country);
            bar.tick();
        }

        console.log('Countries imported successfully.');

        console.log('Starting import of cities...');
        bar = new ProgressBar('Importing cities [:bar] :percent :etas', { total: citiesData.length });
        for (const cityData of citiesData) {
            const country = await countryRepository.findOne({ where: { countryCode: cityData.country_code } });
            if (country) {
                // Explicitly type the city data to match the City entity
                const city: Partial<City> = {
                    name: cityData.name || '',
                    latitude: cityData.latitude ? cityData.latitude : undefined,
                    longitude: cityData.longitude ? cityData.longitude : undefined,
                    country: country
                };
                await cityRepository.save(cityRepository.create(city));
                
            }
            bar.tick();
        }

        console.log('Cities imported successfully.');

        console.log('Starting import of universities and domains...');
        bar = new ProgressBar('Importing universities and domains [:bar] :percent :etas', { total: universities.length });
        for (const universityData of universities) {
            const country = await countryRepository.findOne({ where: { countryCode: universityData.country_code } });
            if (country) {
                const university = universityRepository.create({
                    name: universityData.name,
                    country: country
                });
                await universityRepository.save(university);

                for (const domain of universityData.domains) {
                    const domainEntity = domainRepository.create({
                        domain: domain,
                        university: university
                    });
                    await domainRepository.save(domainEntity);
                }
            }
            bar.tick();
        }
        console.log('Universities and domains imported successfully.');
    }
}
