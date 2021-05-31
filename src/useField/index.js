import { useMemo } from 'react';
import { useGroup } from '../Group';
import { useFormContext } from '../context';
import uniqueId from 'lodash/uniqueId';
import _get from 'lodash/get';
import useFieldInit from './useFieldInit';
import useValidate from './useValidate';
import useFieldDataChange from './useFieldDataChange';
import compileErrMsg from './compileErrMsg';

const useField = ({ name, rule, label, interceptor, noTrim, debounce: time = 0, onChange, value, errMsg, ...args }) => {
  const _group = useGroup();
  const groupName = _get(_group, 'name');
  const groupIndex = _get(_group, 'index');
  const { formState, formData } = useFormContext();
  const index = useMemo(() => Symbol(uniqueId(`${name}_`)), [name]);
  const field = _get(formState, `${name}`);
  const fieldData = _get(field, 'data', {})[index];
  const fieldRef = useFieldInit({ name, rule, label, interceptor, noTrim, value, index, groupName, groupIndex });
  const validate = useValidate({ name, index, time });
  const { isValueChanged, onChange: dataChange } = useFieldDataChange({ name, index, onChange });
  return {
    ...args,
    name,
    label,
    fieldRef,
    formData,
    formState,
    rule,
    groupName,
    groupIndex,
    onChange: dataChange,
    isValueChanged,
    value: _get(fieldData, 'value'),
    triggerValidate: validate,
    errState: _get(fieldData, 'validate.status', 0),
    errMsg: compileErrMsg(errMsg || _get(fieldData, 'validate.msg', ''), label)
  };
};

export default useField;
