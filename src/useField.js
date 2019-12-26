import React, {useState, useEffect, useCallback, useContext, useRef} from 'react';
import useFieldRegister from './useFieldRegister';
import RULES from './util/RULES';
import OrderPromise from './util/OrderPromise';
import runValidate from './util/validate';
import getFieldValue from './util/getFieldValue';
import compileErrMsg from './util/compileErrMsg';
import context from './context';

export default (fieldProps) => {
    const {name, label, value, noTrim, rule, onChange, errMsg, ...args} = fieldProps;
    const [error, setError] = useState({
        state: 0,
        msg: ''
    });
    const {onFieldInstall, onFieldUninstall, onValidateChange} = useFieldRegister();
    const {props, setFieldValue} = useContext(context), {rules, data} = props;
    const orderPromise = useRef(new OrderPromise());
    const fieldValue = data[name];

    const validate = useCallback((value) => {
        const computedRules = Object.assign({}, RULES, rules);

        return orderPromise.current.add(runValidate(value, {
            rule, rules, errMsg, data
        }));
    }, [rules, data]);

    const checkValidate = useCallback(async () => {
        let newValue = fieldValue;
        if (typeof fieldValue === 'string') {
            if (!noTrim) {
                newValue = newValue.trim();
            }
            if (newValue !== fieldValue) {
                setFieldValue(name, newValue);
            }
        }
        setError({
            state: 3, msg: ''
        });

        const res = await validate(newValue);

        orderPromise.current.clean();

        if (res && res.hasOwnProperty('result')) {
            let errorMsg = '';

            if (res.result) {
                setError({
                    state: 1, msg: ''
                });
            } else {
                errorMsg = compileErrMsg(res.errMsg || '', label);
                setError({
                    state: 2, msg: errorMsg
                });
            }

            return {result: res.result, errMsg: errorMsg};
        } else {
            //重置为初始化状态
            return {};
        }
    }, [fieldValue, noTrim, setFieldValue, validate]);

    const handlerChange = useCallback((event, value) => {
        setFieldValue(name, getFieldValue(event, value));
        onChange && onChange(event, value);
    }, [name, onChange, setFieldValue]);

    const reset = useCallback(() => {
        //如果有远程校验，取消其返回结果
        orderPromise.current.add(Promise.resolve());
        setError({
            state: 0,
            msg: ''
        });
    }, [setError]);

    const setFieldError = useCallback((res) => {
        if (res.result) {
            setError({
                state: 1, msg: ''
            });
        } else {
            const errorMsg = compileErrMsg(res.errMsg || '', label);
            setError({
                state: 2, msg: errorMsg
            });
        }
    }, [setError, label]);

    useEffect(() => {
        if ([1, 2].indexOf(error.state) > -1) {
            onValidateChange(name, {
                result: error.state === 1,
                errorMsg: error.msg
            });
        }
    }, [error]);

    useEffect(() => {
        onFieldInstall(name, {
            validate,
            value,
            checkValidate,
            reset,
            setError: setFieldError
        });
        return () => {
            onFieldUninstall(name);
        }
    }, [onFieldInstall, onFieldUninstall, value]);

    return {
        ...args,
        name, label,
        onChange: handlerChange,
        value: fieldValue,
        triggerValidate: checkValidate,
        errorState: error.state,
        errorMsg: error.msg
    };
};
