import { useRef, useMemo } from 'react';
import fbemitter from 'fbemitter';

const { EventEmitter } = fbemitter;

class FormEventEmitter extends EventEmitter {
  constructor(debug) {
    super();
    this.debug = debug;
  }

  emit(...args) {
    if (this.debug) {
      console.log('[react-form][debug]:', ...args);
    }
    super.emit(...args);
  }
}

const useEvent = debug => {
  const debugRef = useRef(debug);
  return useMemo(() => {
    const emitter = new FormEventEmitter(debugRef.current);
    return {
      addListener: (...args) => emitter.addListener(...args),
      emit: (...args) => emitter.emit(...args),
      removeAllListeners: (...args) => emitter.removeAllListeners(...args),
      listeners: (...args) => emitter.listeners(...args),
      once: (...args) => emitter.once(...args)
    };
  }, []);
};

export default useEvent;
