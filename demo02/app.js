// import "babel-polyfill";
//
// let func = () => {
// };
// const NUM = 45;
// let arr = [1, 2, 4, 4];
// let arrB = arr.map(item => item * 2);
//
// console.log(arrB.includes(8));
// console.log("new Set(arrB) is ", new Set(arrB));

// import {fetchUtils} from './utils';
import * as fetchUtils from './utils/fetch-utils';

console.log('fetchUtils.request()');
fetchUtils.request();
