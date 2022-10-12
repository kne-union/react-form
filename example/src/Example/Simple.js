import React, { useRef, useEffect } from 'react';
import Form, { GroupList, useFormContext } from '@kne/react-form';
import { Input, SubmitButton, ResetButton } from './Base';

const Simple = () => {
  const groupListRef = useRef(null);
  const groupListRef2 = useRef(null);
  const formRef = useRef(null);
  return (<Form
    ref={formRef}
    rules={{
      RULE: (value, formData) => {
        console.log(formData);
        return {
          result: true
        };
      }
    }}
    //data={{ abc: [{ field1: '123zzz', field2: '22222', field3: '33333' }, { field2: '23232323' }], field: '' }}
    onError={error => {
      console.log(error[0]);
    }}
    onSubmit={(data, args) => {
      return new Promise(resolve => {
        setTimeout(() => {
          console.log(JSON.stringify(data));
          resolve();
        }, 1000);
      });
    }}>
    <Input name="field" label="字段" rule="REQ LEN-0-10 RULE"/>
    <div>
      <button
        onClick={() => {
          groupListRef2.current.onAdd({isInsert:true});
        }}>
        添加
      </button>
      <GroupList ref={groupListRef2} name="group2">
        {(key, { onRemove }) => (<div>
          <Input name="group2" label="字段"/>
          <button onClick={() => onRemove(key)}>删除</button>
        </div>)}
      </GroupList>
    </div>
    <div>
      <button
        onClick={() => {
          groupListRef.current.onAdd();
        }}>
        添加
      </button>
      <GroupList ref={groupListRef} name="abc">
        {(key, { onRemove }) => (<div>
          <Input name="field" label="字段"/>
          <Input name="field2" label="字段2"/>
          <Input name="field3" label="字段3"/>
          <button onClick={() => onRemove(key)}>删除</button>
        </div>)}
      </GroupList>
    </div>
    <SubmitButton>提交</SubmitButton>
    <button
      onClick={() => {
        formRef.current.emitter.emit('form-data-set-field', {
          name: 'field', value: 'zzzzzzzzzz'
        });
      }}>
      点击
    </button>
    <ResetButton>重置</ResetButton>
  </Form>);
};

export default Simple;
