import Form from '@kne/react-form';
import { Input, SubmitButton, ResetButton } from './Base';
import range from 'lodash/range';


export default () => {
  return <Form onSubmit={(data) => {
    console.log(data);
    return new Promise((resolve)=>{
      setTimeout(()=>{resolve()},1000);
    });
  }}>
    {range(0, 200).map((index) => {
      return <Input key={index} label={`label-${index}`} name={`name_${index}`} rule="REQ LEN-0-10" value="aaaaa"/>;
    })}
    <div>
      <SubmitButton>提交</SubmitButton>
      <ResetButton>重置</ResetButton>
    </div>
  </Form>;
};
