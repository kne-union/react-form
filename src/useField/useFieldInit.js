import { useEffect, useRef } from 'react';
import { useFormContext } from '../context';

const useFieldInit = ({ name, rule, label, interceptor, noTrim, value, index, groupName, groupIndex }) => {
  const fieldRef = useRef(null);
  const { formIsMount, emitter } = useFormContext();
  const valueRef = useRef(value);
  useEffect(() => {
    let isEmit = false;
    if (formIsMount && groupIndex !== -1) {
      isEmit = true;
      emitter.emit('form-field-add', {
        name,
        rule,
        label,
        interceptor,
        noTrim,
        value: valueRef.current,
        index,
        groupName,
        groupIndex,
        fieldRef
      });
    }
    return () => {
      isEmit && emitter.emit('form-field-remove', { name, index });
    };
  }, [formIsMount, emitter, name, rule, label, interceptor, noTrim, index, groupName, groupIndex, fieldRef]);
  return fieldRef;
};

export default useFieldInit;
