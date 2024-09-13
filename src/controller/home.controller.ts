// import { Controller, Get } from '@midwayjs/core';
// import { InjectEntityModel } from '@midwayjs/typeorm';
// import { User } from '../entity/user';
// import { Repository } from 'typeorm';
// @Controller('/')
// export class HomeController {
//   // 自动注入模型
//   @InjectEntityModel(User)
//   userModel: Repository<User>;

//   // 自动注入 redis 服务

//   @Get('/')
//   async home(): Promise<User[]> {
//     // 设置值

//     // 查询user表数据
//     return await this.userModel.find();
//   }
// }

// import { Controller, Get, Inject } from '@midwayjs/core';
// import { RedisService } from '@midwayjs/redis';

// @Controller('/')
// export class HomeController {
//   // 自动注入 redis 服务
//   @Inject()
//   redisService: RedisService;

//   @Get('/')
//   async home(): Promise<string> {
//     // 设置值
//     await this, this.redisService.set('foo', 'bar');

//     // 查询user表数据
//     return await this.redisService.get('foo');
//   }
// }

// import { Controller, Get, Inject } from '@midwayjs/core';
// import { MidwayI18nService } from '@midwayjs/i18n';
// @Controller('/')
// export class HomeController {
//   // 自动注入 i18n 服务
//   @Inject()
//   i18nService: MidwayI18nService;

//   @Get('/')
//   async home(): Promise<string> {
//     return this.i18nService.translate('hello', {
//       locale: 'zh_CN',
//     });
//   }
// }

// import { Body, Controller, Post } from '@midwayjs/core';
// import { UserDTO } from '../dto/user';

// @Controller('/')
// export class HomeController {
//   @Post('/')
//   async home(@Body() user: UserDTO): Promise<void> {
//     console.log(user);
//   }
// }

// import { Controller, Inject, Post } from '@midwayjs/core';
// import { ILogger } from '@midwayjs/core';
// import { CommonError } from '../common/common.error';

// @Controller('/')
// export class HomeController {
//   @Inject()
//   logger: ILogger;

//   @Post('/')
//   async home(): Promise<void> {
//     throw new CommonError('error');
//   }
// }

// import { Body, Controller, Inject, Post } from '@midwayjs/core';
// import { UserDTO } from '../dto/user';
// import { ILogger } from '@midwayjs/logger';

// @Controller('/')
// export class HomeController {
//   @Inject()
//   logger: ILogger;

//   @Post('/')
//   async home(@Body() user: UserDTO): Promise<void> {
//     this.logger.info('hello');
//     console.log(user);
//   }
// }
import { Controller, ILogger, Inject, Post } from '@midwayjs/core';
import { R } from '../common/base.error.util';

@Controller('/')
export class HomeController {
  @Inject()
  logger: ILogger;

  @Post('/')
  async home(): Promise<void> {
    throw R.error('error');
  }
}
