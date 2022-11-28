import { useState, useEffect, useCallback } from 'react';
import { useFormContext } from './context';

const useSubmit = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const { isPass, emitter } = useFormContext();
  const { onClick } = Object.assign({}, props);
  useEffect(() => {
    const target = emitter.addListener('form-submit-complete', () => {
      setIsLoading(false);
    });
    return () => {
      target && target.remove();
    };
  }, [emitter]);
  return {
    isLoading, isPass, onClick: useCallback((...args) => {
      setIsLoading(true);
      setTimeout(() => {
        Promise.resolve(onClick && onClick(...args)).then((returnArgs) => {
          emitter.emit('form-submit', returnArgs || args);
        }, () => {
          setIsLoading(false);
        });
      }, 0);
    }, [emitter, setIsLoading])
  };
};

export default useSubmit;
