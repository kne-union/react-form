export class Task {
  constructor({ id, runner, complete }) {
    this.id = id;
    this.isCancel = false;
    this.target = Promise.race([
      Promise.resolve(runner()),
      new Promise(resolve => {
        this.resolve = resolve;
      })
    ]).then(res => {
      if (this.isCancel) {
        return new Promise(() => {
          // 返回 <pending> 状态的promise对象阻止后续的then回调触发
        });
      }
      return res;
    });
    this.target.then((...args) => {
      return Promise.resolve(complete(...args));
    });
  }

  cancel(...args) {
    if (this.isCancel === true) {
      return;
    }
    this.isCancel = true;
    this.resolve(...args);
  }
}

export class TaskQueue {
  constructor() {
    this.queue = [];
  }

  append(taskConfig) {
    const proxyTaskComplete = new Proxy(taskConfig.complete, {
      apply: (target, thisArg, argumentsList) => {
        const res = target.apply(thisArg, argumentsList);
        this.queue.splice(index, 1);
        return res;
      }
    });
    taskConfig.complete = proxyTaskComplete;
    const task = new Task(taskConfig);

    const currentTask = this.queue.find(({ id }) => task.id === id);
    if (currentTask) {
      const currentIndex = this.queue.indexOf(currentTask);
      currentTask.cancel();
      this.queue.splice(currentIndex, 1);
    }
    const index = this.queue.push(task);
  }
}

export default TaskQueue;
