
# react-form


### 描述

用于表单验证的react组件


### 安装

```shell
npm i --save @kne/react-form
```


### 概述

#### 特点

* UI分离，支持自定义UI框架。提供了antd的组件封装 @kne/react-form-antd 和 taro的组件封装 @kne/react-form-taro
* 分级校验规则配置，校验规则支持异步校验
* 事件驱动，方便灵活扩展。可以通过debug选项配置，通过触发事件顺序和参数轻松调试
* 支持包含Group的复杂表单，子表单


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

- 展示了GroupList的使用
- 这里填写示例说明
- reactForm(@kne/react-form)

```jsx
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

```


### API


