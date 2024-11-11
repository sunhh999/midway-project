import { ApiProperty } from '@midwayjs/swagger';
import { stringRequired, email } from '../../../common/common.validate.rules';
import { R } from '../../../common/base.error.util';
import { Rule } from '@midwayjs/validate';

export class ResetPasswordDTO {
  @ApiProperty({ description: '密码' })
  @Rule(stringRequired.error(R.validateError('密码不能为空')))
  password: string;
  @ApiProperty({ description: '邮箱' })
  @Rule(email.error(R.validateError('无效的邮箱格式')))
  email: string;
  @ApiProperty({ description: '邮箱验证码' })
  emailCaptcha: string;
  @Rule(stringRequired.error(R.validateError('公钥不能为空')))
  publicKey: string;
}
