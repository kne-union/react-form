import { runInterceptors } from '../interceptors';
import fieldValidateCreator from './fieldValidateCreator';
import _set from 'lodash/get';
import _last from 'lodash/last';

const dataSetFieldCreator = ({
                               setFormState,
                               formStateRef,
                               initDataRef,
                               formDataRef,
                               taskQueue,
                               emitter,
                               otherProps
                             }) => {
  const fieldValidate = fieldValidateCreator({
    formStateRef, formDataRef, setFormState, otherProps, taskQueue, emitter
  });
  return ({ name, groupName, groupIndex, value, runValidate = true }) => {
    console.warn('form-data-set-field事件已经废弃目前暂时兼容，后续版本可能会删除,请使用form-data-set-field-list事件代替');
    const data = Object.assign({}, formStateRef.current);
    const field = groupName ? Object.values(data).find(field => field.name === name && field.groupName === groupName && field.groupIndex === groupIndex) : Object.values(data).find(field => field.name === name);
    if (!field) {
      if (groupName && _last(groupName.split('.')) === name) {
        _set(initDataRef.current, `${groupName}["${groupIndex}"]`, value);
        return;
      }
      if (groupName) {
        _set(initDataRef.current, `${groupName}["${groupIndex}"].${name}`, value);
        return;
      }
      _set(initDataRef.current, name, value);
      return;
    }
    data[field.id] = field.clone().setValue(runInterceptors(otherProps.current.interceptors, 'input', field.interceptor)(value));
    setFormState(data);
    runValidate && fieldValidate({ id: field.id });
  };
};

export default dataSetFieldCreator;
