import React, {
  useState, useRef, useMemo, createContext, useEffect, useCallback, useContext, useImperativeHandle, forwardRef
} from 'react';
import { useFormContext } from '../context';
import Group from './index';
import { useGroupContext } from './context';
import get from 'lodash/get';
import last from 'lodash/last';
import range from 'lodash/range';

const context = createContext({});

const { Provider } = context;

const GroupItem = ({ children }) => {
  const { index } = useGroupContext();
  return children({ index });
};

const GroupList = forwardRef(({ name, defaultLength, empty, children }, ref) => {
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
  const dataRouter = useRef();
  dataRouter.current = groupName ? `${groupName}.${name}` : name;
  const defaultLengthRef = useRef(defaultLength);
  useEffect(() => {
    const setValueCallback = (value) => {
      const parentId = groupInfoRef.current.id;
      const mapCallback = (value, index) => parentId ? `${parentId}-${index}` : index;
      if (Number.isInteger(defaultLengthRef.current) && defaultLengthRef.current > 0 && !(Array.isArray(value) && value.length >= defaultLengthRef.current)) {
        return range(0, defaultLengthRef.current).map(mapCallback);
      }
      if (Array.isArray(value)) {
        return value.map(mapCallback);
      }
      return [];
    };
    setList(() => {
      const value = get(initDataRef.current, groupName ? `${groupName}.${name}` : name);
      return setValueCallback(value);
    });
    const sub = emitter.addListener('form-data-set', ({ data }) => {
      setList(() => {
        const value = get(data, groupName ? `${groupName}.${name}` : name);
        return setValueCallback(value);
      });
    });
    return () => {
      sub.remove();
    };
  }, [emitter, groupName, name]);

  const onAdd = useCallback((options) => {
    const { isUnshift } = Object.assign({}, options);
    const parentId = groupInfoRef.current.id;
    setList(list => {
      if (list.length === 0) {
        return [`${parentId}-0`];
      }
      const newList = list.slice(0);
      const index = Math.max(parseInt(last(list[0].split('-'))), parseInt(last(last(list).split('-')))) + 1;
      newList[isUnshift ? 'unshift' : 'push'](parentId ? `${parentId}-${index}` : index);
      return newList;
    });
  }, []);

  const onRemove = useCallback(key => {
    setList(list => {
      const index = list.indexOf(key);
      const target = get(initDataRef.current, dataRouter.current);
      if (Array.isArray(target)) {
        target.splice(index, 1);
      }
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
    {list.length === 0 ? empty : list.map((key) => (<Group key={key} name={name}>
      <GroupItem>{({ index }) => children(key, {
        index, length: list.length, onAdd, onRemove: () => onRemove(key)
      })}</GroupItem>
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
