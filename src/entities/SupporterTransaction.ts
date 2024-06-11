import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Supporter } from './Supporter';
import { Project } from './Project';
import { Status } from './Status';
import { CommonTableColumns } from './commonTableColumns';

@Entity('supporter_transactions')
export class SupporterTransaction extends CommonTableColumns {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number;

  @ManyToOne(() => Supporter)
  @JoinColumn({ name: 'supporter_id' })
  supporter: Supporter;

  @ManyToOne(() => Project)
  @JoinColumn({ name: 'project_id' })
  project: Project;

  @ManyToOne(() => Status)
  @JoinColumn({ name: 'status_id' })
  status: Status;

}
