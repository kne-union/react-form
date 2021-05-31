import { useEffect, useMemo } from 'react';
import { Provider, useGroupContext } from './context';
import { useFormContext } from '../context';
import uniqueId from 'lodash/uniqueId';
import _get from 'lodash/get';

const Group = ({ name, children }) => {
  const { formIsMount, emitter } = useFormContext();
  const groupId = useMemo(() => Symbol(uniqueId(`group_`)), []);
  const { id: parentId, index: parentIndex, groupMap, name: parentName } = useGroupContext();

  const index = useMemo(() => {
    return _get(groupMap, parentId, []).indexOf(groupId);
  }, [groupId, parentId, groupMap]);

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
      emitter.emit('form-group-add', { id: groupId, parentId });
    }
    return () => {
      isEmit && emitter.emit('form-group-remove', { id: groupId, parentId });
    };
  }, [formIsMount, emitter, groupId, parentId]);
  return <Provider value={{ id: groupId, name: groupName, groupMap, index }}>{children}</Provider>;
};

export default Group;

export { default as GroupRoot } from './GroupRoot';

export const useGroup = useGroupContext;
