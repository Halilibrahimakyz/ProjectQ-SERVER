import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Student } from './Student';
import { Project } from './Project';
import { Status } from './Status';
import { CommonTableColumns } from './commonTableColumns';

@Entity('student_transactions')
export class StudentTransaction extends CommonTableColumns {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number;

  @ManyToOne(() => Student)
  @JoinColumn({ name: 'student_id' })
  student: Student;

  @ManyToOne(() => Project)
  @JoinColumn({ name: 'project_id' })
  project: Project;

  @ManyToOne(() => Status)
  @JoinColumn({ name: 'status_id' })
  status: Status;

}
