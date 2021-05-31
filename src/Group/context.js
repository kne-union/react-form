import { createContext, useContext } from 'react';

const context = createContext();

export const { Provider } = context;

export const useGroupContext = () => {
  return useContext(context);
};

export default context;
