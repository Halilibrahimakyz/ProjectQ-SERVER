import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { University } from './University';

@Entity('domains')
export class Domain {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    domain: string;

    @ManyToOne(() => University, university => university.domains)
    university: University;
}
