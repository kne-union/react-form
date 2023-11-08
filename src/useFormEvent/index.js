import { useEffect, useMemo, useRef } from 'react';
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
import dataSetFieldListCreator from './dataSetFieldListCreator';
import submitCreator from './submitCreator';
import dataSetFieldValidateCreator from './dataSetFieldValidateCreator';
import validateAllFieldsCreator from './validateAllFieldsCreator';

const usePropsRef = props => {
  const propsRef = useRef({});
  Object.keys(props).forEach(name => {
    propsRef.current[name] = props[name];
  });
  return propsRef;
};

const useFormEvent = ({
                        debug, formStateRef, formData, formDataRef, computedIsPassRef, initDataRef, ...props
                      }) => {
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
    emitter.addListener('form-field-validate', fieldValidateCreator({
      formStateRef, formDataRef, setFormState, otherProps, taskQueue, emitter
    }));
    emitter.addListener('form-field-data-change', fieldDataChangeCreator({ formStateRef, setFormState }));

    emitter.addListener('form-data-set', dataSetCreator({
      setFormState, formStateRef, initDataRef, otherProps, taskQueue, emitter
    }));
    emitter.addListener('form-data-reset', dataResetCreator({ initDataRef, setFormState, formStateRef }));

    // 该事件已经废弃目前暂时兼容，后续版本可能会删除
    emitter.addListener('form-data-set-field', dataSetFieldCreator({
      setFormState, formStateRef, initDataRef, formDataRef, taskQueue, emitter, otherProps
    }));

    emitter.addListener('form-data-set-field-list', dataSetFieldListCreator({
      setFormState, formStateRef, initDataRef, formDataRef, taskQueue, emitter, otherProps
    }));

    emitter.addListener('form-data-set-field-validate', dataSetFieldValidateCreator({
      setFormState, formStateRef, emitter
    }));

    emitter.addListener('form-validate-all', validateAllFieldsCreator({ formStateRef, taskQueue, emitter }));
    emitter.addListener('form-submit', submitCreator({
      formStateRef, formDataRef, taskQueue, otherProps, emitter
    }));
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
