import _get from 'lodash/get';

const dataSetFieldCreator = ({ setFormState, formStateRef }) => ({ name, value }) => {
  const groupName = value.groupName;
  const groupIndex = value.groupIndex;
  const data = Object.assign({}, formStateRef.current);
  let fieldData = _get(data[name], 'data');
  if (!groupName) {
    fieldData = {};
    Object.getOwnPropertySymbols(fieldData).forEach(index => {
      fieldData[index] = Object.assign({}, fieldData[index], value);
    });
  } else {
    const index = Object.getOwnPropertySymbols(fieldData).find(index => {
      const data = _get(fieldData, `[${index}]`);
      return _get(data, 'groupName') === groupName && _get(data, 'groupIndex') === groupIndex;
    });
    fieldData[index] = Object.assign({}, fieldData[index], value);
  }

  setFormState(Object.assign({}, data, { [name]: fieldData }));
};

export default dataSetFieldCreator;
