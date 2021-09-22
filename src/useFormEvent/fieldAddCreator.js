import Field from '../common/Field';

const fieldAddCreator =
  ({ formStateRef, setFormState }) =>
  ({ id, name }) => {
    const field = new Field({ id, name });
    setFormState(Object.assign({}, formStateRef.current, { [id]: field }));
  };

export default fieldAddCreator;
