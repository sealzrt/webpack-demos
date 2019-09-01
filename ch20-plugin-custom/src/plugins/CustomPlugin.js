/**
 * 自定义Plugin
 *
 * Compiler 对象包含了 Webpack 环境所有的的配置信息，包含 options，loaders，plugins 这些信息，
 * 这个对象在 Webpack 启动时候被实例化，它是全局唯一的，可以简单地把它理解为 Webpack 实例
 * Compiler 代表了整个 Webpack 从启动到关闭的生命周期
 *
 * Compilation 对象包含了当前的模块资源、编译生成资源、变化的文件等。当 Webpack 以开发模式运行时，每当检测到一个文件变化，一次新的 Compilation 将被创建。
 * Compilation 对象也提供了很多事件回调供插件做扩展。通过 Compilation 也能读取到 Compiler 对象
 * Compilation 只是代表了一次新的编译
 */
class CustomPlugin {
  constructor(options) {
    this.options = options;
  }

  apply(compiler) {
    // console.log('compiler.keys', Object.keys(compiler));
    //
    // for (let key of Object.keys(compiler)) {
    //   console.log(`================================================================================`);
    //   const val = compiler[key];
    //   const valType = Object.prototype.toString.call(val);
    //   console.log(`compiler.${key} :`, valType);
    //
    //
    //   if (Object.prototype.toString.call(val) === '[object Object]') {
    //     console.log('对象: ', Object.keys(val));
    //   }else if(valType === '[object Function]'){
    //     console.log('函数', key, 'fun');
    //   }
    //   else {
    //     console.log('其他', key, val);
    //   }
    // }

    console.log(`================================================================================`);
    console.log(`================================================================================`);
    console.log(`================================================================================`);

    // 同步钩子
    compiler.hooks.compilation.tap('CustomPlugin', compilation => {
      console.log('以同步方式触及 compilation 钩子。');
      console.log(Object.keys(compilation));
    });

    // 异步钩子
    compiler.hooks.run.tapAsync('CustomPlugin', (compilation, callback) => {
      setTimeout(() => {
        console.log(111111, 'run.tapAsync()');
        console.log(Object.keys(compilation));

        callback();
      }, 1000);
    });

    // 异步钩子
    compiler.hooks.run.tapPromise('CustomPlugin', (compilation) => {
      return new Promise(resolve => setTimeout(resolve, 1000)).then(() => {
        console.log(222222, 'run.tapPromise()');
        console.log(Object.keys(compilation));
      });
    });

    // 异步钩子
    compiler.hooks.run.tapPromise('CustomPlugin', async (compilation) => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log(333333, 'run.tapPromise(), async');
      console.log(Object.keys(compilation));
    });
  }
}

module.exports = CustomPlugin;
