import React, {
  useState, useRef, useMemo, createContext, useEffect, useCallback, useContext, useImperativeHandle, forwardRef
} from 'react';
import { useFormContext } from '../context';
import Group from './index';
import { useGroupContext } from './context';
import get from 'lodash/get';

const context = createContext({});

const { Provider } = context;

const GroupList = forwardRef(({ name, empty, children }, ref) => {
  const [list, setList] = useState([]);
  const { initDataRef, emitter } = useFormContext();
  const groupInfo = useGroupContext() || {};
  const { name: parentName, index: parentIndex } = groupInfo;
  const groupName = useMemo(() => {
    if (parentIndex > -1 && parentName) {
      return `${parentName}[${parentIndex}]`;
    }
    return '';
  }, [parentName, parentIndex]);
  const groupInfoRef = useRef(groupInfo);
  groupInfoRef.current = groupInfo;

  useEffect(() => {
    setList(() => {
      const parentId = groupInfoRef.current.id;
      const value = get(initDataRef.current, groupName ? `${groupName}.${name}` : name);
      return (Array.isArray(value) ? value : []).map((value, index) => parentId ? `${parentId}-${index}` : index);
    });
    const sub = emitter.addListener('form-data-set', ({ data }) => {
      const parentId = groupInfoRef.current.id;
      setList(() => {
        const value = get(data, groupName ? `${groupName}.${name}` : name);
        return (Array.isArray(value) ? value : []).map((value, index) => parentId ? `${parentId}-${index}` : index);
      });
    });
    return () => {
      sub.remove();
    };
  }, [emitter, groupName, name]);

  const onAdd = useCallback(() => {
    const parentId = groupInfoRef.current.id;
    setList(list => {
      const newList = list.slice(0);
      const index = list.length;
      newList.push(parentId ? `${parentId}-${index}` : index);
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
      onAdd, onRemove
    };
  });
  return <Provider
    value={{
      onAdd, onRemove
    }}>
    {list.length === 0 ? empty : list.map((key, index) => (<Group key={key} name={name}>
      {children(key, { index, onAdd, onRemove })}
    </Group>))}
  </Provider>;
});

GroupList.defaultProps = {
  empty: null
};

GroupList.useAction = () => {
  return useContext(context);
};

export default GroupList;
