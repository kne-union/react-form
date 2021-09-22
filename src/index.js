import Form from './Form';
import { isNotEmpty, isEmpty, filterEmpty } from './empty';

export default Form;
export { default as useField } from './useField';
export { default as useReset } from './useReset';
export { default as useSubmit } from './useSubmit';
export { default as Group } from './Group';
export { default as GroupList } from './Group/GroupList';
export { useFormContext } from './context';
export { presetRules as preset, default as RULES } from './RULES';
export { default as interceptors } from './interceptors';

export const util = {
  isNotEmpty,
  isEmpty,
  filterEmpty
};
