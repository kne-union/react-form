import {useState, useMemo, useEffect, useCallback} from 'react';
import merge from 'lodash/merge';
import get from 'lodash/get';

const stringify = (data) => {
    if (typeof data === 'object') {
        return JSON.stringify(data);
    }
    return '';
};

const parse = (str) => {
    if (str) {
        try {
            return JSON.parse(str);
        } catch (e) {
            return {};
        }
    }
    return {};
};


export default ({data, format, cache}) => {
    const [value, setValue] = useState(merge({}, data, cache ? parse(window.localStorage.getItem(cache)) : {}));
    useEffect(() => {
        if (cache) {
            window.localStorage.setItem(cache, stringify(value));
        }
    }, [value, cache]);

    const clean = useCallback(() => {
        window.localStorage.removeItem(cache);
    }, [cache]);

    const setFormatValue = useCallback((value) => {
        const input = get(format, 'input');
        if (typeof input === 'function') {
            value = input(value);
        }

        setValue(value);
    }, [setValue]);

    const outputValue = useMemo(() => {
        const output = get(format, 'output');
        if (typeof output === 'function') {
            return output(value);
        }
        return value;
    }, [value]);

    return [outputValue, setFormatValue, clean];
};
