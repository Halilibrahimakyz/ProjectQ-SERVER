import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Country } from './Country';

@Entity('cities')
export class City {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({  nullable: true })
    latitude?: string;

    @Column({  nullable: true })
    longitude?: string;

    @ManyToOne(() => Country, country => country.cities)
    country: Country;
}
