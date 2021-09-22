const fieldRemoveCreator =
  ({ formStateRef, setFormState }) =>
  ({ id }) => {
    const state = Object.assign({}, formStateRef.current);
    delete state[id];
    setFormState(state);
  };

export default fieldRemoveCreator;
