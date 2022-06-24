import React, { forwardRef, useRef, useState, useEffect, useImperativeHandle } from 'react';
import { Provider } from '../context';
import useFormState from './useFormState';
import useFormEvent from '../useFormEvent';
import useOpenApi from './useOpenApi';
import RULES from '../RULES';
import { GroupRoot } from '../Group';

const Form = forwardRef((props, ref) => {
  const {
    formState, formStateRef, formData, fields, isPass, isPassRef, computedIsPassRef, formDataRef, setFormState
  } = useFormState(props);
  const initDataRef = useRef(props.data);

  const [formIsMount, setFormIsMount] = useState(false);
  const formRules = Object.assign({}, RULES, props.rules);
  const emitter = useFormEvent({
    onPrevSubmit: props.onPrevSubmit,
    rules: formRules,
    interceptors: props.interceptors,
    noFilter: props.noFilter,
    onError: props.onError,
    onSubmit: props.onSubmit,
    debug: props.debug,
    formState,
    formStateRef,
    formData,
    isPassRef,
    computedIsPassRef,
    formDataRef,
    setFormState,
    initDataRef
  });
  const emitterRef = useRef(emitter);
  emitterRef.current = emitter;

  useEffect(() => {
    setFormIsMount(true);
    initDataRef.current && emitterRef.current.emit('form-data-set', { data: initDataRef.current });
    emitterRef.current.emit('form-mount');
    return () => {
      emitterRef.current.emit('form-unmount');
    };
  }, []);

  const openApi = useOpenApi({ emitter, fields, formState, formData, isPass });
  useImperativeHandle(ref, () => openApi, [openApi]);

  return (<Provider
    value={{
      formState, formData, setFormState, emitter, fields, isPass, formIsMount, initDataRef, openApi
    }}>
    <GroupRoot>{props.children}</GroupRoot>
  </Provider>);
});

Form.defaultProps = {
  data: {}, debug: false, rules: {}, interceptors: {}
};

export default Form;
