import { useRef } from 'react';
import fbemitter from 'fbemitter';

const { EventEmitter } = fbemitter;

class FormEventEmitter extends EventEmitter {
  constructor(debug) {
    super();
    this.debug = debug;
  }

  emit(...args) {
    super.emit(...args);
    if (this.debug) {
      console.log(...args);
    }
  }
}

export default debug => {
  const emitter = useRef(new FormEventEmitter(debug));
  return {
    addListener: (...args) => emitter.current.addListener(...args),
    emit: (...args) => emitter.current.emit(...args),
    removeAllListeners: (...args) => emitter.current.removeAllListeners(...args),
    listeners: (...args) => emitter.current.listeners(...args),
    once: (...args) => emitter.current.once(...args)
  };
};
