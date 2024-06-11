import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { University } from './University';
import { CommonTableColumns } from './commonTableColumns';

@Entity('domains')
export class Domain extends CommonTableColumns {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  domain: string;

  @ManyToOne(() => University, university => university.domains)
  @JoinColumn({ name: 'university_id' })
  university: University;
}
