const fieldValidateCreator = ({ formStateRef, formDataRef, setFormState, otherProps, taskQueue, emitter }) => {
  const setFieldInfo = field => {
    setFormState(Object.assign({}, formStateRef.current, { [field.id]: field }));
  };
  return ({ id }) => {
    const field = formStateRef.current[id].clone();
    field.setValidateStatus({ status: 3 });
    setFieldInfo(field);

    //处理空格的情况
    let trimValue = field.value;
    if (typeof field.value === 'string' && field.noTrim !== true) {
      trimValue = field.value.trim();
      if (field.value !== trimValue) {
        field.setValue(trimValue);
        emitter.emit('form-field-data-change', { id, value: trimValue });
      }
    }
    const formData = formDataRef.current;
    //添加任务
    taskQueue.append({
      id, runner: () => {
        return field.runValidate(otherProps.current.rules, () => formDataRef.current);
      }, complete: () => {
        setFieldInfo(field);
        emitter.emit('form-field-validate-complete', {
          id, name: field.name, value: trimValue, index: field.groupIndex, validate: field.validate
        });
      }
    });
  };
};

export default fieldValidateCreator;
