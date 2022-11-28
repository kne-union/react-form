import { useEffect } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { useFormContext } from '../context';

const useValidate = ({ name, id, time }) => {
  const { formIsMount, emitter } = useFormContext();
  const checkValidate = () => {
    formIsMount && emitter.emit('form-field-validate', { name, id });
  };
  const { callback: debouncedCheckValidate, cancel } = useDebouncedCallback(checkValidate, time);
  useEffect(() => {
    const subscription = emitter.addListener('form-data-reset', cancel);
    return () => {
      subscription && subscription.remove();
    };
  }, [emitter, cancel]);

  return time ? debouncedCheckValidate : checkValidate;
};

export default useValidate;
