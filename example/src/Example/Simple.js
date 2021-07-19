import React from 'react';
import Form, { useField, useSubmit } from '@kne/react-form';

const Input = props => {
  const fieldProps = useField(props);
  return (
    <>
      {fieldProps.label}
      <input type="text" value={fieldProps.value || ''} onChange={fieldProps.onChange} onBlur={fieldProps.triggerValidate} />
      {fieldProps.errState}
      {fieldProps.errMsg}
    </>
  );
};

const SubmitButton = ({ children }) => {
  const { isLoading, onClick } = useSubmit();
  return (
    <button onClick={onClick}>
      {children}
      {isLoading ? '正在提交中...' : ''}
    </button>
  );
};

const Simple = () => {
  return (
    <Form
      onSubmit={data => {
        return new Promise(resolve => {
          setTimeout(() => {
            console.log(data);
            resolve();
          }, 1000);
        });
      }}>
      <Input name="field" label="字段" rule="REQ LEN-0-10" />
      <SubmitButton>提交</SubmitButton>
    </Form>
  );
};

export default Simple;
