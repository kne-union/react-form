/**
 * 重新设计form的state，简化验证时执行效率问题
 * state
 * - field
 * - id 唯一性id
 * - name 字段名称 可以支持 company.name 和 company["name"] 格式的 name
 * - groupName 分组的名称 可以支持 company.name 和 company["name"] 格式的 name
 * - groupIndex 分组的Index
 * - label 字段名称
 * - rule 验证规则字符串
 * - interceptor 拦截器
 * - noTrim 是否去掉两端空格
 * - fieldRef 字段引用
 * */
import clone from 'lodash/clone';
import ruleValidate from './ruleValidate';

class Field {
  constructor({ id, name }) {
    this.id = id;
    this.name = name;
    this.isPass = false;
  }

  setInfo({ groupName, groupIndex, label, rule, interceptor, noTrim, fieldRef }) {
    this.groupName = groupName;
    this.groupIndex = groupIndex;
    this.label = label;
    this.rule = rule;
    this.interceptor = interceptor;
    this.noTrim = noTrim;
    this.fieldRef = fieldRef;
    return this;
  }

  deleteValue() {
    delete this.value;
    return this;
  }

  setValue(value) {
    this.value = value;
    return this;
  }

  clone() {
    return clone(this);
  }

  setValidateStatus({ status, msg = '' }) {
    this.validate = {
      status,
      msg
    };
    return this;
  }

  async runValidate(rules, getFormData) {
    const validate = await ruleValidate({
      field: {
        name: this.name,
        rule: this.rule
      },
      value: this.value,
      formRules: rules,
      getFormData
    });
    this.isPass = validate.result;
    this.validate = {
      status: validate.result === true ? 1 : 2,
      msg: validate.errMsg
    };
    return this;
  }
}

export default Field;
