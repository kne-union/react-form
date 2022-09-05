import validateAllFieldsCreator from './validateAllFieldsCreator';
import { filterEmpty } from '../empty';
import compileErrMsg from '../common/compileErrMsg';
import _get from 'lodash/get';

const submitCreator = ({ formStateRef, formDataRef, computedIsPassRef, taskQueue, otherProps, emitter }) => {
  const validateAllFields = validateAllFieldsCreator({ formStateRef, taskQueue, emitter });
  return args => {
    if (!Array.isArray(args)) {
      args = [args];
    }
    const { onPrevSubmit, onError, onSubmit, noFilter } = otherProps.current;
    validateAllFields()
      .then(async () => {
        const formState = formStateRef.current;
        const isPass = computedIsPassRef.current(formState);
        if (!isPass) {
          const errors = Object.values(formState)
            .filter(field => {
              return field.validate.status === 2;
            })
            .map(field => {
              return Object.assign({}, field.validate, {
                name: field.name,
                label: field.label,
                groupName: field.groupName,
                fieldRef: field.fieldRef,
                groupIndex: field.groupIndex,
                errMsg: compileErrMsg(field.errMsg || _get(field, 'validate.msg', ''), field.label)
              });
            });
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
        emitter.emit('form-submit-complete');
      });
  };
};

export default submitCreator;
