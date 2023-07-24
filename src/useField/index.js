import { useMemo } from 'react';
import { useGroup } from '../Group';
import { useFormContext } from '../context';
import { uniqueId, get as _get } from 'lodash';
import useFieldInit from './useFieldInit';
import useValidate from './useValidate';
import useFieldDataChange from './useFieldDataChange';
import compileErrMsg from '../common/compileErrMsg';

const useField = ({ name, rule, label, interceptor, noTrim, debounce: time = 0, onChange, value, errMsg, ...args }) => {
  const _group = useGroup();
  const groupName = _get(_group, 'name');
  const groupIndex = _get(_group, 'index');
  const { formState, formData } = useFormContext();
  const id = useMemo(() => uniqueId(`${name}_`), [name]);
  const field = _get(formState, id);

  const fieldRef = useFieldInit({ name, rule, label, interceptor, noTrim, value, id, groupName, groupIndex, errMsg });
  const validate = useValidate({ name, id, time });
  const { isValueChanged, onChange: dataChange } = useFieldDataChange({ name, id, onChange });
  return {
    ...args,
    id,
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
    value: _get(field, 'value'),
    triggerValidate: validate,
    errState: _get(field, 'validate.status', 0),
    errMsg: compileErrMsg(errMsg || _get(field, 'validate.msg', ''), label)
  };
};

export default useField;
