import { useEffect, useRef } from 'react';
import { useFormContext } from '../context';

const useFieldInit = ({ name, rule, label, interceptor, noTrim, value, index, groupName, groupIndex }) => {
  const fieldRef = useRef(null);
  const { formIsMount, emitter } = useFormContext();
  useEffect(() => {
    let isEmit = false;
    if (formIsMount) {
      isEmit = true;
      emitter.emit('form-field-add', { name, index });
    }
    return () => {
      isEmit && emitter.emit('form-field-remove', { name, index });
    };
  }, [formIsMount, emitter, name, index]);

  useEffect(() => {
    if (formIsMount && groupIndex !== -1) {
      emitter.emit('form-field-edit', {
        name,
        rule,
        label,
        interceptor,
        noTrim,
        index,
        groupName,
        groupIndex,
        value,
        fieldRef
      });
    }
  }, [formIsMount, emitter, name, rule, label, interceptor, noTrim, index, groupName, groupIndex, value, fieldRef]);
  return fieldRef;
};

export default useFieldInit;
