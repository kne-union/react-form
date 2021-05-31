import { computedIsPass, computedFormData, computedError } from '../util';
import validateAllFieldsCreator from './validateAllFieldsCreator';

const submitCreator = ({ formStateRef, taskQueue, onPrevSubmit, onError, onSubmit, emitter }) => {
  const validateAllFields = validateAllFieldsCreator({ formStateRef, taskQueue, emitter });
  return () => {
    validateAllFields()
      .then(async () => {
        const formState = formStateRef.current;
        const isPass = computedIsPass(formState);
        if (!isPass) {
          const errors = computedError(formState);
          emitter.emit('form-submit-error', errors);
          onError && (await onError(errors));
          return false;
        }
        const formData = computedFormData(formState);
        emitter.emit('form-prev-submit');
        if (onPrevSubmit && (await onPrevSubmit(formData)) === false) {
          emitter.emit('form-prev-submit-error');
          return false;
        }
        onSubmit && (await onSubmit(formData));
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
