import { last as _last, get as _get } from 'lodash';
import { runInterceptors } from '../interceptors';
import validateAllFieldsCreator from './validateAllFieldsCreator';

const dataSetCreator = ({ setFormState, formStateRef, initDataRef, otherProps, taskQueue, emitter }) => {
  const validateAllFields = validateAllFieldsCreator({ formStateRef, taskQueue, emitter });
  return ({ data, runValidate = true }) => {
    initDataRef.current = data;
    const output = {};
    Object.values(Object.assign({}, formStateRef.current)).forEach(field => {
      const newField = field.clone();
      const groupName = newField.groupName, targetIndex = newField.groupIndex, name = newField.name;
      const value = (() => {
        if (groupName && _last(groupName.split('.')) === name) {
          return _get(data, `${groupName}[${targetIndex}]`);
        }
        if (groupName) {
          return _get(data, `${groupName}[${targetIndex}].${name}`);
        }
        return _get(data, name);
      })();
      newField.setValue(runInterceptors(otherProps.current.interceptors, 'input', field.interceptor)(value));
      output[newField.id] = newField;
    });
    setFormState(output);
    runValidate && validateAllFields();
  };
};

export default dataSetCreator;
