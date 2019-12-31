import React, {useState, useRef, useCallback, useImperativeHandle, forwardRef, useEffect} from 'react';
import {Provider} from './context';
import useEvent from './useEvent';
import getFieldInfo from './util/getFieldInfo';
import getValues from 'lodash/values';

const Form = function (props, ref) {
    const {onPrevSubmit, onError, onSubmit, debug} = props;
    const [formValue, setFormValue] = useState(Object.assign({}, props.data)),
        [isPass, setIsPass] = useState(false),
        fieldList = useRef({});

    const emitter = useEvent(debug);

    const validateFields = useCallback(async (isForce = false, fields = []) => {
        let isPass = true;
        await Promise.all(Object.keys(fieldList.current).map(async (name) => {
            const {field, info} = fieldList.current[name];
            if (isForce) {
                const res = fieldList.current[name].info = await field.current.checkValidate(formValue[name]);
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
        const newData = Object.assign({}, formValue, {[name]: value});
        setFormValue(newData);
        emitter.emit('change', newData);
    }, [formValue, setFormValue, emitter]);

    const reset = useCallback(() => {
        getValues(fieldList.current).forEach((item) => {
            item.info = {};
            item.field.current.reset();
        });

        setFormValue({});
        setIsPass(false);
        emitter.emit('reset');
    }, [setFormValue, setIsPass, emitter]);

    const setError = useCallback((name, error = {result: true, errMsg: ''}) => {
        fieldList.current[name].field.current.setError(error);
    }, []);

    const submit = useCallback(async () => {
        const isPass = await checkPass(true);
        const validateInfo = getFieldInfo(fieldList.current);
        onPrevSubmit && onPrevSubmit(isPass, validateInfo, formValue);
        emitter.emit('prev-submit', isPass, validateInfo, formValue);
        if (!isPass) {
            onError && onError(validateInfo, formValue);
            emitter.emit('error', validateInfo, formValue);
            return isPass;
        }
        await onSubmit && onSubmit(formValue);
        emitter.emit('submit', formValue);
        return isPass;
    }, [formValue, onError, onPrevSubmit, onSubmit, checkPass, emitter]);

    useEffect(() => {
        emitter.emit('pass-change', isPass);
    }, [isPass, emitter]);

    useImperativeHandle(ref, () => {
        return {data: formValue, isPass, submit, reset, setData: setFormValue, setError, validateFields, fieldList};
    });

    return (
        <Provider value={{
            data: formValue,
            setData: setFormValue,
            setFieldValue,
            rules: props.rules,
            emitter,
            setError,
            isPass, fieldList, checkPass, validateFields, reset, submit,
            props
        }}>{props.children}</Provider>
    );
};

export default forwardRef(Form);
