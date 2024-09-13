// import {
//   Column,
//   PrimaryGeneratedColumn,
//   CreateDateColumn,
//   UpdateDateColumn,
//   Entity,
// } from 'typeorm';

// @Entity('user')
// export class User {
//   @PrimaryGeneratedColumn() // 主键自增列
//   id: number;
//   @Column({ comment: '姓名' }) // 普通列
//   name: string;
//   @Column({ comment: '年龄' }) // 普通列
//   age: number;

//   @CreateDateColumn({
//     name: 'create_time',
//     comment: '创建日期',
//   })
//   createTime: Date;

//   @UpdateDateColumn({
//     name: 'update_time',
//     comment: '更新日期',
//   })
//   updateTime: Date;
// }

// src/entity/user.ts
import { Column, Entity, PrimaryGeneratedColumn, PrimaryColumn } from 'typeorm';
import { BaseEntity } from '../common/base.entity';

@Entity('user')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @PrimaryColumn({ comment: 'id' })
  id: string;

  @Column({ comment: '姓名' })
  name: string;
  @Column({ comment: '年龄' })
  age: number;
}
