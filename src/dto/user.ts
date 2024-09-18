// import { Rule, RuleType } from '@midwayjs/validate';
// import { ApiProperty } from '@midwayjs/swagger';
// import { R } from '../common/base.error.util';

// export class UserDTO {
//   // id不能为空，并且是数字
//   // @Rule(RuleType.number().required())
//   @Rule(RuleType.number().required().error(new Error('id 内容不能为空')))
//   id: number;
//   // @Rule(RuleType.number().required())
//   @Rule(RuleType.number().required().max(100))
//   age: number;
// }

// export class UserDTO {
//   @ApiProperty({
//     description: 'id',
//   })
//   @Rule(RuleType.allow(null))
//   id?: number;

//   @ApiProperty({
//     description: '姓名',
//   })

//   //  这个错误消息正常需要做多语言的
//   @Rule(RuleType.string().required().error(R.validateError('姓名不能为空')))
//   name: string;

//   @ApiProperty({
//     description: '年龄',
//   })
//   @Rule(RuleType.string().required().error(R.validateError('年龄不能为空')))
//   age: number;
// }
