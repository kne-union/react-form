import { useState, useMemo, useEffect, useCallback } from 'react';
import { useFormContext } from './context';
import { computedIsPass } from './util';

const useSubmit = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { formState, emitter } = useFormContext();
  const isPass = useMemo(() => {
    return computedIsPass(formState);
  }, [formState]);
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
