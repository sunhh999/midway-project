import { AuthEntity } from '../entity/auth';
import { PickVO } from '../../../utils/vo.utils';
import { ApiProperty } from '@midwayjs/swagger';

//  文档
// eslint-disable-next-line prettier/prettier
export class AuthVO extends PickVO(AuthEntity, []) {
  // ??? 这是在干嘛
  @ApiProperty({ description: 'token的过期时间' })
  expire: number;
  @ApiProperty({ description: 'token' })
  token: string;
  @ApiProperty({ description: '刷新token的过期时间' })
  refreshExpire: number;
  @ApiProperty({ description: '刷新token' })
  refreshToken: string;
}
