let { SyncBailHook } = require("tapable");

/**
 * SyncBailHook为同步串行的执行关系，只要监听函数中有一个函数的返回值不为 undefined，则跳过剩下所有的逻辑
 * 源文: https://juejin.im/post/5c5d96a1e51d457fc0574181
 */
class Lesson {
  constructor() {
    this.hooks = {
      arch: new SyncBailHook(["name"])
    };
  }
  // 注册监听函数
  tap() {
    this.hooks.arch.tap("node", function(name) {
      console.log("node", name);
      // return "stop";
      return undefined;
    });
    this.hooks.arch.tap("react", function(name) {
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
