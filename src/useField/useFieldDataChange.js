import { useState } from 'react';
import getFieldValue from './getFieldValue';
import { useFormContext } from '../context';

const useFieldDataChange = ({ name, index, onChange }) => {
  const { emitter } = useFormContext();
  const [isValueChanged, setIsValueChanged] = useState(false);
  const handlerChange = (...args) => {
    onChange && onChange(...args);
    setIsValueChanged(true);
    const value = getFieldValue(...args);
    emitter.emit('form-field-data-change', { name, value, index });
  };

  return {
    isValueChanged,
    onChange: handlerChange
  };
};

export default useFieldDataChange;
