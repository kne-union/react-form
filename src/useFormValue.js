import { useMemo, useEffect, useCallback } from 'react';
import useCallbackState from '@kne/use-callback-state';
import merge from 'lodash/merge';
import get from 'lodash/get';

const stringify = data => {
  if (typeof data === 'object') {
    return JSON.stringify(data);
  }
  return '';
};

const parse = str => {
  if (str) {
    try {
      return JSON.parse(str);
    } catch (e) {
      return {};
    }
  }
  return {};
};

export default ({ data, formatter, cache }) => {
  const [value, setValue] = useCallbackState(merge({}, data, cache ? parse(window.localStorage.getItem(cache)) : {}));
  useEffect(() => {
    if (cache) {
      window.localStorage.setItem(cache, stringify(value));
    }
  }, [value, cache]);

  const clean = useCallback(() => {
    window.localStorage.removeItem(cache);
  }, [cache]);

  const setFormatValue = useCallback(
    (value, callback) => {
      const input = get(formatter, 'set');
      if (typeof input === 'function') {
        value = input(value);
      }

      setValue(value, callback);
    },
    [setValue]
  );

  const outputValue = useMemo(() => {
    const output = get(formatter, 'get');
    if (typeof output === 'function') {
      return output(value);
    }
    return value;
  }, [value]);

  return [outputValue, setFormatValue, clean];
};
