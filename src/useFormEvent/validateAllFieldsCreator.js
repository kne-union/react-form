const validateAllFieldsCreator = ({ formStateRef, taskQueue, emitter }) => () => {
  Object.values(formStateRef.current).forEach(field => {
    emitter.emit('form-field-validate', { id: field.id });
  });
  return Promise.all(taskQueue.queue.map(task => task.target));
};

export default validateAllFieldsCreator;
