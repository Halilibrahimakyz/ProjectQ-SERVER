import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { City } from './City';
import { University } from './University';

@Entity('countries')
export class Country {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    countryCode: string;

    @Column()
    phoneCode: string;

    @Column()
    name_tr: string;

    @Column()
    name_eng: string;

    @OneToMany(() => City, city => city.country)
    cities: City[];

    @OneToMany(() => University, university => university.country)
    universities: University[];
}
