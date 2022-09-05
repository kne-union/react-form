const fieldDataChangeCreator = ({ formStateRef, setFormState }) => {
  return ({ id, value }) => {
    if (!formStateRef.current[id]) {
      return;
    }
    const field = formStateRef.current[id].clone();
    field.setValue(value);
    field.setValidateStatus({ status: 0 });

    setFormState(Object.assign({}, formStateRef.current, { [id]: field }));
  };
};

export default fieldDataChangeCreator;
