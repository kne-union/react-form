import _get from 'lodash/get';
import { runInterceptors } from './interceptors';

export const getFields = (data, callback) => {
  const output = {};
  Object.keys(data).forEach(name => {
    const field = data[name].data;
    const fieldData = Object.getOwnPropertySymbols(field);
    fieldData.forEach(index => {
      const item = field[index],
        groupName = item.groupName;
      if (groupName) {
        if (!output[groupName]) {
          output[groupName] = [];
        }
        const targetIndex = item.index;
        if (!output[groupName][targetIndex]) {
          output[groupName][targetIndex] = {};
        }
        if (groupName === name) {
          output[groupName][targetIndex] = callback(item, data[name].field);
          return;
        }

        output[groupName][targetIndex][name] = callback(item, data[name].field);
        return;
      }

      output[name] = callback(item, data[name].field);
    });
  });

  return output;
};

export const computedFormData = (data, interceptors) => {
  return getFields(data, item => {
    if (item.value === void 0) {
      return item.value;
    }
    return runInterceptors(interceptors, 'output', item.interceptor)(item.value);
  });
};

export const parseFormData = (data, formData, interceptors) => {
  data = Object.assign({}, data);
  formData = Object.assign({}, formData);
  Object.keys(data).forEach(name => {
    const field = data[name].data;
    const fieldData = Object.getOwnPropertySymbols(field);
    fieldData.forEach(index => {
      const item = Object.assign({}, field[index]),
        groupName = item.groupName;

      const targetIndex = item.index;
      const value = (() => {
        if (groupName && groupName === name) {
          return _get(formData, `${groupName}[${targetIndex}]`);
        }
        if (groupName) {
          return _get(formData, `${groupName}[${targetIndex}][${name}]`);
        }
        return _get(formData, name);
      })();
      if (value !== void 0) {
        item.value = runInterceptors(interceptors, 'input', item.interceptor)(value);
        item.validate = {
          status: 0,
          msg: ''
        };
        data[name].data[index] = item;
      }
    });
  });
  return data;
};

export const computedIsPass = data => {
  return Object.keys(data).every(name => {
    const field = data[name].data;
    return Object.getOwnPropertySymbols(field).every(index => {
      const item = field[index];
      return _get(item, 'validate.status') === 1;
    });
  });
};

export const computedError = data => {
  const output = [];
  Object.keys(data).forEach(name => {
    const field = data[name].data;
    Object.getOwnPropertySymbols(field).forEach((index, defaultIndex) => {
      const item = field[index];
      if (_get(item, 'validate.status') === 2) {
        const targetIndex = item.index,
          groupName = item.groupName,
          fieldRef = item.fieldRef;
        output.push(Object.assign({}, item.validate, { name, groupName, fieldRef, index: targetIndex }));
      }
    });
  });
  return output;
};
