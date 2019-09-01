const {SyncWaterfallHook} = require("tapable");

// waterfall 瀑布 上面会影响下面的

class Lesson {
  constructor() {
    this.hooks = {
      arch: new SyncWaterfallHook(["name"])
    };
  }

  // 注册监听函数
  tap() {
    this.hooks.arch.tap("node", function (name) {
      console.log("node", name);
      return "node学得还不错";
    });

    this.hooks.arch.tap("react", function (data) {
      console.log("react", data);
    });
  }

  start() {
    this.hooks.arch.call("loki");
  }
}

let lesson = new Lesson();

// 注册这两个事件
lesson.tap();
// 启动钩子
lesson.start();
