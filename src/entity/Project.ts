import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Student } from './Student';
import { ProjectType } from './ProjectType'; 
import { CommonTableColumns } from './commonTableColumns';

@Entity('projects')
export class Project extends CommonTableColumns {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'date', nullable: true })
  startDate: Date;

  @Column({ type: 'date', nullable: true })
  endDate: Date;

  @Column({ type: 'float' })
  goalAmount: number;

  @Column({ type: 'float', nullable: true })
  currentAmount: number;

  @ManyToOne(() => Student)
  @JoinColumn({ name: 'student_id' })
  student: Student;

  @ManyToOne(() => ProjectType)
  @JoinColumn({ name: 'project_types_id' })
  projectType: ProjectType;

}
