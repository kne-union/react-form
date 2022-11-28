import validateAllFieldsCreator from './validateAllFieldsCreator';
import { filterEmpty } from '../empty';
import stateToError from '../common/stateToError';
import stateToIsPass from '../common/stateToIsPass';

const submitCreator = ({ formStateRef, formDataRef, taskQueue, otherProps, emitter }) => {
  const validateAllFields = validateAllFieldsCreator({ formStateRef, taskQueue, emitter });
  return args => {
    if (!Array.isArray(args)) {
      args = [args];
    }
    const { onPrevSubmit, onError, onComplete, onSubmit, noFilter } = otherProps.current;
    validateAllFields()
      .then(async () => {
        const formState = formStateRef.current;
        const isPass = stateToIsPass(formState);
        if (!isPass) {
          const errors = stateToError(formState);
          emitter.emit('form-submit-error', errors);
          onError && (await onError(errors, ...args));
          return false;
        }
        const formData = noFilter === true ? formDataRef.current : filterEmpty(formDataRef.current);
        emitter.emit('form-prev-submit');
        if (onPrevSubmit && (await onPrevSubmit(formData, ...args)) === false) {
          emitter.emit('form-prev-submit-error');
          return false;
        }
        onSubmit && (await onSubmit(formData, ...args));
        emitter.emit('form-submit-success', formData);
        return true;
      })
      .then(res => {
        emitter.emit('form-submit-end', res);
      }, e => {
        console.error(e);
        emitter.emit('form-error', e);
        return onError && (onError(e, ...args));
      })
      .then(() => {
        const formState = formStateRef.current;
        const isPass = stateToIsPass(formState);
        const formData = noFilter === true ? formDataRef.current : filterEmpty(formDataRef.current);
        const errors = stateToError(formState);
        emitter.emit('form-submit-complete', { formData, isPass, errors });
        return onComplete && onComplete({ formData, isPass, errors });
      });
  };
};

export default submitCreator;
