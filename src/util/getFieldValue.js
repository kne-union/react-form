import isEvent from './isEvent';

export default (event, value) => {
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
