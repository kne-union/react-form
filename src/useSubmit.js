import {useState, useRef, useEffect, useCallback} from 'react';
import useApi from './useApi';

export default ({onClick, ...props}) => {
    const [isLoading, setIsLoading] = useState(false),
        isUnmount = useRef(false);
    const {submit, isPass} = useApi();

    useEffect(() => {
        return () => {
            isUnmount.current = true;
        }
    }, []);

    const handlerClick = useCallback(() => {
        if (isLoading) {
            return;
        }
        onClick && onClick();
        setIsLoading(true);
        submit().catch((e) => {
            console.error(e);
        }).then(() => {
            !isUnmount.current && setIsLoading(false);
        });

    }, [submit, isLoading, setIsLoading, onClick]);

    return {...props, isPass, isLoading, onClick: handlerClick};
};
