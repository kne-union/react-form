import {useContext, useCallback} from 'react';
import context from './context';
import getFieldInfo from './util/getFieldInfo';

export default () => {
    const {data, setData, fieldList, setFieldValue, checkPass, emitter, props} = useContext(context);
    const {onValidate} = props;
    const onFieldInstall = useCallback((field) => {
        const {name, value, validate} = field.current,
            dataIsInit = data.hasOwnProperty(name);
        let fieldValue;
        if (dataIsInit) {
            fieldValue = data[name];
        }
        fieldList.current[name] = {
            field, info: {}
        };

        if (!dataIsInit && value) {
            setFieldValue(name, value);
            fieldValue = value;
        }

        fieldValue !== undefined && validate(fieldValue).then((res) => {
            if (res.result === true) {
                fieldList.current[name].info = {result: true};
                return checkPass();
            }
        });
    }, [setFieldValue, checkPass, data, fieldList]);

    const onFieldUninstall = useCallback((name) => {
        delete fieldList.current[name];
        delete data[name];
        setData(data);
    }, [data, fieldList, setData]);

    const onValidateChange = useCallback(async (name, res) => {
        fieldList.current[name].info = res;
        const pass = await checkPass(), validateInfo = getFieldInfo(fieldList.current);
        onValidate && onValidate(pass, validateInfo, data);
        emitter.emit('validate', pass, validateInfo, data);
    }, [fieldList, data, onValidate, checkPass, emitter]);

    return {
        onFieldInstall, onFieldUninstall, onValidateChange
    };
};
