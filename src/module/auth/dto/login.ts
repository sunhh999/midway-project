import { Rule, RuleType } from '@midwayjs/validate';
import { ApiProperty } from '@midwayjs/swagger';
import { R } from '../../../common/base.error.util';
import { stringRequired } from '../../../common/common.validate.rules';
import { AuthEntity } from '../entity/auth';
import { BaseDTO } from '../../../common/base.dto';

export class LoginDTO extends BaseDTO<AuthEntity> {
  @ApiProperty({
    description: '登录账号',
  })
  @Rule(stringRequired.error(R.validateError('登录账号不能为空')))
  accountNumber?: string;
  @ApiProperty({
    description: '登录密码',
  })
  @Rule(stringRequired.error(R.validateError('登录密码不能为空')))
  password?: string;
  @ApiProperty({
    description: '验证码key',
  })
  @Rule(RuleType.string())
  captchaId: string;
  @ApiProperty({
    description: '验证码',
  })
  @Rule(stringRequired.error(R.validateError('验证码不能为空')))
  captcha: string;
  @Rule(stringRequired.error(R.validateError('公钥不能为空')))
  publicKey: string;
}
