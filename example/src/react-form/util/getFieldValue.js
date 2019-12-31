import isEvent from './isEvent'

export default (event, value) => {
    if (isEvent(event)) {
        if (value === undefined) {
            value = event.target.value;
        }
    } else {
        value = event;
    }
    return value;
}
