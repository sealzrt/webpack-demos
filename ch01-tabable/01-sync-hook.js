const {SyncHook, SyncBailHook, SyncWaterfallHook, SyncLoopHook} = require('tapable');

/**
 * 同步 串行
 */
function testSyncHook() {

  const hook = new SyncHook(['name']);

  /**
   * 注册事件监听
   */
  hook.tap('hello', (name) => {
    console.log(`hello ${name}`);
  });

  /**
   * 注册事件监听
   */
  hook.tap('hello again', (name) => {
    console.log(`hello ${name}, again`);
  });

  /**
   * 触发回调事件
   */
  hook.call('jay');
}

/**
 * 类似于 SyncHook, 执行过程中注册的回调返回非 undefined 时就停止不在执行
 */
function testSyncBailHook() {
  /**
   * 类似于 SyncHook, 执行过程中注册的回调返回非 undefined 时就停止不在执行
   */
  const hook = new SyncBailHook(['name']);
  /**
   * 注册事件监听
   */
  hook.tap('hello', (name) => {
    console.log(`hello ${name}`);
    return undefined;
  });

  /**
   * 注册事件监听
   */
  hook.tap('hello again', (name) => {
    console.log(`hello ${name}, again`);
  });

  /**
   * 触发回调事件
   */
  hook.call('jay');
}

/**
 * 接受至少一个参数，上一个注册的回调返回值会作为下一个注册的回调的参数
 */
function testSyncWaterfallHook() {
  /**
   * 接受至少一个参数，上一个注册的回调返回值会作为下一个注册的回调的参数
   */
  const hook = new SyncWaterfallHook(['name']);
  /**
   * 注册事件监听
   */
  hook.tap('hello', (name) => {
    const message = `hello ${name}`;
    console.log(message);
    return message;
  });

  /**
   * 注册事件监听
   */
  hook.tap('hello again', (message) => {
    console.log(`receive: ${message}`);
  });

  /**
   * 触发回调事件
   */
  hook.call('jay');
}

let count = 0;

/**
 * 有点类似 SyncBailHook，但是是在执行过程中回调返回非 undefined 时继续再次执行当前的回调
 */
function testSyncLoopHook() {
  /**
   * 有点类似 SyncBailHook，但是是在执行过程中回调返回非 undefined 时继续再次执行当前的回调
   */
  const hook = new SyncLoopHook(['name']);
  /**
   * 注册事件监听
   */
  hook.tap('hello', (name) => {
    const message = `hello ${name}`;
    console.log(message);

    if (count < 10) {
      count++;
      return message;
    }

    return undefined;

  });

  /**
   * 注册事件监听
   */
  hook.tap('hello again', (message) => {
    console.log(`receive: ${message}`);
  });

  /**
   * 触发回调事件
   */
  hook.call('jay');
}

// 同步串行
// testSyncHook();

// 同步串行 可终止
// testSyncBailHook();

// 同步串行 并传递数据
// testSyncWaterfallHook();

// 同步串行 可重复执行
// testSyncLoopHook();

