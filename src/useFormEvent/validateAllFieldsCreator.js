const validateAllFieldsCreator = ({ formStateRef, taskQueue, emitter }) => () => {
  Object.keys(formStateRef.current).forEach(name => {
    const field = formStateRef.current[name];
    Object.getOwnPropertySymbols(field.data).forEach(index => {
      emitter.emit('form-field-validate', { name, index });
    });
  });
  return Promise.all(taskQueue.queue.map(task => task.target));
};

export default validateAllFieldsCreator;
