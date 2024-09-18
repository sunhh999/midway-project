import { Provide } from '@midwayjs/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService } from '../../../common/base.service';
import { UserEntity } from '../entity/user';
import { R } from '../../../common/base.error.util';
import { UserVO } from '../vo/user';
import * as bcrypt from 'bcryptjs';
import { omit } from 'lodash';

// 实际业务

@Provide('/user')
export class UserService extends BaseService<UserEntity> {
  @InjectEntityModel(UserEntity)
  userModel: Repository<UserEntity>;

  getModel(): Repository<UserEntity> {
    return this.userModel;
  }

  // 密码加盐; 大部分系统都是用这种方案存储密码
  async create(entity: UserEntity): Promise<UserVO> {
    const { userName, phoneNumber, email } = entity;

    let isExist = (await this.userModel.countBy({ userName })) > 0;

    if (isExist) {
      throw R.error('当前用户名已存在');
    }

    isExist = (await this.userModel.countBy({ phoneNumber })) > 0;

    if (isExist) {
      throw R.error('当前手机号已存在');
    }

    isExist = (await this.userModel.countBy({ email })) > 0;

    if (isExist) {
      throw R.error('当前邮箱已存在');
    }

    // 添加用户的默认密码是123456,对密码进行严加密
    const PASSWORD = bcrypt.hashSync('123456', 10);

    entity.password = PASSWORD;

    await this.userModel.save(entity);

    return omit(entity, ['password']) as UserVO;
  }

  async edit(entity: UserEntity): Promise<void | UserVO> {
    const { userName, phoneNumber, email, id } = entity;

    // findOneBy 返回的是对象
    // findBy 返回的是数组
    let user = await this.userModel.findOneBy({ userName });
    const USER_ID_FLAG = user && user.id !== id;

    if (USER_ID_FLAG) {
      throw R.error('当前用户名已存在');
    }

    user = await this.userModel.findOneBy({ phoneNumber });

    if (USER_ID_FLAG) {
      throw R.error('当前手机号已存在');
    }

    user = await this.userModel.findOneBy({ email });

    if (USER_ID_FLAG) {
      throw R.error('当前邮箱已存在');
    }

    await this.userModel.save(entity);
    return omit(entity, ['password']) as UserVO;
  }
}
