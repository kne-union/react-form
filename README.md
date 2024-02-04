
# react-form


### 描述

用于表单验证的react组件


### 安装

```shell
npm i --save @kne/react-form
```


### 概述

# ReactForm

用于表单验证


### 示例

#### 示例代码

- 这里填写示例标题
- 这里填写示例说明
- reactForm(@kne/react-form)

```jsx
const { default: Form, useField, useSubmit, useReset } = reactForm;

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

const Example = ()=>{
  return <Form>
    <Input name="name" label="名称" rule="REQ LEN-0-10"/>
    <div>
      <SubmitButton>提交</SubmitButton>
      <ResetButton>重置</ResetButton>
    </div>
  </Form>
};

render(<Example />);

```


### API


