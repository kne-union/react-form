import React, { useRef, useEffect } from 'react';
import { Input, SubmitButton, ResetButton } from './Base';
import Form from '@kne/react-form';

const SetFieldData = () => {
  const formContextRef = useRef();
  useEffect(() => {
    setTimeout(() => {
      formContextRef.current.setFieldValidate({ name: 'name', validate: { status: 2, msg: '我是一条错误' } });
    }, 1000);
  }, []);
  return <Form debug ref={formContextRef} onSubmit={(data) => {
    console.log(data);
  }}>
    <Input name="name" label="名称" rule="REQ"/>
    <SubmitButton>提交</SubmitButton>
  </Form>;
};

export default SetFieldData;
