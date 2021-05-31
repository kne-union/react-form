const fieldRemoveCreator = ({ formStateRef, setFormState }) => ({ name, index }) => {
  const state = Object.assign({}, formStateRef.current);
  const fieldItem = Object.assign({}, formStateRef.current[name]);
  if (fieldItem.data) {
    delete fieldItem.data[index];
    if (Object.getOwnPropertySymbols(fieldItem.data).length === 0) {
      delete state[name];
    } else {
      state[name] = fieldItem;
    }
  }
  setFormState(state);
};

export default fieldRemoveCreator;
