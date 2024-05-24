import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { CommonTableColumns } from './commonTableColumns';

@Entity('users')
export class User extends CommonTableColumns {
  @PrimaryGeneratedColumn()
  userId: number;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 100 })
  surname: string;

  @Column()
  password: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  profilePhoto: string;

  @Column({ length: 50 })
  userType: string;

  @Column({ length: 11, unique: true })
  tcNumber: string;

  @Column()
  phoneNumber: string;

  @Column({ length: 10 })
  gender: string;

  @Column({ length: 50, nullable: true })
  city: string;

  @Column({ nullable: true })
  age: number;

  @Column({ type: 'text', nullable: true })
  bio: string;

  @Column({ nullable: true })
  identificate: string;
}
