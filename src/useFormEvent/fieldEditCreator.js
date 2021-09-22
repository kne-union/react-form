import { runInterceptors } from '../interceptors';
import _last from 'lodash/last';
import _get from 'lodash/get';

const fieldEditCreator =
  ({ formStateRef, setFormState, initDataRef, otherProps }) =>
  ({ id, name, rule, label, interceptor, value, noTrim, groupName, groupIndex, fieldRef }) => {
    const field = formStateRef.current[id].clone();
    field.setInfo({ groupName, groupIndex, label, rule, interceptor, noTrim, fieldRef });

    field.setValue(
      runInterceptors(
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
      )
    );

    setFormState(Object.assign({}, formStateRef.current, { [id]: field }));
  };

export default fieldEditCreator;
