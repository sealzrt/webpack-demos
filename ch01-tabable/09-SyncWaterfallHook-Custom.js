// 钩子是同步的
class SyncWaterfallHook {
  // args => ["name"]
  constructor() {
    this.tasks = [];
  }

  tap(name, task) {
    this.tasks.push(task);
  }

  call(...args) {
    let [first, ...others] = this.tasks;
    let ret = first(...args);
    others.reduce((prevVal, task) => {
      return task(prevVal);
    }, ret);
  }
}

let hook = new SyncWaterfallHook(["name"]);

hook.tap("react", function (name) {
  console.log("react", name);
  return "react ok";
});

hook.tap("node", function (data) {
  console.log("node", data);
  return "node ok";
});

hook.tap("webpack", function (data) {
  console.log("webpack", data);
});

hook.call("loki");
