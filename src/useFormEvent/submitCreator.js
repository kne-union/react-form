import validateAllFieldsCreator from './validateAllFieldsCreator';

const submitCreator = ({ formStateRef, formDataRef, computedIsPassRef, taskQueue, otherProps, emitter }) => {
  const validateAllFields = validateAllFieldsCreator({ formStateRef, taskQueue, emitter });
  return args => {
    if (!Array.isArray(args)) {
      args = [args];
    }
    const { onPrevSubmit, onError, onSubmit } = otherProps.current;
    validateAllFields()
      .then(async () => {
        const formState = formStateRef.current;
        const isPass = computedIsPassRef.current(formState);
        if (!isPass) {
          const errors = Object.values(formState)
            .filter(field => {
              return field.validate.status === 2;
            })
            .map(field => Object.assign({}, field.validate, {
              name: field.name, groupName: field.groupName, fieldRef: field.fieldRef, groupIndex: field.groupIndex
            }));
          emitter.emit('form-submit-error', errors);
          onError && (await onError(errors, ...args));
          return false;
        }
        const formData = formDataRef.current;
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
        emitter.emit('form-submit-complete');
      });
  };
};

export default submitCreator;
