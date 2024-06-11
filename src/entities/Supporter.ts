import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { User } from './User';
import { CommonTableColumns } from './commonTableColumns';

@Entity('supporters')
export class Supporter extends CommonTableColumns {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  occupation: string;

  @Column({ nullable: true })
  company: string;

  @Column({ type: 'boolean', default: false })
  behalfCompany: boolean;

  @Column({ type: 'boolean', default: false })
  wantsAnonymous: boolean;

  @OneToOne(() => User, user => user.supporter)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
