import React, { useRef, forwardRef, useEffect, useState } from 'react'
import { Provider } from '../context'
import RULES from '../RULES'
import useFormEvent from '../useFormEvent'
import useFormState from './useFormState'
import useOpenApi from './useOpenApi'
import { GroupRoot } from '../Group'

const Form = forwardRef((props, ref) => {
  const { onPrevSubmit, rules, interceptors, noFilter, data, onError, onSubmit, debug, children } = props
  const { formState, formStateRef, formData, fields, isPass, formDataRef, setFormState } = useFormState()
  const [formIsMount, setFormIsMount] = useState(false)
  const formRules = Object.assign({}, RULES, rules)
  const initDataRef = useRef(data)
  const emitter = useFormEvent({
    onPrevSubmit,
    rules: formRules,
    interceptors,
    noFilter,
    data,
    onError,
    onSubmit,
    debug,
    formState,
    formStateRef,
    formData,
    formDataRef,
    setFormState,
    initDataRef
  })
  useEffect(() => {
    setFormIsMount(true)
    initDataRef.current && emitter.emit('form-data-set', { data: initDataRef.current })
    emitter.emit('form-mount')
    return () => {
      emitter.emit('form-unmount')
    }
  }, [emitter])
  useOpenApi({ emitter, fields, interceptors, isPass, formData, formState }, ref)
  return (
    <Provider
      value={{
        formState,
        formData,
        setFormState,
        emitter,
        fields,
        isPass,
        formIsMount,
        initDataRef
      }}>
      <GroupRoot>{children}</GroupRoot>
    </Provider>
  )
})

Form.defaultProps = {
  data: {},
  debug: false,
  rules: {},
  interceptors: {}
}

export default Form
