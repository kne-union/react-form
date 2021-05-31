import { useEffect } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { useFormContext } from '../context';

const useValidate = ({ name, index, time }) => {
  const { emitter } = useFormContext();
  const checkValidate = () => {
    emitter.emit('form-field-validate', { name, index });
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
