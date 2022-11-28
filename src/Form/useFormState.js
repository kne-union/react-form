import { useState, useRef, useMemo } from 'react';
import set from 'lodash/set';
import { runInterceptors } from '../interceptors';
import stateToIsPass from '../common/stateToIsPass';
import _last from 'lodash/last';

const useFormState = props => {
  const [state, setState] = useState({});
  const formStateRef = useRef({});
  formStateRef.current = state;

  const propsRef = useRef({});
  propsRef.current = props;

  const fields = useMemo(() => {
    return Object.values(state).map(item => {
      return {
        field: item.fieldRef, label: item.label, name: item.name, rule: item.rule
      };
    });
  }, [state]);
  const isPass = useMemo(() => {
    return stateToIsPass(state);
  }, [state]);
  const formData = useMemo(() => {
    const output = {};
    Object.values(state).forEach(field => {
      if (!field.name) {
        return;
      }
      const fieldValue = runInterceptors(propsRef.current.interceptors, 'output', field.interceptor)(field.value);
      if (field.groupName && _last(field.groupName.split('.')) === field.name) {
        set(output, `${field.groupName}[${field.groupIndex}]`, fieldValue);
        return;
      }
      if (field.groupName) {
        set(output, `${field.groupName}[${field.groupIndex}].${field.name}`, fieldValue);
        return;
      }
      set(output, field.name, fieldValue);
    });
    return output;
  }, [state]);
  const formDataRef = useRef({});
  formDataRef.current = formData;
  return {
    fields, isPass, formData, formDataRef, formState: state, formStateRef: formStateRef, setFormState: state => {
      formStateRef.current = state;
      setState(state);
    }
  };
};

export default useFormState;
