import React, { useRef, useEffect } from 'react';
import { Input, SubmitButton, ResetButton } from './Base';
import Form from '@kne/react-form';

const Simple2 = () => {
  return <Form debug onSubmit={(data) => {
    console.log(data);
  }}>
    <Input name="name" label="名称" rule="REQ"/>
    <SubmitButton>提交</SubmitButton>
  </Form>;
};

export default Simple2;
