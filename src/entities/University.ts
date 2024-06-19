import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Country } from './Country';
import { Domain } from './Domain';
import { Student } from './Student';

@Entity('universities')
export class University {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToOne(() => Country, country => country.universities)
    country: Country;

    @OneToMany(() => Domain, domain => domain.university)
    domains: Domain[];

    @OneToMany(() => Student, student => student.school)
    students: Student[];
}
