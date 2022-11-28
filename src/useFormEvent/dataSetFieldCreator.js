import {runInterceptors} from '../interceptors';
import fieldValidateCreator from './fieldValidateCreator';

const dataSetFieldCreator = ({setFormState, formStateRef, formDataRef, taskQueue, emitter, otherProps}) => {
    const fieldValidate = fieldValidateCreator({
        formStateRef, formDataRef, setFormState, otherProps, taskQueue, emitter
    });
    return ({name, groupName, groupIndex, value, runValidate = true}) => {
        const data = Object.assign({}, formStateRef.current);
        const field = groupName ? Object.values(data).find(field => field.name === name && field.groupName === groupName && field.groupIndex === groupIndex) : Object.values(data).find(field => field.name === name);
        if (!field) {
            console.warn('set field 失败，因为没有找到对应的 field');
            return;
        }
        data[field.id] = field.clone().setValue(runInterceptors(otherProps.current.interceptors, 'input', field.interceptor)(value));
        setFormState(data);
        runValidate && fieldValidate({id: field.id});
    };
};

export default dataSetFieldCreator;
