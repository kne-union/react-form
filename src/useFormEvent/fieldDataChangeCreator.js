const fieldDataChangeCreator = ({ formStateRef, setFormState }) => {
  const setFieldInfo = field => {
    setFormState(Object.assign({}, formStateRef.current, { [field.id]: field }));
  };
  return ({ id, value }) => {
    const field = formStateRef.current[id].clone();
    field.setValue(value);
    field.setValidateStatus({ status: 0 });

    setFormState(Object.assign({}, formStateRef.current, { [id]: field }));
  };
};

export default fieldDataChangeCreator;
