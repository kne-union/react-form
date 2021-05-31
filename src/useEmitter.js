import { useFormContext } from './context';

const useEmitter = () => {
  const { emitter } = useFormContext();
  console.warn('下一个大版本将会删掉该接口，建议不要使用');
  return emitter;
};

export default useEmitter;
