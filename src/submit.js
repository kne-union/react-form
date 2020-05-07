import React from 'react';
import useSubmit from './useSubmit';

export default WrappedComponent => props => {
  const submitProps = useSubmit(props);
  return <WrappedComponent {...submitProps} />;
};
