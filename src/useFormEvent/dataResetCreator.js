const dataResetCreator = ({ initDataRef, setFormState, formStateRef }) => () => {
  initDataRef.current = {};
  const data = Object.assign({}, formStateRef.current);
  Object.keys(data).forEach(name => {
    const fieldData = data[name].data;
    Object.getOwnPropertySymbols(data[name].data).forEach(index => {
      delete fieldData[index].validate;
      delete fieldData[index].value;
    });
  });
  setFormState(data);
};

export default dataResetCreator;
