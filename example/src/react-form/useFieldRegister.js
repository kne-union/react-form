import {useContext, useCallback} from 'react';
import context from './context';
import getFieldInfo from './util/getFieldInfo';

export default () => {
    const {data, setData, fieldList, setFieldValue, checkPass, props} = useContext(context);
    const {onValidate} = props;
    const onFieldInstall = useCallback((field) => {
        const {name, value} = field.current;
        fieldList.current[name] = {
            field, info: {}
        };

        if (field.current.value) {
            setFieldValue(name, value);
        }

        field.current.validate(value || data[name]).then((res) => {
            if (res.result === true) {
                fieldList.current[name].info = {result: true};
            }
            return checkPass();
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
    }, [fieldList, data, onValidate, checkPass]);

    return {
        onFieldInstall, onFieldUninstall, onValidateChange
    };
};
