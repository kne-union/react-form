const compileRule = (rule, rules) => {
    return async (value, errMsg, data) => {
        let errorMsg = '', result = true, ruleList = rule.split(' ').filter((str) => str.length > 0);
        for (let index = 0; index < ruleList.length; index++) {
            const stc = ruleList[index];
            let [key, ...args] = stc.split('-');
            if (typeof rules[key] === 'function') {
                let res = await rules[key](value, ...args, data);
                if (!res.result) {
                    errorMsg = res.errMsg;
                    result = false;
                    break;
                }
            } else {
                console.error(`规则"${key}"不是一个function，将被忽略，请参考rule定制规则`);
                continue;
            }
        }

        return {result, errMsg: result ? '' : errMsg || errorMsg}
    }

};

export default (value, {rule, rules, errMsg = '', data}) => {
    if (rule instanceof RegExp) {
        return Promise.resolve({result: rule.test(value), errMsg});
    }

    if (typeof rule === 'function') {
        return Promise.resolve({result: rule(value, data), errMsg});
    }

    if (typeof rule === 'string') {
        return compileRule(rule, rules)(value, errMsg, data);
    }

    return Promise.resolve({result: true, errMsg: ''});
};
