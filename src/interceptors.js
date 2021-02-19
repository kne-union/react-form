import compose from '@kne/compose';
import _get from 'lodash/get';

const interceptors = {
  input: [],
  output: []
};

interceptors.input.use = (name, func) => {
  return interceptors.input.push({
    name,
    exec: func
  });
};

interceptors.output.use = (name, func) => {
  return interceptors.output.push({
    name,
    exec: func
  });
};

export default interceptors;

const baseInterceptors = interceptors;

export const runInterceptors = (interceptors, type, names) => {
  if (!Array.isArray(names)) {
    names = [names];
  }

  const currentInterceptors = baseInterceptors[type]
    .concat(_get(interceptors, type, []))
    .filter(({ name }) => names.indexOf(name) > -1)
    .reverse();

  if (currentInterceptors.length === 0) {
    return value => value;
  }
  return compose(...currentInterceptors.map(({ exec }) => exec));
};
