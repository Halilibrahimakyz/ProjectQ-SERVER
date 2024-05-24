import { Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export abstract class CommonTableColumns {
  @Column({ type: 'int', nullable: true, name: 'creator_id' })
  creatorId: number;

  @CreateDateColumn({ type: 'timestamp', nullable: true, name: 'created_date', default: () => 'CURRENT_TIMESTAMP' })
  createdDate: Date;

  @Column({ type: 'int', nullable: true, name: 'modifier_id' })
  modifierId: number;

  @UpdateDateColumn({ type: 'timestamp', nullable: true, name: 'modified_date', default: () => 'CURRENT_TIMESTAMP' })
  modifiedDate: Date;
}
