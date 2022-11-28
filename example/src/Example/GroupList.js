import React, { useRef, useEffect } from 'react';
import { Input, SubmitButton, ResetButton } from './Base';
import Form, { GroupList, useFormContext } from '@kne/react-form';

const FormInfo = () => {
  const { formData } = useFormContext();
  //console.log(formData);
  return null;
};

const InputComputed = () => {
  const { formData } = useFormContext();
  return <Input name="field3" label="字段3" onChange={() => {
    console.log('>>>>>>', formData);
  }}/>;
};

const GroupInner = () => {
  const { formData } = useFormContext();
  const groupListRef2 = useRef(null);
  return <>
    <div>
      <button
        onClick={() => {
          groupListRef2.current.onAdd();
        }}>
        添加
      </button>
      <GroupList ref={groupListRef2} name="group2">
        {(key, { onRemove }) => (<div>
          <Input name="field2" label="字段" onChange={() => {
            console.log('222222', formData);
          }}/>
          <InputComputed/>
          <button onClick={() => onRemove(key)}>删除</button>
          <div>>>>>>>>>>>>>>>>>></div>
        </div>)}
      </GroupList>
    </div>
  </>;
};

const Simple2 = () => {
  const groupListRef1 = useRef(null);
  return <Form data={{
    'group': [{
      'field': '123', 'field3': 'field3', 'group2': [{
        'field2': '1111', 'field3': 'field3'
      }, {
        'field2': '2222'
      }, {
        'field2': '3333'
      }]
    }, {
      'field': '124', 'group2': [{
        'field2': '222'
      }, {
        'field2': '333'
      }, {
        'field2': '4444'
      }]
    }]
  }} onSubmit={(data) => {
    console.log(data);
  }}>
    <FormInfo/>
    <div>
      <button
        onClick={() => {
          groupListRef1.current.onAdd();
        }}>
        添加
      </button>
      <GroupList ref={groupListRef1} name="group">
        {(key, { onRemove }) => (<div>
          <Input name="field" label="字段"/>
          <Input name="field3" label="字段3"/>
          <GroupInner/>
          <button onClick={() => onRemove(key)}>删除</button>
          <div>------------------------</div>
        </div>)}
      </GroupList>
    </div>
    <div>
      <SubmitButton>提交</SubmitButton>
    </div>
  </Form>;
};

export default Simple2;
