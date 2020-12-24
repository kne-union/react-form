import { useEffect, useState, useMemo, useRef } from 'react';
import { useFormContext } from './context';
import getFieldValue from './getFieldValue';
import { useGroup } from './group';
import _get from 'lodash/get';
import uniqueId from 'lodash/uniqueId';
import { useDebouncedCallback } from 'use-debounce';

const compileErrMsg = (errMsg, label) => {
  return typeof errMsg === 'string' ? errMsg.replace('%s', label) : errMsg(label);
};

const useField = ({ name, rule, label, noTrim, debounce: time = 0, onChange, value, errMsg, ...args }) => {
  const { name: groupName, index: groupIndex } = useGroup();
  const { formState, formData, formIsMount, emitter } = useFormContext();
  const [isValueChanged, setIsValueChanged] = useState(false);
  const index = useMemo(() => Symbol(uniqueId(`${name}_`)), [name]);
  const field = _get(formState, `${name}`);
  const fieldData = _get(field, 'data', {})[index];
  const fieldRef = useRef(null);
  useEffect(() => {
    let isEmit = false;
    if (formIsMount) {
      isEmit = true;
      emitter.emit('form-field-add', { name, rule, label, noTrim, value, index, groupName, groupIndex, fieldRef });
    }
    return () => {
      isEmit && emitter.emit('form-field-remove', { name, index });
    };
  }, [name, emitter, groupName, groupIndex, rule, noTrim, label, value, index, formIsMount]);
  const handlerChange = (...args) => {
    onChange && onChange(...args);
    setIsValueChanged(true);
    const value = getFieldValue(...args);
    emitter.emit('form-field-data-change', { name, value, index });
  };
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
  return {
    ...args,
    name,
    label,
    fieldRef,
    formData,
    formState,
    rule,
    groupName,
    onChange: handlerChange,
    isValueChanged,
    value: _get(fieldData, 'value'),
    triggerValidate: time ? debouncedCheckValidate : checkValidate,
    errState: _get(fieldData, 'validate.status', 0),
    errMsg: compileErrMsg(errMsg || _get(fieldData, 'validate.msg', ''), label)
  };
};

export default useField;
