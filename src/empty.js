import isPlainObject from 'lodash/isPlainObject';
import getValues from 'lodash/values';
import isArray from 'lodash/isArray';

export const isNotEmpty = value => {
  if (isPlainObject(value)) {
    const values = getValues(value);
    return values.length > 0 && values.some(item => !!item);
  } else if (isArray(value)) {
    return value.length > 0;
  } else if (typeof value === 'number') {
    return !isNaN(value);
  } else {
    return !(value === undefined || value === null || value === '' || value.length === 0);
  }
};

export const isEmpty = value => !isNotEmpty(value);

export const filterEmpty = (value = {}) => {
  const output = {};
  Object.keys(value).forEach(key => {
    const current = value[key];
    if (isNotEmpty(current)) {
      output[key] = current;
    }
  });
  return output;
};
