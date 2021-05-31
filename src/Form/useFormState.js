import { useCallback, useMemo, useRef, useState } from 'react';
import { getFields, computedFormData, computedIsPass } from '../util';

const useFormState = () => {
  const [state, setState] = useState({});
  const stateRef = useRef({});
  const dataRef = useRef({});
  const formData = useMemo(() => {
    return computedFormData(state);
  }, [state]);

  const fields = useMemo(() => {
    return getFields(state, (item, field) => {
      return {
        field: item,
        label: field.label,
        name: field.name,
        rule: field.rule
      };
    });
  }, [state]);
  const isPass = useMemo(() => {
    return computedIsPass(state);
  }, [state]);
  const setFormState = useCallback(state => {
    if (typeof state === 'function') {
      setState(oldState => {
        const newState = state(oldState);
        stateRef.current = newState;
        return newState;
      });
    } else {
      stateRef.current = state;
      setState(state);
    }
  }, []);
  stateRef.current = state;
  dataRef.current = formData;

  return {
    formState: state,
    formStateRef: stateRef,
    formData,
    fields,
    isPass,
    formDataRef: dataRef,
    setFormState
  };
};

export default useFormState;
