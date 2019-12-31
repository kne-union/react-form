import {useState, useRef, useEffect, useCallback} from 'react';
import useApi from './useApi';

export default (callback) => {
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
        callback && callback();
        setIsLoading(true);
        submit().catch((e) => {
            console.error(e);
        }).then(() => {
            !isUnmount.current && setIsLoading(false);
        });

    }, [submit, isLoading, setIsLoading, callback]);

    return {isPass, isLoading, onClick: handlerClick};
};
