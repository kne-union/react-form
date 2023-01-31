import getField from '../common/getField';

const dataSetFieldCreator = ({ setFormState, formStateRef, emitter }) => ({
                                                                            name, groupName, groupIndex, validate
                                                                          }) => {
  const data = Object.assign({}, formStateRef.current);
  const field = getField(data, { name, groupName, groupIndex });
  if (!field) {
    console.error('未找到要求字段');
    return;
  }

  const newField = field.clone();
  newField.setValidateStatus(validate);
  setFormState(Object.assign({}, data, { [newField.id]: newField }));
  emitter.emit('form-field-validate-complete', {
    id: newField.id, name: newField.name, value: newField.value, index: newField.groupIndex, validate: newField.validate
  });
};

export default dataSetFieldCreator;
