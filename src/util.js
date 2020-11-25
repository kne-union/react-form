import _get from 'lodash/get';

export const computedFormData = data => {
  const output = {};
  Object.keys(data).forEach(name => {
    const field = data[name].data;
    const fieldData = Object.getOwnPropertySymbols(field);
    fieldData.forEach((index, defaultIndex) => {
      const item = field[index],
        groupName = item.groupName;
      if (groupName) {
        if (!output[groupName]) {
          output[groupName] = [];
        }
        !Number.isInteger(item.index) && console.error(`group[${groupName}]缺少index，这将可能导致group数据索引不正确`);
        const targetIndex = item.index || defaultIndex;
        if (!output[groupName][targetIndex]) {
          output[groupName][targetIndex] = {};
        }
        output[groupName][targetIndex][name] = item.value;
      } else {
        output[name] = item.value;
      }
    });
  });

  return output;
};

export const parseFormData = (data, formData) => {
  data = Object.assign({}, data);
  formData = Object.assign({}, formData);
  Object.keys(data).forEach(name => {
    const field = data[name].data;
    const fieldData = Object.getOwnPropertySymbols(field);
    fieldData.forEach((index, defaultIndex) => {
      const item = Object.assign({}, field[index]),
        groupName = item.groupName;
      const value = (() => {
        if (groupName) {
          const targetIndex = item.index || defaultIndex;
          return _get(formData, `${groupName}[${targetIndex}][${name}]`);
        } else {
          return _get(formData, name);
        }
      })();
      if (value !== void 0) {
        item.value = value;
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
        const targetIndex = item.index || defaultIndex,
          groupName = item.groupName,
          fieldRef = item.fieldRef;
        output.push(Object.assign({}, item.validate, { name, groupName, fieldRef, index: targetIndex }));
      }
    });
  });
  return output;
};
