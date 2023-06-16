import Form from './Form';
import { isNotEmpty, isEmpty, filterEmpty } from './empty';
import stateToIsPass from './common/stateToIsPass';
import stateToError from './common/stateToError';
import compileErrMsg from './common/compileErrMsg';

export default Form;
export { default as Form } from './Form';
export { default as useField } from './useField';
export { default as useReset } from './useReset';
export { default as useSubmit } from './useSubmit';
export { default as Group, useGroup } from './Group';
export { default as GroupList } from './Group/GroupList';
export { useFormContext } from './context';
export { presetRules as preset, default as RULES } from './RULES';
export { default as interceptors } from './interceptors';

// 命名不规范已经废弃
export const util = {
  isNotEmpty, isEmpty, filterEmpty, stateToIsPass, stateToError, compileErrMsg
};

export const formUtils = util;
