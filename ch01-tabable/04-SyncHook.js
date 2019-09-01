let {SyncHook} = require("tapable");

/**
 * SyncHook: 同步串行
 * 源文: https://juejin.im/post/5c5d96a1e51d457fc0574181
 */

class Lesson {
  constructor() {
    this.hooks = {
      arch: new SyncHook(["name"])
    };
  }

  // 注册监听函数
  tap() {
    this.hooks.arch.tap("node", function (name) {
      console.log("node", name);
    });
    this.hooks.arch.tap("react", function (name) {
      console.log("react", name);
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
