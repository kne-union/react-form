const fieldEditCreator =
  ({ formStateRef, setFormState }) =>
  ({ id, rule, label, interceptor, noTrim, groupName, groupIndex, fieldRef }) => {
    const field = formStateRef.current[id].clone();
    field.setInfo({ groupName, groupIndex, label, rule, interceptor, noTrim, fieldRef });
    setFormState(Object.assign({}, formStateRef.current, { [id]: field }));
  };

export default fieldEditCreator;
