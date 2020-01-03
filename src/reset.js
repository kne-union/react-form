import React from 'react';
import useReset from './useReset';

export default (WrappedComponent) => (props) => {
    const resetProps = useReset(props);
    return <WrappedComponent {...resetProps}/>;
};
