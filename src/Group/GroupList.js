import React, { useState, createContext, useEffect, useCallback, useContext, useImperativeHandle, forwardRef } from 'react';
import { useFormContext } from '../context';
import Group from './index';
import GroupRoot from './GroupRoot';

const context = createContext({});

const { Provider } = context;

const GroupList = forwardRef(({ name, children }, ref) => {
  const [list, setList] = useState([]);
  const { emitter } = useFormContext();
  useEffect(() => {
    const sub = emitter.addListener('form-data-set', ({ data }) => {
      setList(() => {
        return (data[name] || []).map((value, index) => index);
      });
    });
    return () => {
      sub.remove();
    };
  }, [emitter, name]);

  const onAdd = useCallback(() => {
    setList(list => {
      if (list.length === 0) {
        return [0];
      }
      const newList = list.slice(0);
      newList.push(list[list.length - 1] + 1);
      return newList;
    });
  }, []);

  const onRemove = useCallback(key => {
    setList(list => {
      const index = list.indexOf(key);
      const newList = list.slice(0);
      newList.splice(index, 1);
      return newList;
    });
  }, []);

  useImperativeHandle(ref, () => {
    return {
      onAdd,
      onRemove
    };
  });
  return (
    <GroupRoot>
      <Provider
        value={{
          onAdd,
          onRemove
        }}>
        {list.map(key => (
          <Group key={key} name={name}>
            {children(key, { onAdd, onRemove })}
          </Group>
        ))}
      </Provider>
    </GroupRoot>
  );
});

GroupList.useAction = () => {
  return useContext(context);
};

export default GroupList;
