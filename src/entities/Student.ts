import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne } from 'typeorm';
import { User } from './User';
import { CommonTableColumns } from './commonTableColumns';
import { University } from './University';

@Entity('students')
export class Student extends CommonTableColumns {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => University, university => university.students, { nullable: true })
  @JoinColumn({ name: 'university_id' })
  school: University;

  @Column({ nullable: true })
  class: string;

  @Column({ nullable: true })
  department: string;

  @Column({ type: 'float', nullable: true })
  gpa: number;

  @Column({ type: 'boolean', nullable: true })
  verification: boolean;

  @Column({ type: 'text', nullable: true })
  goals: string;

  @OneToOne(() => User, user => user.student)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
