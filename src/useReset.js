import {useCallback} from 'react';
import useApi from './useApi';

export default ({onClick, ...props}) => {
    const {reset} = useApi();
    const handlerClick = useCallback((...args) => {
        onClick && onClick(...args);
        reset();
    }, [onClick, reset]);
    return {
        ...props,
        onClick: handlerClick
    };
};
