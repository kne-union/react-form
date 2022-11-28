import React, { useEffect, useMemo } from 'react';
import { Provider, useGroupContext } from './context';
import { useFormContext } from '../context';
import uniqueId from 'lodash/uniqueId';
import _get from 'lodash/get';
import groupKey from './groupKey';

const Group = ({ name, children }) => {
  const { formIsMount, emitter } = useFormContext();
  const groupId = useMemo(() => uniqueId(`group_`), []);
  const { id: parentId, index: parentIndex, groupMap, name: parentName } = useGroupContext();

  const index = useMemo(() => {
    return _get(groupMap, groupKey(parentId, name), []).indexOf(groupId);
  }, [groupId, parentId, groupMap, name]);

  const groupName = useMemo(() => {
    if (index > -1 && parentName) {
      return `${parentName}[${parentIndex}].${name}`;
    }
    return name;
  }, [parentName, name, index, parentIndex]);

  useEffect(() => {
    let isEmit = false;
    if (formIsMount) {
      isEmit = true;
      emitter.emit('form-group-add', { id: groupId, parentId, name });
    }
    return () => {
      isEmit && emitter.emit('form-group-remove', { id: groupId, parentId, name });
    };
  }, [formIsMount, emitter, groupId, parentId, name]);
  return <Provider value={{ id: groupId, name: groupName, groupMap, index }}>{children}</Provider>;
};

export default Group;

export { default as GroupRoot } from './GroupRoot';

export const useGroup = useGroupContext;
