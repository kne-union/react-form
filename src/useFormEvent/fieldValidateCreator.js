import getField from '../common/getField';

const fieldValidateCreator = ({ formStateRef, formDataRef, setFormState, otherProps, taskQueue, emitter }) => {
  const setFieldInfo = field => {
    setFormState(Object.assign({}, formStateRef.current, { [field.id]: field }));
  };
  return ({ id, name, groupName, groupIndex }) => {
    const field = getField(formStateRef.current, { id, name, groupName, groupIndex });
    if (!field) {
      console.error('未找到要求字段');
      return;
    }

    const newField = field.clone();
    newField.setValidateStatus({ status: 3 });
    setFieldInfo(newField);

    //处理空格的情况
    let trimValue = newField.value;
    if (typeof newField.value === 'string' && newField.noTrim !== true) {
      trimValue = newField.value.trim();
      if (newField.value !== trimValue) {
        newField.setValue(trimValue);
        emitter.emit('form-field-data-change', { id, value: trimValue });
      }
    }
    //添加任务
    taskQueue.append({
      id, runner: () => {
        return newField.runValidate(otherProps.current.rules, () => formDataRef.current);
      }, complete: () => {
        setFieldInfo(newField);
        emitter.emit('form-field-validate-complete', {
          id, name: newField.name, value: trimValue, index: newField.groupIndex, validate: newField.validate
        });
      }
    });
  };
};

export default fieldValidateCreator;
