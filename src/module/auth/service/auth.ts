import { Provide, Inject } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';

import { LoginDTO } from '../dto/login';
import { generateKey } from '../../../utils/index';

import { AuthVO } from '../vo/token';
import { getIp, getAddressByIp, getUserAgent } from '../../../utils/index';
import { LoginLogEntity } from '../../login.log/entity/login.log';
import { Repository } from 'typeorm';
import { UserEntity } from '../../user/entity/user';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { R } from '../../../common/base.error.util';
import * as bcrypt from 'bcryptjs';
import { TokenConfig } from '../../../interface/token.confi';
import { Config } from '@midwayjs/core';
import { RedisService } from '@midwayjs/redis';
import { CaptchaService } from './captcha';

@Provide()
export class AuthService {
  @InjectEntityModel(UserEntity)
  userModel: Repository<UserEntity>;
  @Inject()
  ctx: Context;
  @Config('token')
  tokenConfig: TokenConfig;
  @Inject();
  redisService: RedisService;

  async login(loginDTO: LoginDTO): Promise<AuthVO> {
    const ip = getIp(this.ctx);
    const loginLog = new LoginLogEntity();

    loginLog.ip = ip;
    loginLog.address = getAddressByIp(loginLog.ip);
    loginLog.browser = getUserAgent(this.ctx).family;
    loginLog.os = getUserAgent(this.ctx).os.toString();
    loginLog.userName = loginDTO.accountNumber;

    const { accountNumber } = loginDTO;

    const authUser = await this.userModel
      .createQueryBuilder('user')
      .where('user.phone = :accountNumber', {
        accountNumber,
      })
      .orWhere('user.username = :accountNumber', { accountNumber })
      .orWhere('user.email = :accountNumber', { accountNumber })
      .select(['user.password', 'user.id', 'user.userName'])
      .getOne();

    if (!authUser) {
      throw R.error('账号或密码错误');
    }

    // 如果解析出来的内容不正确
    if (!bcrypt.compareSync(loginDTO.password, authUser.password)) {
      throw R.error('用户名或密码错误！');
    }

    const { expire, refreshExpire } = this.tokenConfig;

    const token = generateKey();
    const refreshToken = generateKey();

    // multi可以实现redis指令并发执行
    await this.redisService
      .multi()
      .set(`token:${token}`, JSON.stringify({ userId: authUser.id, refreshToken }))
      .expire(`token:${token}`, expire)
      .set(`refreshToken:${refreshToken}`, authUser.id)
      .expire(`refreshToken:${refreshToken}`, refreshExpire)
      .sadd(`userToken_${authUser.id}`, token)
      .sadd(`userRefreshToken_${authUser.id}`, refreshToken)
      .exec();


      // const { captcha,captchaId} = loginDTO

      // const result = await this.captchaService
  }
}
