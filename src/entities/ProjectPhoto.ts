import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Project } from './Project';

@Entity('project_photos')
export class ProjectPhoto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;

  @ManyToOne(() => Project, project => project.photos)
  @JoinColumn({ name: 'project_id' })
  project: Project;
}
