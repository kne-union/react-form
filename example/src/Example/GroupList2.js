import React, { useRef, useEffect } from 'react';
import { Input, SubmitButton, ResetButton } from './Base';
import Form, { GroupList } from '@kne/react-form';

const Simple2 = () => {
  const groupListRef1 = useRef(null);
  const groupListRef2 = useRef(null);
  return <Form data={{
    'group': [{ name: '1' }], 'group1': [{ name: '1' }]
  }} onSubmit={(data) => {
    console.log(data);
  }}>
    <div>
      <button
        onClick={() => {
          groupListRef1.current.onAdd();
        }}>
        添加
      </button>
      <GroupList ref={groupListRef1} name="group">
        {(key, { onRemove }) => (<div>
          <Input name="name" label="字段"/>
          <button onClick={() => onRemove(key)}>删除</button>
        </div>)}
      </GroupList>
      <div>------------------------</div>
    </div>
    <div>
      <button
        onClick={() => {
          groupListRef2.current.onAdd();
        }}>
        添加
      </button>
      <GroupList ref={groupListRef2} name="group1">
        {(key, { onRemove }) => (<div>
          <Input name="name" label="字段"/>
          <button onClick={() => onRemove(key)}>删除</button>
        </div>)}
      </GroupList>
      <div>------------------------</div>
    </div>
    <div>
      <SubmitButton>提交</SubmitButton>
    </div>
  </Form>;
};

export default Simple2;
