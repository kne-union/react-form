const cancelablePromise = promise => {
  let cancel,
    isCancel = false;
  const target = Promise.race([
    promise,
    new Promise(resolve => {
      cancel = resolve;
    })
  ]).then(res => {
    if (isCancel) {
      return new Promise(() => {});
    }
    return res;
  });
  target.cancel = (...args) => {
    isCancel = true;
    cancel(...args);
  };
  return target;
};

export default cancelablePromise;
