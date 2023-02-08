const ruleValidate = async ({ field, value, formRules, getFormData }) => {
  if (typeof field.rule === 'function') {
    return await field.rule(value, Object.assign({}, { data: getFormData() }, { field }));
  }
  if (typeof field.rule === 'object' && field.rule instanceof RegExp) {
    return {
      result: field.rule.test(value), errMsg: ''
    };
  }

  const data = {};

  if (typeof field.rule === 'string') {
    const rules = field.rule.split(' ').filter(str => str.length > 0);
    for (let currentRule of rules) {
      let [key, ...args] = currentRule.split('-');
      const exec = formRules[key.toUpperCase()];
      if (typeof exec === 'function') {
        //空值处理 如果不为REQ规则的规则REQ判断不通过返回正确
        if (currentRule !== 'REQ') {
          const emptyRes = formRules['REQ'](value, ...args, Object.assign({}, { data: getFormData() }, { field }));
          if (emptyRes.result !== true) {
            return {
              result: true, errMsg: '', data
            };
          }
        }

        const res = await exec(value, ...args, Object.assign({}, { data: getFormData() }, { field }));

        Object.assign(data, { [key.toUpperCase()]: res.data });

        if (res.result !== true) {
          return {
            result: false, errMsg: res.errMsg, data
          };
        }
      } else {
        console.error(`校验规则${currentRule}不在当前form的rules里面，请确认${field.name}的校验规则${field.rule}是否正确`);
      }
    }
  }
  return {
    result: true, errMsg: '', data
  };
};

export default ruleValidate;
