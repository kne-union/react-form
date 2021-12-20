import { runInterceptors } from '../interceptors';

const dataSetFieldCreator =
  ({ setFormState, formStateRef, otherProps }) =>
  ({ name, groupName, groupIndex, value }) => {
    const data = Object.assign({}, formStateRef.current);
    if (groupName) {
      const field = Object.values(data).find(field => field.name === name && field.groupName === groupName && field.groupIndex === groupIndex);
      data[field.id] = field.clone().setValue(runInterceptors(otherProps.current.interceptors, 'input', field.interceptor)(value));
    } else {
      const field = Object.values(data).find(field => field.name === name);
      data[field.id] = field.clone().setValue(runInterceptors(otherProps.current.interceptors, 'input', field.interceptor)(value));
    }
    setFormState(data);
  };

export default dataSetFieldCreator;
