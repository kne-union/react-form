import get from 'lodash/get';

const isEvent = event => {
  return event instanceof window.Event || get(event, 'nativeEvent') instanceof window.Event || typeof get(event, 'preventDefault') === 'function';
};

const getFieldValue = (event, value) => {
  if (isEvent(event)) {
    if (value === undefined) {
      switch (event.target.type) {
        case 'checkbox':
        case 'radio':
          value = event.target.checked;
          break;
        default:
          value = event.target.value;
      }
    }
  } else {
    value = event;
  }
  return value;
};

export default getFieldValue;
