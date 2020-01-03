import React from 'react';
import useField from './useField';

export default (WrappedComponent) => (props) => {
    const fieldProps = useField(props);
    return <WrappedComponent {...fieldProps}/>;
};
