import useEvent from '../useEvent';
import { useEffect, useRef } from 'react';
import fieldAddCreator from './fieldAddCreator';
import fieldRemoveCreator from './fieldRemoveCreator';
import fieldValidateCreator from './fieldValidateCreator';
import fieldDataChangeCreator from './fieldDataChangeCreator';
import dataSetCreator from './dataSetCreator';
import dataResetCreator from './dataResetCreator';
import dataSetFieldCreator from './dataSetFieldCreator';
import submitCreator from './submitCreator';
import { TaskQueue } from './TaskQueue';

const usePropsRef = props => {
  const propsRef = useRef({});
  Object.keys(props).forEach(name => {
    propsRef.current[name] = props[name];
  });
  return propsRef;
};

const useFormEvent = ({ debug, interceptors, rules, formStateRef, initDataRef, setFormState, onPrevSubmit, onError, onSubmit }) => {
  const emitter = useEvent(debug);
  const otherProps = usePropsRef({
    onPrevSubmit,
    onError,
    onSubmit,
    rules,
    interceptors
  });
  useEffect(() => {
    const taskQueue = new TaskQueue();
    emitter.addListener(
      'form-field-add',
      fieldAddCreator({
        formStateRef,
        initDataRef,
        setFormState,
        interceptors: otherProps.current.interceptors,
        emitter
      })
    );
    emitter.addListener('form-field-remove', fieldRemoveCreator({ formStateRef, setFormState }));
    emitter.addListener(
      'form-field-validate',
      fieldValidateCreator({
        formStateRef,
        setFormState,
        taskQueue,
        rules: otherProps.current.rules,
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
        interceptors: otherProps.current.interceptors,
        taskQueue,
        emitter
      })
    );
    emitter.addListener('form-data-reset', dataResetCreator({ initDataRef, setFormState, formStateRef }));
    emitter.addListener('form-data-set-field', dataSetFieldCreator({ setFormState, formStateRef }));
    emitter.addListener(
      'form-submit',
      submitCreator({
        formStateRef,
        taskQueue,
        onPrevSubmit: otherProps.current.onPrevSubmit,
        onError: otherProps.current.onError,
        onSubmit: otherProps.current.onSubmit,
        rules: otherProps.current.rules,
        emitter
      })
    );
    return () => {
      emitter.removeAllListeners();
    };
  }, [emitter, formStateRef, initDataRef, otherProps, setFormState]);
  return emitter;
};

export default useFormEvent;
