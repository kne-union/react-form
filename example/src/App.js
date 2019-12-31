import React from 'react';
import Form, {field, submit} from '@kne/react-form';

const SubmitButton = submit(({children, onClick: handlerClick, isLoading}) => {
    return <button disabled={isLoading} onClick={handlerClick}>{children}</button>
});

const Input = field(({label, onChange, value, triggerValidate, errorState, errorMsg}) => {
    return <>
        {label}
        <input type="text" value={value || ''} onChange={onChange} onBlur={triggerValidate}/>
        {errorState}-{errorMsg}
    </>
});

export default () => {
    return <Form debug rules={{
        EXIT: (value) => {
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve({result: true});
                }, 3000);
            });
        }
    }} onSubmit={(data) => {
        console.log(data);
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve();
            }, 1000);
        });
    }}>
        <Input name="name" label="姓名" rule="REQ TEL EXIT"/>
        <SubmitButton>提交</SubmitButton>
    </Form>
};
