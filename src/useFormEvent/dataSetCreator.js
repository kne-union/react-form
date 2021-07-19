import { parseFormData } from '../util';
import validateAllFieldsCreator from './validateAllFieldsCreator';

const dataSetCreator = ({ setFormState, formStateRef, initDataRef, otherProps, taskQueue, emitter }) => {
  const validateAllFields = validateAllFieldsCreator({ formStateRef, taskQueue, emitter });
  return ({ data, runValidate = true }) => {
    initDataRef.current = data;
    setFormState(parseFormData(formStateRef.current, data, otherProps.current.interceptors));
    runValidate && validateAllFields();
  };
};

export default dataSetCreator;
