import Form, { useField, useSubmit, Group } from 'react-form';

const SubmitButton = ({ children }) => {
  const { isLoading, onClick } = useSubmit();
  return (
    <button onClick={onClick}>
      {children}
      {isLoading ? '正在提交中...' : ''}
    </button>
  );
};

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

function App() {
  return (
    <div>
      <Form
        data={{
          name: '1222',
          item: [
            { name: 'a@qq.com', itemDes: [{ name: 'b@qq.com' }] },
            {
              name: 'a@qq.com',
              itemDes: [{ name: 'b@qq.com' }]
            }
          ]
        }}
        onSubmit={data => {
          console.log(data);
        }}>
        <Input name="name" label="名称" rule="REQ LEN-0-10" />
        <Group name="item">
          <Input name="name" label="名称" rule="REQ LEN-0-10" />
          <Group name="itemDes">
            <Input name="name" label="名称" rule="REQ LEN-0-10" />
          </Group>
          <Group name="itemDes">
            <Input name="name" label="名称" rule="REQ LEN-0-10" />
          </Group>
        </Group>
        <Group name="item">
          <Input name="name" label="名称" rule="REQ LEN-0-10" />
          <Group name="itemDes">
            <Input name="name" label="名称" rule="REQ LEN-0-10" />
          </Group>
          <Group name="itemDes">
            <Input name="name" label="名称" rule="REQ LEN-0-10" />
          </Group>
        </Group>
        <SubmitButton>提交</SubmitButton>
      </Form>
    </div>
  );
}

export default App;
