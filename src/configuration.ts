import { Configuration, App } from '@midwayjs/core';
// import * as info from '@midwayjs/info';
import { join } from 'path';
import { ReportMiddleware } from './middleware/report.middleware';
import * as orm from '@midwayjs/typeorm';
import * as redis from '@midwayjs/redis';
import * as koa from '@midwayjs/koa';
import * as validate from '@midwayjs/validate';
import * as swagger from '@midwayjs/swagger';
import * as i18n from '@midwayjs/i18n';

// 过滤器
import { ValidateErrorFilter } from './filter/validate.filter';
import { CommonErrorFilter } from './common/filter/common.error';

@Configuration({
  imports: [
    koa,
    validate,
    orm,
    i18n,
    redis,
    {
      // component: info,
      component: swagger,
      enabledEnvironment: ['local'],
    },
  ],
  importConfigs: [join(__dirname, './config')],
})
export class MainConfiguration {
  @App('koa')
  app: koa.Application;

  async onReady() {
    // add middleware
    this.app.useMiddleware([ReportMiddleware]);
    this.app.useFilter([ValidateErrorFilter, CommonErrorFilter]);
    // add filter
    // this.app.useFilter([NotFoundFilter, DefaultErrorFilter]);
  }
}
