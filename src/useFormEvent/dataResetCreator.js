const dataResetCreator =
  ({ initDataRef, setFormState, formStateRef }) =>
  () => {
    initDataRef.current = {};
    const data = Object.assign({}, formStateRef.current);
    const output = {};
    Object.keys(data).forEach(item => {
      const field = item.clone();
      field.deleteValue();
      output[item.id] = field;
    });
    setFormState(output);
  };

export default dataResetCreator;
