import { Inject } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import {
  type BaseEntity as TEntity,
  FindOptionsWhere,
  Repository,
} from 'typeorm';

// abstract 抽象类
export abstract class BaseService<T extends TEntity> {
  @Inject()
  ctx: Context;

  order: Record<string, string> | any = { create_date: 'desc' };

  // 抽象方法
  abstract getModel(): Repository<T>;

  async create(entity: T) {
    return await this.getModel().save(entity);
  }

  async edit(entity: T): Promise<T | void> {
    return await this.getModel().save(entity);
  }

  async remove(entity: T) {
    await this.getModel().save(entity);
  }

  async getById(id: string): Promise<T> {
    return this.getModel()
      .createQueryBuilder('model')
      .where('model.id = :id', { id })
      .getOne();
  }

  async page(page: number, pageSize: number, where?: FindOptionsWhere<T>) {
    const [data, total] = await this.getModel().findAndCount({
      order: this.order,
      skip: page * pageSize,
      take: pageSize,
      where,
    });

    return { data, total };
  }

  async list(where?: FindOptionsWhere<T>) {
    const data = await this.getModel().find({
      where,
      order: this.order,
    });

    return data;
  }
}
