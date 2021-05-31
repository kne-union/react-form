import { useFormContext } from './context';

const useFieldInfo = () => {
  const { fields } = useFormContext();
  console.warn('下一个大版本将会删掉该接口，建议不要使用');
  return fields;
};

export default useFieldInfo;
