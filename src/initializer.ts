import 'reflect-metadata';
import { AppDataSource } from './data-source';
import { DataService } from './services/dataService';

AppDataSource.initialize().then(async () => {
    console.log('Data source initialized successfully.');
    const dataService = new DataService();
    await dataService.importData();
    console.log('Data imported successfully');
}).catch(error => console.log(error));