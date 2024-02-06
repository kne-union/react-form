const { default: Form, useField, useSubmit, useReset, GroupList } = reactForm;

const {useRef} = React;

const Input = props => {
  const fieldProps = useField(props);
  return (<div>
    {fieldProps.label}
    <input ref={fieldProps.fieldRef} type='text' value={fieldProps.value || ''} onChange={fieldProps.onChange}
           onBlur={fieldProps.triggerValidate} />
    {fieldProps.errState}
    {fieldProps.errMsg}
  </div>);
};

const SubmitButton = ({ children }) => {
  const { isLoading, onClick } = useSubmit();
  return (<button onClick={onClick}>
    {children}
    {isLoading ? '正在提交中...' : ''}
  </button>);
};

const ResetButton = () => {
  const { onClick } = useReset();
  return <button onClick={onClick}>重置</button>;
};

const InputComputed = () => {
  return <Input name="field3" label="字段3" />;
};

const GroupInner = () => {
  const groupListRef2 = useRef(null);
  return <div>
    <button
      onClick={() => {
        groupListRef2.current.onAdd();
      }}>
      添加
    </button>
    <GroupList ref={groupListRef2} name="group2">
      {(key, { onRemove }) => (<div>
        <Input name="field2" label="字段"/>
        <InputComputed/>
        <button onClick={() => onRemove(key)}>删除</button>
      </div>)}
    </GroupList>
  </div>;
};

const Example = () => {
  return <Form>
    <Input name='name' label='名称' rule='REQ LEN-0-10' />
    <GroupInner />
    <div>
      <SubmitButton>提交</SubmitButton>
      <ResetButton>重置</ResetButton>
    </div>
  </Form>;
};

render(<Example />);
