const fieldAddCreator =
  ({ formStateRef, setFormState }) =>
  ({ name }) => {
    const fieldItem = Object.assign({}, formStateRef.current[name]);
    if (!fieldItem.field) {
      fieldItem.field = { name };
      fieldItem.data = {};
    }
    setFormState(Object.assign({}, formStateRef.current, { [name]: fieldItem }));
  };

export default fieldAddCreator;
