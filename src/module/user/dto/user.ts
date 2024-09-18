import { Rule, RuleType } from '@midwayjs/validate';
import { ApiProperty } from '@midwayjs/swagger';
import { R } from '../../../common/base.error.util';
import {
  stringRequired,
  numberRequired,
} from '../../../common/common.validate.rules';
import { UserEntity } from '../entity/user';
import { BaseDTO } from '../../../common/base.dto';

// 验证规则必须填写 否则就会报错
export class UserDTO extends BaseDTO<UserEntity> {
  @ApiProperty({ description: '账号' })
  @Rule(stringRequired.error(R.validateError('名称不能为空')))
  name?: string;

  @ApiProperty({ description: '用户名称' })
  @Rule(stringRequired.error(R.validateError('用户名称不能为空')))
  userName: string;

  @ApiProperty({ description: '用户昵称' })
  @Rule(stringRequired.error(R.validateError('用户昵称不能为空')))
  nickName: string;

  @ApiProperty({ description: '手机号' })
  @Rule(stringRequired.error(R.validateError('手机号不能为空')))
  phoneNumber: string;

  @ApiProperty({ description: '邮箱' })
  @Rule(stringRequired.error(R.validateError('邮箱不能为空')))
  email: string;

  @ApiProperty({ description: '头像', required: false })
  @Rule(RuleType.allow(null))
  avatar?: string;

  @ApiProperty({ description: '性别(0:女,1:男)', required: false })
  @Rule(numberRequired.error(R.validateError('性别不能为空')))
  sex?: number;
}
