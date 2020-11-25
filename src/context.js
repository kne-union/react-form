import { createContext, useContext } from 'react';

const context = createContext({});

export default context;
export const { Provider, Consumer } = context;
export const useFormContext = () => useContext(context);
