import {useContext, useCallback} from 'react';
import context from './context';
import getFieldInfo from './util/getFieldInfo';

export default () => {
    const {data, setData, fieldList, setFieldValue, checkPass, props} = useContext(context);
    const {onValidate} = props;
    const onFieldInstall = useCallback((name, field) => {
        fieldList.current[name] = {
            field, info: {}
        };

        if (field.value) {
            setFieldValue(name, field.value);
        }

        field.validate(field.value || data[name]).then((res) => {
            if (res.result === true) {
                fieldList.current[name].info = {result: true};
            }
            return checkPass();
        });
    }, []);

    const onFieldUninstall = useCallback((name) => {
        delete fieldList.current[name];
        delete data[name];
        setData(data);
    }, []);

    const onValidateChange = useCallback(async (name, res) => {
        fieldList.current[name].info = res;
        const pass = await checkPass(), validateInfo = getFieldInfo(fieldList.current);
        onValidate && onValidate(pass, validateInfo, data);
    }, []);

    return {
        onFieldInstall, onFieldUninstall, onValidateChange
    };
};
