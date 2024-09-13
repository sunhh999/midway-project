import { RuleType } from '@midwayjs/validate';

// 手机号
export const phone = RuleType.string().pattern(
  /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
);

// 邮箱
export const email = RuleType.string().pattern(
  /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
);

// 字符串
export const string = RuleType.string();

// 字符串不能为空
export const stringRequired = string.required();

// 字符串最大长度
export const stringMax = (max: number) => string.max(max);

// 字符串最小长度
export const stringMin = (min: number) => string.min(min);

// 数字
export const number = RuleType.number();

// 数字不能为空
export const numberRequired = number.required();

// bool
export const boolean = RuleType.boolean();
