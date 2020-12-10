import { useFormContext } from './context';

const useFieldInfo = () => {
  const { fields } = useFormContext();
  return fields;
};

export default useFieldInfo;
