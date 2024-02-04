import { createContext, useContext as useUserContext } from 'react';

export const context = createContext({});

export const { Provider, Consumer } = context;

export const useContext = () => {
    return useUserContext(context);
};

export default context;
