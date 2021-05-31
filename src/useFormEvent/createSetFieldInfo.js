const createSetFieldInfo = ({ formStateRef }) => ({ name, index, key, value }) => {
  const prevState = formStateRef.current;
  const field = Object.assign({}, prevState[name]);
  const fieldData = Object.assign({}, field.data);
  const fieldDataItem = Object.assign({}, fieldData[index]);
  fieldDataItem[key] = value;
  fieldData[index] = fieldDataItem;
  field.data = fieldData;
  return Object.assign({}, prevState, { [name]: field });
};

export default createSetFieldInfo;
