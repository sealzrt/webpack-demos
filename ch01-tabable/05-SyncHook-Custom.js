/**
 * 钩子是同步的
 * 源文: https://juejin.im/post/5c5d96a1e51d457fc0574181
 */
class SyncHook {
  // args => ["name"]
  constructor() {
    this.tasks = [];
  }

  tap(name, task) {
    this.tasks.push(task);
  }

  call(...args) {
    this.tasks.forEach(task => task(...args));
  }
}

let hook = new SyncHook(["name"]);

hook.tap("react", function (name) {
  console.log("react", name);
});
hook.tap("node", function (name) {
  console.log("node", name);
});
hook.call("loki");
