const {
  AsyncParallelHook,
  AsyncParallelBailHook,
  AsyncSeriesHook,
  AsyncSeriesBailHook,
  AsyncSeriesWaterfallHo
} = require("tapable");

/**
 * 异步并行
 * 当注册的所有异步回调都并行执行完毕之后再执行 callAsync 或者 promise 中的函数
 */
function testAsyncParallelHook() {

  const hook = new AsyncParallelHook(['name']);
  console.time('cost');

  hook.tapAsync('hello', (name, cb) => {
    setTimeout(() => {
      console.log(`hello ${name}`);
      cb();
    }, 2000);
  });

  hook.tapPromise('hello again', (name) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(`hello ${name}, again`);
        resolve();
      }, 1000);
    });
  });

  // 通过 callAsync 方式 触发回调事件
  // hook.callAsync('ahonn', () => {
  //   console.log('done');
  //   console.timeEnd('cost');
  // });

  // 或者通过 hook.promise() 触发回调事件
  hook.promise('ahonn').then(() => {
    console.log('done');
    console.timeEnd('cost');
  });
}

/**
 * 异步串行
 */
function testAsyncSeriesHook(){
  const hook = new AsyncSeriesHook(['name']);

  console.time('cost');

  hook.tapAsync('hello', (name, cb) => {
    setTimeout(() => {
      console.log(`hello ${name}`);
      cb();
    }, 2000);
  });

  hook.tapPromise('hello again', (name) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(`hello ${name}, again`);
        resolve();
      }, 1000);
    });
  });

  hook.callAsync('ahonn', () => {
    console.log('done');
    console.timeEnd('cost');
  });

  // // 或者通过 hook.promise() 触发回调事件
  // hook.promise('ahonn').then(() => {
  //   console.log('done');
  //   console.timeEnd('cost');
  // });
}

// 异步并行
// testAsyncParallelHook();

// 异步串行
testAsyncSeriesHook();

