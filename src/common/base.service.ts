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

  order: Record<string, string> | any = { create_time: 'desc' };

  // 抽象方法
  abstract getModel(): Repository<T>;

  async create(entity: T): Promise<any> {
    return await this.getModel().save(entity);
  }

  async edit(entity: T): Promise<T | void | any> {
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

  // 增加默认值
  async page(page = 0, pageSize = 10, where?: FindOptionsWhere<T>) {
    const [data, total] = await this.getModel().findAndCount({
      where,
      order: this.order,
      skip: page - 1, // 初始化查询 需要减1 数据内容 从索引0开始的
      take: pageSize,
    });

    return { data, total };
  }

  async list(where?: FindOptionsWhere<T>) {
    console.log('this.getModel() :>> ', this.getModel());
    const data = await this.getModel().find({
      where,
      order: this.order,
    });

    return data;
  }
}
