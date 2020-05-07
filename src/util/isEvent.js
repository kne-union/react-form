import get from 'lodash/get';

export default event => {
  return event instanceof window.Event || get(event, 'nativeEvent') instanceof window.Event || typeof get(event, 'preventDefault') === 'function';
};
