const stateToIsPass = (formState) => {
  return Object.values(formState).every(field => {
    return field.isPass;
  });
};

export default stateToIsPass;