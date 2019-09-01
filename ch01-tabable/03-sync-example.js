const {
  SyncHook,
  SyncWaterfallHook,
  SyncBailHook
} = require('tapable');

/**
 * 钩子的语法一般都是new 钩子类型Hook([参数名1，参数名2，参数名3])，这里的数组是只是提示你传入参数有几个，给了名字只是为了可读性，如果你想写一个别人看不懂的可以这样new SyncHook(["a","b","c"])，这里要注意这个参数名的类型是字符串。
 * 如果没有提前准备号需要传入的参数，后续挂函数的时候，就无法传入参数了。这个设计应该是为了日后好打理，告诉其他开发者，我传入的参数类型
 */
class MyDaily {
  constructor() {
    this.hooks = {
      // 普通型basic：这个比较好理解就是按照tap的注册顺序一个个向下执行。
      beforeWork: new SyncHook(["getUp"]),
      // 这个相对于basic的区别就是，虽然也是按照tap的顺序一个个向下执行，但是如果上一个tap有返回值，那么下一个tap的传入参数就是上一个tap的返回值。
      atWork: new SyncWaterfallHook(["workTask"]),
      // 这个相对于water的区别就是，如果返回了 undefined 以外的值，就不继续执行了。
      afterWork: new SyncBailHook(["activity"])
    };
  }

  tapEvent() {
    this.hooks.beforeWork.tap("putOnCloth",()=>{
      console.log("穿衣服！")
    });

    this.hooks.beforeWork.tap("getOut",()=>{
      console.log("出门！")
    });

    this.hooks.atWork.tap("makePPT",()=>{
      console.log("做PPT！")
      return "你的ppt"
    });

    this.hooks.atWork.tap("meeting",(work)=>{
      console.log("带着你的"+work+"开会！")
    });

    this.hooks.afterWork.tap("haveADate",()=>{
      console.log("约会咯！")
      return "约会真开心～"
    });

    this.hooks.afterWork.tap("goHome",()=>{
      console.log("溜了溜了！")
    });

  }

  run() {
    this.hooks.beforeWork.call();
    this.hooks.atWork.call();
    this.hooks.afterWork.call();
  }
}

const oneDay = new MyDaily();
oneDay.tapEvent();
oneDay.run();

