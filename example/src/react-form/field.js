import React from 'react';
import useField from './useField';

export default (WrappedComponent) => {
    return (props) => {
        const newProps = useField(props);
        return (
            <WrappedComponent {...newProps}/>
        )
    }
};
