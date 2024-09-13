import { Rule } from '@midwayjs/validate';
import { ApiProperty } from '@midwayjs/swagger';
import { R } from '../../../common/base.error.util';
import { stringRequired } from '../../../common/common.validate.rules';
import { UserEntity } from '../entity/user';
import { BaseDTO } from '../../../common/base.dto';

export class UserDTO extends BaseDTO<UserEntity> {
  @ApiProperty({
    description: '代码',
  })
  @Rule(stringRequired.error(R.validateError('代码不能为空')))
  code?: string;
  @ApiProperty({
    description: '名称',
  })
  @Rule(stringRequired.error(R.validateError('名称不能为空')))
  name?: string;
}
