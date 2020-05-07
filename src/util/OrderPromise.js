export default class OrderPromise {
  constructor() {
    this.promiseList = [];
  }

  add(promise) {
    this.promiseList.push(promise);

    const isNewPromise = res => {
      const lastPromise = this.promiseList[this.promiseList.length - 1];
      if (lastPromise === promise) {
        return res;
      } else {
        return lastPromise;
      }
    };

    return promise.then(
      res => {
        return isNewPromise(res);
      },
      err => {
        return isNewPromise(Promise.reject(err));
      }
    );
  }

  clean() {
    this.promiseList = [];
  }
}
