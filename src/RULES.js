import { isNotEmpty } from './empty';

const RULES = {
  REQ: function (value) {
    return {
      result: isNotEmpty(value),
      errMsg: ''
    };
  },
  TEL: function (value) {
    return {
      result: /^1[0-9]{10}$/.test(value),
      errMsg: '请输入有效的手机号'
    };
  },
  EMAIL: function (value) {
    return {
      result: /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(value),
      errMsg: '请输入有效的邮箱'
    };
  },
  LEN: function (value, start, end) {
    value = value.toString();
    if (end === start && value.length !== Number(end)) {
      return {
        result: false,
        errMsg: `%s长度必须等于${end}`
      };
    }
    if (value.length < start) {
      return {
        result: false,
        errMsg: `%s长度必须大于${start}`
      };
    }
    if (end && value.length > end) {
      return {
        result: false,
        errMsg: `%s长度必须小于${end}`
      };
    }
    return { result: true };
  }
};
export default RULES;
export const presetRules = (newRules = {}) => {
  Object.assign(RULES, newRules);
};
