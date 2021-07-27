import React, { useRef } from 'react';
import Form, { useField, useSubmit, GroupList } from '@kne/react-form';

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
  const groupListRef = useRef(null);
  const groupListRef2 = useRef(null);
  return (
    <Form
      data={{ abc: [{ field1: '123zzz', field2: '22222', field3: '33333' }, { field2: '23232323' }], field: '123' }}
      onSubmit={data => {
        return new Promise(resolve => {
          setTimeout(() => {
            console.log(JSON.stringify(data));
            resolve();
          }, 1000);
        });
      }}>
      <Input name="field" label="字段" rule="REQ LEN-0-10" />
      <div>
        <button
          onClick={() => {
            groupListRef2.current.onAdd();
          }}>
          添加
        </button>
        <GroupList ref={groupListRef2} name="group2">
          {(key, { onRemove }) => (
            <div>
              <Input name="group2" label="字段" />
              <button onClick={() => onRemove(key)}>删除</button>
            </div>
          )}
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
          {(key, { onRemove }) => (
            <div>
              <Input name="field" label="字段" />
              <Input name="field2" label="字段2" />
              <Input name="field3" label="字段3" />
              <button onClick={() => onRemove(key)}>删除</button>
            </div>
          )}
        </GroupList>
      </div>
      <SubmitButton>提交</SubmitButton>
    </Form>
  );
};

export default Simple;
