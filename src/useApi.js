import {useContext, useCallback} from 'react';
import context from './context';

export default () => {
    const {data, isPass, submit, reset, setData, setError, validateFields, fieldList} = useContext(context);
    return {
        data, isPass, setData, submit, reset, setError, validateFields,
        getFieldList: () => {
            return fieldList.current;
        }
    };
};
