import { Config, Inject, Provide, ScopeEnum, Scope } from '@midwayjs/core';
import { CacheManager } from '@midwayjs/cache';
import { FormulaCaptchaOptions, CaptchaOptions } from '../interface';
import * as svgCaptcha from 'svg-captcha';
import * as svgBase64 from 'mini-svg-data-uri';
import { generateKey } from '../../../utils/index';

@Provide()
@Scope(ScopeEnum.Singleton)
export class CaptchaService {
  @Inject()
  cacheManager: CacheManager;

  @Config('captcha')
  captcha: CaptchaOptions;

  async formula(options?: FormulaCaptchaOptions) {
    const { data, text } = svgCaptcha.createMathExpr(options);
    const id = await this.set(text);
  }

  async set(text: string): Promise<string> {
    const id = generateKey();

    await this.cacheManager.set(this.ge);
  }

  private getStoreId(id: string): string {
    if (!this.captcha.idPrefix) {
      return id;
    }
    return `${this.captcha.idPrefix}:${id}`;
  }
}
