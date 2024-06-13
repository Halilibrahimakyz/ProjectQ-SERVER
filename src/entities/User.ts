import { Entity, PrimaryGeneratedColumn, Column, OneToOne, ManyToMany, JoinTable } from 'typeorm';
import { CommonTableColumns } from './commonTableColumns';
import { Student } from './Student';
import { Supporter } from './Supporter';
import { Interest } from './Interest';

@Entity('users')
export class User extends CommonTableColumns {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100, unique: true  })
  username: string;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 100 })
  surname: string;

  @Column()
  password: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  profilePicture: string;

  @Column({ length: 50, unique: true })
  idNumber: string;

  @Column()
  phoneNumber: string;

  @Column({ length: 10 })
  gender: string;

  @Column({ length: 50, nullable: true })
  country: string;

  @Column({ length: 50, nullable: true })
  city: string;

  @Column({ type: 'date', nullable: true })
  birthDate: Date;

  @Column({ type: 'text', nullable: true })
  bio: string;

  @Column({ nullable: true })
  identificate: boolean;

  @Column({ nullable: false })
  isActive: boolean;

  @Column({ length: 20 })
  userType: string;

  @OneToOne(() => Student, student => student.user)
  student: Student;

  @OneToOne(() => Supporter, supporter => supporter.user)
  supporter: Supporter;

  @ManyToMany(() => Interest)
  @JoinTable({
    name: 'user_interests',
    joinColumn: { name: 'userId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'interestId', referencedColumnName: 'id' },
  })
  interests: Interest[];
}
