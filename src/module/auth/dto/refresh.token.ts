import { ApiProperty } from '@midwayjs/swagger';
import { Rule, RuleType } from '@midwayjs/validate';

export class RefreshTokenDTO {
  @ApiProperty({
    description: '刷新 token',
  })
  @Rule(RuleType.allow(null))
  refreshToken?: string;
}
