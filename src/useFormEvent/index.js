import { useEffect, useRef, useMemo } from 'react';
import useEvent from '@kne/use-event';
import fieldAddCreator from './fieldAddCreator';
import fieldEditCreator from './fieldEditCreator';
import fieldRemoveCreator from './fieldRemoveCreator';
import { TaskQueue } from '../common/TaskQueue';
import fieldValidateCreator from './fieldValidateCreator';
import fieldDataChangeCreator from './fieldDataChangeCreator';
import dataSetCreator from './dataSetCreator';
import dataResetCreator from './dataResetCreator';
import dataSetFieldCreator from './dataSetFieldCreator';
import submitCreator from './submitCreator';

const usePropsRef = props => {
  const propsRef = useRef({});
  Object.keys(props).forEach(name => {
    propsRef.current[name] = props[name];
  });
  return propsRef;
};

const useFormEvent = ({ debug, formStateRef, formData, formDataRef, isPassRef, initDataRef, ...props }) => {
  const emitter = useEvent({ debug, name: 'react-form' });
  const emitterRef = useRef(emitter);
  emitterRef.current = emitter;

  const otherProps = usePropsRef(props);
  otherProps.current = props;

  useEffect(() => {
    const emitter = emitterRef.current;
    const setFormState = otherProps.current.setFormState;
    const taskQueue = new TaskQueue();
    emitter.addListener('form-field-add', fieldAddCreator({ formStateRef, setFormState }));
    emitter.addListener('form-field-edit', fieldEditCreator({ formStateRef, setFormState, initDataRef, otherProps }));
    emitter.addListener('form-field-remove', fieldRemoveCreator({ formStateRef, setFormState }));
    emitter.addListener(
      'form-field-validate',
      fieldValidateCreator({
        formStateRef,
        formDataRef,
        setFormState,
        otherProps,
        taskQueue,
        emitter
      })
    );
    emitter.addListener('form-field-data-change', fieldDataChangeCreator({ formStateRef, setFormState }));
    emitter.addListener(
      'form-data-set',
      dataSetCreator({
        setFormState,
        formStateRef,
        initDataRef,
        otherProps,
        taskQueue,
        emitter
      })
    );
    emitter.addListener('form-data-reset', dataResetCreator({ initDataRef, setFormState, formStateRef }));
    emitter.addListener('form-data-set-field', dataSetFieldCreator({ setFormState, formStateRef, otherProps }));
    emitter.addListener(
      'form-submit',
      submitCreator({
        formStateRef,
        formDataRef,
        isPassRef,
        taskQueue,
        otherProps,
        emitter
      })
    );
    return () => {
      emitter.removeAllListeners();
    };
  }, [formStateRef, initDataRef, otherProps]);

  useMemo(() => {
    emitterRef.current.emit('form-data-change', { data: formData });
  }, [formData]);

  return emitter;
};

export default useFormEvent;
