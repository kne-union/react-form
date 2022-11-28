const validateAllFieldsCreator = ({ formStateRef, taskQueue, emitter }) => (options) => {
  options = Object.assign({}, options);
  Object.values(formStateRef.current).forEach(field => {
    emitter.emit('form-field-validate', { id: field.id });
  });
  return Promise.all(taskQueue.queue.map(task => task.target)).then((...args) => options.callback && options.callback({ formState: formStateRef.current }));
};

export default validateAllFieldsCreator;
