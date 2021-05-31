import { parseFormData } from '../util';
import validateAllFieldsCreator from './validateAllFieldsCreator';

const dataSetCreator = ({ setFormState, formStateRef, initDataRef, interceptors, taskQueue, emitter }) => {
  const validateAllFields = validateAllFieldsCreator({ formStateRef, taskQueue, emitter });
  return ({ data }) => {
    initDataRef.current = data;
    setFormState(parseFormData(formStateRef.current, data, interceptors));
    validateAllFields();
  };
};

export default dataSetCreator;
