import { useState, useEffect, useCallback } from 'react';
import { useFormContext } from './context';

const useSubmit = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { isPass, emitter } = useFormContext();
  useEffect(() => {
    const target = emitter.addListener('form-submit-complete', () => {
      setIsLoading(false);
    });
    return () => {
      target && target.remove();
    };
  }, [emitter]);
  return {
    isLoading,
    isPass,
    onClick: useCallback(() => {
      setIsLoading(true);
      emitter.emit('form-submit');
    }, [emitter, setIsLoading])
  };
};

export default useSubmit;
