import { runInterceptors } from '../interceptors';
import _last from 'lodash/last';
import _get from 'lodash/get';

const fieldEditCreator =
  ({ formStateRef, setFormState, initDataRef, otherProps }) =>
  ({ name, rule, label, interceptor, value, noTrim, index, groupName, groupIndex, fieldRef }) => {
    const fieldItem = Object.assign({}, formStateRef.current[name]);
    const fieldItemData = Object.assign({}, fieldItem.data[index], {
      index: groupIndex,
      SymbolIndex: index,
      label,
      noTrim,
      groupName,
      fieldRef,
      interceptor
    });

    if (!fieldItemData.value) {
      fieldItemData.value = runInterceptors(
        otherProps.current.interceptors,
        'input',
        interceptor
      )(
        value ||
          (() => {
            if (groupName && _last(groupName.split('.')) === name) {
              return _get(initDataRef.current, `${groupName}["${groupIndex}"]`);
            }
            if (groupName) {
              return _get(initDataRef.current, `${groupName}["${groupIndex}"].${name}`);
            }
            return _get(initDataRef.current, name);
          })()
      );
    }

    fieldItem.data[index] = Object.assign({}, fieldItemData, {
      rule,
      index: groupIndex,
      SymbolIndex: index,
      noTrim,
      groupName,
      fieldRef,
      interceptor
    });

    setFormState(Object.assign({}, formStateRef.current, { [name]: fieldItem }));
  };

export default fieldEditCreator;
