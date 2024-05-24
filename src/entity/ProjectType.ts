import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { CommonTableColumns } from './commonTableColumns';

@Entity('project_types')
export class ProjectType extends CommonTableColumns {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  category: string;

}
