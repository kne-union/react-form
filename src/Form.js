import React, {useState, useRef, useCallback, useImperativeHandle, forwardRef} from 'react';
import {Provider} from './context';
import getFieldInfo from './util/getFieldInfo';
import getValues from 'lodash.values';

const Form = (props, ref) => {
    const {onPrevSubmit, onError, onSubmit} = props;
    const [formValue, setFormValue] = useState(Object.assign({}, props.data)),
        [isPass, setIsPass] = useState(false),
        fieldList = useRef({});

    const validateFields = useCallback(async (isForce = false, fields = []) => {
        let isPass = true;
        await Promise.all(fieldList.map(async (name) => {
            const {field, info} = fieldList.current[name];
            if (isForce) {
                const res = fieldList.current[name].info = await field.runValidate(formValue[name]);
                if (res.result === false) {
                    isPass = false;
                }
            } else if (info.result === false || info.result === undefined) {
                isPass = false;
            }
        }));

        return isPass;
    }, [formValue]);

    const checkPass = useCallback(async (isForce = false) => {
        const isPass = await validateFields(isForce, Object.keys(fieldList.current));
        setIsPass(isPass);
        return isPass;
    }, [validateFields, setIsPass]);

    const setFieldValue = useCallback((name, value) => {
        setFormValue(Object.assign({}, formValue, {[name]: value}));
    }, [formValue, setFormValue]);

    const reset = useCallback(() => {
        getValues(fieldList.current).forEach((item) => {
            item.info = {};
            item.field.reset();
        });

        setFormValue({});
        setIsPass(false);
    }, [setFormValue, setIsPass]);

    const setError = useCallback((name, error = {result: true, errMsg: ''}) => {
        fieldList.current[name].field.setError(error);
    }, []);

    const submit = useCallback(async () => {
        const isPass = await checkPass(false);
        const validateInfo = getFieldInfo(this.fieldList);
        onPrevSubmit && onPrevSubmit(isPass, validateInfo, formValue);
        if (!isPass) {
            onError && onError(validateInfo, formValue);
            return isPass;
        }

        await Promise.all([
            Promise.resolve(onSubmit && onSubmit(this.state.data))
        ]);
        return isPass;
    }, [formValue]);

    useImperativeHandle(ref, () => {
        return {data, isPass, submit, reset, setData: setFormValue, setError, validateFields, fieldList};
    });

    return (
        <Provider value={{
            data: formValue,
            setData: setFormValue,
            setFieldValue,
            rules: props.rules,
            setError,
            isPass, fieldList, checkPass, validateFields, reset, submit,
            props
        }}>{props.children}</Provider>
    );
};

export default forwardRef(Form);
