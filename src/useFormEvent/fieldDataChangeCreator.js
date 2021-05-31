import createSetFieldInfo from './createSetFieldInfo';

const fieldDataChangeCreator = ({ formStateRef, setFormState }) => {
  const setFieldInfo = createSetFieldInfo({ formStateRef });
  return ({ name, value, index }) => {
    setFormState(
      setFieldInfo({
        name,
        index,
        key: 'value',
        value: value
      })
    );
    setFormState(
      setFieldInfo({
        name,
        index,
        key: 'validate',
        value: {
          status: 0,
          msg: ''
        }
      })
    );
  };
};

export default fieldDataChangeCreator;
