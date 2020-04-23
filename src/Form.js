import React, {useState, useRef, useCallback, useImperativeHandle, forwardRef, useEffect} from 'react';
import PropTypes from 'prop-types';
import {Provider} from './context';
import useEvent from './useEvent';
import getFieldInfo from './util/getFieldInfo';
import getValues from 'lodash/values';
import useFormValue from './useFormValue';

const Form = forwardRef((props, ref) => {
    const {onPrevSubmit, onError, onSubmit, debug} = props;
    const [formValue, setFormValue, cleanCache] = useFormValue({data: props.data, cache: props.cache}),
        [isPass, setIsPass] = useState(false),
        fieldList = useRef({});

    const emitter = useEvent(debug);

    const validateFields = useCallback(async ({isForce, fields}) => {
        let isPass = true, targetFieldList = Object.keys(fieldList.current);
        if (fields && fields.length > 0) {
            targetFieldList = fields;
        }
        await Promise.all(targetFieldList.map(async (name) => {
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
        emitter.emit('check', isPass, {fields, isForce});
        return isPass;
    }, [formValue, emitter]);

    const checkPass = useCallback(async (isForce = false) => {
        const isPass = await validateFields({
            isForce, fields: Object.keys(fieldList.current)
        });
        setIsPass(isPass);
        return isPass;
    }, [validateFields, setIsPass]);

    const setFieldValue = useCallback((name, value) => {
        setFormValue((formValue) => {
            return Object.assign({}, formValue, {[name]: value});
        },(data)=>{
            emitter.emit('change', data);
        });
    }, [setFormValue, emitter]);

    const reset = useCallback(() => {
        setFormValue({}, () => {
            getValues(fieldList.current).forEach((item) => {
                item.info = {};
                item.field.current.reset();
            });
            emitter.emit('reset');
        });
        setIsPass(false);
    }, [setFormValue, setIsPass, emitter]);

    const setError = useCallback((name, error = {result: true, errMsg: ''}) => {
        fieldList.current[name].field.current.setError(error);
    }, []);

    const getValidateInfo = useCallback(() => {
        return getFieldInfo(fieldList.current);
    }, []);

    const submit = useCallback(async () => {
        const isPass = await checkPass(true);
        const validateInfo = getValidateInfo();
        onPrevSubmit && onPrevSubmit(isPass, validateInfo, formValue);
        emitter.emit('prev-submit', isPass, validateInfo, formValue);
        if (!isPass) {
            onError && onError(validateInfo, formValue);
            emitter.emit('error', validateInfo, formValue);
            return isPass;
        }
        onSubmit && await onSubmit(formValue);
        emitter.emit('submit', formValue);
        cleanCache();
        return isPass;
    }, [formValue, onError, onPrevSubmit, onSubmit, checkPass, emitter, cleanCache, getValidateInfo]);

    useEffect(() => {
        emitter.emit('pass-change', isPass);
    }, [isPass, emitter]);

    useImperativeHandle(ref, () => {
        const api = {
            data: formValue,
            isPass,
            submit,
            reset,
            setData: setFormValue,
            getData() {
                return Object.assign({}, formValue);
            },
            setError,
            validateFields,
            getFieldList: () => {
                return fieldList.current;
            }
        };
        Object.defineProperty(api, 'data', {
            get: api.getData,
            set: api.setData
        });
        return api;
    });

    return (
        <Provider value={{
            data: formValue,
            setData: setFormValue,
            setFieldValue,
            getValidateInfo,
            rules: props.rules,
            emitter,
            setError,
            isPass, fieldList, checkPass, validateFields, reset, submit,
            props
        }}>{props.children}</Provider>
    );
});


Form.propTypes = {
    data: PropTypes.object,
    cache: PropTypes.string,
    rules: PropTypes.object,
    onSubmit: PropTypes.func,
    onPrevSubmit: PropTypes.func,
    onError: PropTypes.func,
    onValidate: PropTypes.func
};

export default Form;
