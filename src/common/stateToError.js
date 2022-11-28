import compileErrMsg from './compileErrMsg';
import _get from 'lodash/get';

const stateToError = (formState) => {
  return Object.values(formState)
    .filter(field => {
      return _get(field, 'validate.status') === 2;
    })
    .map(field => {
      return Object.assign({}, field.validate, {
        name: field.name,
        label: field.label,
        groupName: field.groupName,
        fieldRef: field.fieldRef,
        groupIndex: field.groupIndex,
        errMsg: compileErrMsg(field.errMsg || _get(field, 'validate.msg', ''), field.label)
      });
    });
};

export default stateToError;