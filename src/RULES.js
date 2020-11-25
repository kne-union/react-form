import isPlainObject from 'lodash/isPlainObject';
import isArray from 'lodash/isArray';
import getValues from 'lodash/values';

const RULES = {
  REQ: function (value) {
    return {
      result: (value => {
        if (isPlainObject(value)) {
          const values = getValues(value);
          return values.length > 0 && values.every(item => !!item);
        } else if (isArray(value)) {
          return value.length > 0;
        } else if (typeof value === 'number') {
          return !isNaN(value);
        } else {
          return !(value === undefined || value === null || value === '' || value.length === 0);
        }
      })(value),
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
