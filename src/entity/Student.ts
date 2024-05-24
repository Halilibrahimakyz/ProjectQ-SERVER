import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { User } from './User';
import { CommonTableColumns } from './commonTableColumns';

@Entity('students')
export class Student extends CommonTableColumns {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  school: string;

  @Column({ nullable: true })
  class: string;

  @Column({ type: 'float', nullable: true })
  gpa: number;

  @Column({ type: 'boolean', nullable: true })
  verification: boolean;

  @Column({ type: 'text', nullable: true })
  goals: string;

  @OneToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

}
