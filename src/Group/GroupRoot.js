import React, { useMemo, useEffect, useState } from 'react';
import {uniqueId} from 'lodash';
import { Provider, useGroupContext } from './context';
import { useFormContext } from '../context';
import groupKey from './groupKey';

const GroupRoot = ({ children }) => {
  const groupId = useMemo(() => uniqueId(`group_`), []);
  const groupInfo = useGroupContext();
  const [groupMap, setGroupMap] = useState({});
  const { emitter } = useFormContext();
  useEffect(() => {
    const sub1 = emitter.addListener('form-group-add', ({ id, parentId, name }) => {
      setGroupMap(oldGroupMap => {
        const newGroupMap = Object.assign({}, oldGroupMap);
        const key = groupKey(parentId, name);
        if (!newGroupMap[key]) {
          newGroupMap[key] = [];
        }
        const newList = newGroupMap[key].slice(0);
        newList.push(id);
        newGroupMap[key] = newList;
        return newGroupMap;
      });
    });
    const sub2 = emitter.addListener('form-group-remove', ({ id, parentId, name }) => {
      setGroupMap(oldGroupMap => {
        const newGroupMap = Object.assign({}, oldGroupMap);
        const key = groupKey(parentId, name);
        const newList = newGroupMap[key].slice(0);
        const index = newList.indexOf(id);
        newList.splice(index, 1);
        newGroupMap[key] = newList;
        return newGroupMap;
      });
    });
    return () => {
      sub1.remove();
      sub2.remove();
    };
  }, [emitter]);
  return <Provider value={Object.assign({}, groupInfo, { id: groupId, groupMap })}>{children}</Provider>;
};

export default GroupRoot;
