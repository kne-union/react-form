import fieldValidateCreator from './fieldValidateCreator';
import getField, { getGroupFieldList } from '../common/getField';
import { runInterceptors } from '../interceptors';
import isNil from 'lodash/isNil';
import _last from 'lodash/last';
import _set from 'lodash/get';

const dataSetFieldListCreator = ({
                                   setFormState, formStateRef, initDataRef, formDataRef, taskQueue, emitter, otherProps
                                 }) => {
  const fieldValidate = fieldValidateCreator({
    formStateRef, formDataRef, setFormState, otherProps, taskQueue, emitter
  });
  return (list, options) => {
    const { runValidate } = Object.assign({}, { runValidate: true }, options);
    const data = Object.assign({}, formStateRef.current);
    const validateFieldIdList = [];
    list.forEach((item) => {
      const {
        name, groupName, groupIndex, value, validate, toInitData
      } = Object.assign({}, { toInitData: false }, item);

      const field = getField(data, { name, groupName, groupIndex });

      if (field) {
        data[field.id] = field.clone().setValue(runInterceptors(otherProps.current.interceptors, 'input', field.interceptor)(value));
        validate ? data[field.id].setValidateStatus(validate) : validateFieldIdList.push(field.id);
        return;
      }

      if (groupName && isNil(groupIndex)) {
        const groupFieldList = getGroupFieldList(data, { groupName, name });
        groupFieldList.forEach((field) => {
          data[field.id] = field.clone().setValue(runInterceptors(otherProps.current.interceptors, 'input', field.interceptor)(value));
          console.log(validate);
          validate ? data[field.id].setValidateStatus(validate) : validateFieldIdList.push(field.id);
        });
        return;
      }

      if (toInitData) {
        if (groupName && _last(groupName.split('.')) === name && !isNil(groupIndex)) {
          _set(initDataRef.current, `${groupName}["${groupIndex}"]`, value);
          return;
        }
        if (groupName && name && !isNil(groupIndex)) {
          _set(initDataRef.current, `${groupName}["${groupIndex}"].${name}`, value);
          return;
        }

        if (name) {
          _set(initDataRef.current, name, value);
          return;
        }
      }
    });
    setFormState(data);
    runValidate && validateFieldIdList.forEach((id) => fieldValidate({ id }));
  };
};

export default dataSetFieldListCreator;
