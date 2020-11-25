import React, { createContext, useContext, useMemo, useRef } from 'react';
import range from 'lodash/range';
import uniqueId from 'lodash/uniqueId';

const context = createContext();

const { Provider } = context;

export const useGroup = () => {
  return useContext(context);
};

export const Group = ({ name, index, children }) => {
  return <Provider value={{ name, index }}>{children}</Provider>;
};

export const GroupList = ({ name, length = 1, children }) => {
  const uniqueIdListRef = useRef([]);
  const rangeList = useMemo(() => {
    return range(0, length).map(index => {
      if (!uniqueIdListRef.current[index]) {
        uniqueIdListRef.current[index] = uniqueId('group_');
      }
      return uniqueIdListRef.current[index];
    });
  }, [length]);

  return rangeList.map((key, index) => {
    return (
      <Group name={name} index={index} key={key}>
        {children}
      </Group>
    );
  });
};
