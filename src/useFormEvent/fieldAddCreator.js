import { runInterceptors } from '../interceptors';
import _get from 'lodash/get';
import _last from 'lodash/last';

const fieldAddCreator =
  ({ formStateRef, initDataRef, setFormState, otherProps, emitter }) =>
  ({ name, label, rule, interceptor, noTrim, value, index, groupName, groupIndex, fieldRef }) => {
    const fieldItem = Object.assign({}, formStateRef.current[name]);
    if (!fieldItem.field) {
      fieldItem.field = { name, label, rule };
      fieldItem.data = {};
    }
    const defaultValue = runInterceptors(
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
            return _get(initDataRef.current, `${groupName}["${groupIndex}"]["${name}"]`);
          }
          return _get(initDataRef.current, name);
        })()
    );

    fieldItem.data[index] = {
      index: groupIndex,
      SymbolIndex: index,
      noTrim,
      groupName,
      fieldRef,
      interceptor,
      value: defaultValue
    };
    setFormState(Object.assign({}, formStateRef.current, { [name]: fieldItem }));
    defaultValue && emitter.emit('form-field-validate', { name, index });
  };

export default fieldAddCreator;
