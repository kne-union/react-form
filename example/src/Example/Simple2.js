import React from 'react';
import { Input, SubmitButton } from './Base';
import Form, { useFormContext } from '@kne/react-form';

const TestButton = () => {
  const { openApi } = useFormContext();
  return <button onClick={async () => {
    //console.log(await openApi.validateAll());
    openApi.setField({ name: 'name', value: 'xxxxx' });
  }}>我是测试按钮</button>;
};

const Simple2 = () => {
  return <Form debug rules={{
    TEST: (value, data) => {
      return {
        result: true,
        data: { info: '1111' }
      };
    }
  }} onSubmit={(data, name) => {
    console.log(data, name);
  }}>
    <Input name='name' label='名称' rule='REQ TEST' />
    <SubmitButton onClick={() => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve('我点击了一下');
        }, 1000);
      });
    }}>提交</SubmitButton>
    <TestButton />
  </Form>;
};

export default Simple2;
