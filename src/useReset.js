import { useCallback } from 'react';
import { useFormContext } from './context';

const useReset = () => {
  const { emitter } = useFormContext();
  return {
    onClick: useCallback(() => {
      emitter.emit('form-data-reset');
    }, [emitter])
  };
};

export default useReset;
