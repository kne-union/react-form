import { useField, useSubmit, useReset } from '@kne/react-form';

export const Input = props => {
  const fieldProps = useField(props);
  return (<>
    {fieldProps.label}
    <input ref={fieldProps.fieldRef} type="text" value={fieldProps.value || ''} onChange={fieldProps.onChange}
           onBlur={fieldProps.triggerValidate}/>
    {fieldProps.errState}
    {fieldProps.errMsg}
  </>);
};

export const SubmitButton = ({ children }) => {
  const { isLoading, onClick } = useSubmit();
  return (<button onClick={onClick}>
    {children}
    {isLoading ? '正在提交中...' : ''}
  </button>);
};

export const ResetButton = () => {
  const { onClick } = useReset();
  return <button onClick={onClick}>重置</button>;
};



