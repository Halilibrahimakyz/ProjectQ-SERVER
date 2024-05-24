import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { CommonTableColumns } from './commonTableColumns';

@Entity('statuses')
export class Status extends CommonTableColumns {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  status: string;

}
