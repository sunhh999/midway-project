import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity as TEntity,
} from 'typeorm';

export class BaseEntity extends TEntity {
  @PrimaryGeneratedColumn()
  id?: string;

  @CreateDateColumn({
    name: 'create_time',
    comment: '创建日期',
  })
  create_time: Date;

  @UpdateDateColumn({
    name: 'update_time',
    comment: '更新日期',
  })
  updateTime: Date;
}
