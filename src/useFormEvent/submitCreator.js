import { computedIsPass, computedFormData, computedError } from '../util';
import validateAllFieldsCreator from './validateAllFieldsCreator';

const submitCreator = ({ formStateRef, taskQueue, otherProps, emitter }) => {
  const validateAllFields = validateAllFieldsCreator({ formStateRef, taskQueue, emitter });
  return args => {
    if (!Array.isArray(args)) {
      args = [args];
    }
    const { onPrevSubmit, onError, onSubmit, interceptors } = otherProps.current;
    validateAllFields()
      .then(async () => {
        const formState = formStateRef.current;
        const isPass = computedIsPass(formState);
        if (!isPass) {
          const errors = computedError(formState);
          emitter.emit('form-submit-error', errors);
          onError && (await onError(errors, ...args));
          return false;
        }
        const formData = computedFormData(formState, interceptors);
        emitter.emit('form-prev-submit');
        if (onPrevSubmit && (await onPrevSubmit(formData, ...args)) === false) {
          emitter.emit('form-prev-submit-error');
          return false;
        }
        onSubmit && (await onSubmit(formData, ...args));
        emitter.emit('form-submit-success', formData);
        return true;
      })
      .then(
        res => {
          emitter.emit('form-submit-end', res);
        },
        e => {
          console.error(e);
          emitter.emit('form-error', e);
        }
      )
      .then(() => {
        emitter.emit('form-submit-complete');
      });
  };
};

export default submitCreator;
