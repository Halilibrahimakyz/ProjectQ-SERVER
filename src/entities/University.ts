import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Domain } from './Domain';
import { CommonTableColumns } from './commonTableColumns';

@Entity('universities')
export class University extends CommonTableColumns {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ name: 'alpha_two_code', type: 'char', length: 2 })
  alphaTwoCode: string;

  @Column({ name: 'state_province', type: 'varchar', nullable: true })
  stateProvince: string | null; 

  @Column()
  country: string;

  @OneToMany(() => Domain, domain => domain.university)
  domains: Domain[];
}
