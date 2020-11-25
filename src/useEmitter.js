import { useFormContext } from './context';

const useEmitter = () => {
  const { emitter } = useFormContext();
  return emitter;
};

export default useEmitter;
