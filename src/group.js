import React, { createContext, useContext, useEffect, useImperativeHandle, useState, useCallback, forwardRef } from 'react';
import useEmitter from './useEmitter';
import { useFormContext } from './context';
import range from 'lodash/range';
import uniqueId from 'lodash/uniqueId';
import get from '@babel/runtime/helpers/esm/get';

const context = createContext();

const { Provider } = context;

export const useGroup = () => {
  return useContext(context);
};

export const GroupList = forwardRef(({ name, groupKey, children }, ref) => {
  const [list, setList] = useState([]);
  const emitter = useEmitter();
  const { formDataOriginRef } = useFormContext();

  const createGroupIndex = useCallback(() => {
    return uniqueId(`group_${name}_`);
  }, [name]);

  const setGroupList = useCallback(
    list => {
      return Array.isArray(list) && setList(groupKey ? list.map(groupKey) : range(0, list.length).map(() => createGroupIndex()));
    },
    [groupKey, createGroupIndex]
  );

  useEffect(() => {
    formDataOriginRef.current && setGroupList(get(formDataOriginRef.current, name));
  }, [setGroupList, name]);

  useEffect(() => {
    const sub1 = emitter.addListener('form-data-reset', () => {
      setList([]);
    });
    const sub2 = emitter.addListener('form-data-set', ({ data }) => {
      setGroupList(get(data, name));
    });

    return () => {
      sub1 && sub1.remove();
      sub2 && sub2.remove();
    };
  }, [emitter, setGroupList]);

  const addHandler = useCallback(() => {
    setList(oldList => {
      const newList = oldList.slice(0);
      newList.push(createGroupIndex());
      emitter.emit('form-group-add', { index: newList.length - 1, name });
      return newList;
    });
  }, [createGroupIndex, emitter, name]);

  const removeHandler = useCallback(
    index => {
      setList(oldList => {
        const newList = oldList.slice(0);
        const targetIndex = newList.indexOf(index);
        newList.splice(targetIndex, 1);
        emitter.emit('form-group-remove', { index: targetIndex, name });
        return newList;
      });
    },
    [name, emitter]
  );

  useImperativeHandle(
    ref,
    () => {
      return {
        onAdd: addHandler,
        onRemove: removeHandler
      };
    },
    [addHandler, removeHandler]
  );

  return list.map(id => {
    return (
      <Group
        name={name}
        key={id}
        onAdd={addHandler}
        onRemove={() => {
          removeHandler(id);
        }}>
        {children}
      </Group>
    );
  });
});

const Group = ({ name, index, onAdd, onRemove, children }) => {
  return <Provider value={{ name, index, onAdd, onRemove }}>{children}</Provider>;
};

Group.useGroup = useGroup;
Group.GroupList = GroupList;

export default Group;
