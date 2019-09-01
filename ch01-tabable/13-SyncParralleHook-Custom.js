class AsyncParallelHook {

  constructor(...initArgs) {
    this.initArgs = initArgs;
  }

  tapAsync(name, ) {

  }

}

class Lesson {

  constructor() {
    this.hooks = {
      arch: new AsyncParallelHook(["name"]),
    };
  }

  // 注册监听函数
  tap() {

    this.hooks.arch.tapAsync("node", (name, cb) => {
      setTimeout(() => {
        console.log("node", name);
        cb();
      }, 1000);
    });

    this.hooks.arch.tapAsync("react", (name, cb) => {
      setTimeout(() => {
        console.log("react", name);
        cb();
      }, 1000);
    });

  }

  start() {
    console.time('hook');
    this.hooks.arch.callAsync("loki", function () {
      console.log("end");
      console.timeEnd('hook');
    });
  }
}

let lesson = new Lesson();

// 注册这两个事件
lesson.tap();

// 启动钩子
lesson.start();
