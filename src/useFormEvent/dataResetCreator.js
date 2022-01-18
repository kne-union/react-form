const dataResetCreator =
  ({ initDataRef, setFormState, formStateRef }) =>
  () => {
    initDataRef.current = {};
    const data = Object.assign({}, formStateRef.current);
    const output = {};
    Object.values(data).forEach(item => {
      const field = item.clone();
      field.deleteValue();
      field.validate = {};
      output[item.id] = field;
    });
    setFormState(output);
  };

export default dataResetCreator;
