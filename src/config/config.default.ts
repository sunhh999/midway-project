import { MidwayConfig } from '@midwayjs/core';
import * as redisStore from 'cache-manager-ioredis';
import { env } from 'process';
export default {
  // use for cookie sign key, should change to your own and keep security
  keys: '1724813844573_2370',
  koa: {
    // 路由前缀
    globalPrefix: '/midway',
    port: 7001,
  },
  typeorm: {
    dataSource: {
      default: {
        /**
         * 单数据库实例
         */
        type: 'mysql',
        host: 'localhost', // 数据库ip地址，本地就写localhost
        port: 3306,
        username: 'root',
        password: 'admin123',
        database: 'midway_mysql', // 数据库名称
        synchronize: true, // 如果第一次使用，不存在表，有同步的需求可以写 true，注意会丢数据
        logging: true,
        // 扫描entity文件夹
        entities: ['**/entity/*{.ts,.js}'],
      },
    },
  },
  redis: {
    client: {
      port: 6379,
      host: 'localhost',
      password: 'admin123',
      db: 0,
    },
  },
  i18n: {
    localeTable: {
      en_US: require('../locales/en_US.json'),
      zh_CN: require('../locales/zh_CN.json'),
    },
  },

  cache: {
    store: redisStore,
    options: {
      host: env.REDIS_HOST || 'localhost', // default value
      port: 6379, // default value
      password: env.REDIS_PASSWORD || '',
      db: 0,
      keyPrefix: 'cache:',
      ttl: 100,
    },
  },
} as MidwayConfig;
