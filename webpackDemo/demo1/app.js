// es6
import sun from './sun'

// commonjs
let minus = require('./minus')

console.log('sun(222, 333) = ', sun(222, 333))

console.log('minus(11, 2) = ', minus(11, 2))

// amd -- 打包后会单独一个模块，因为amd是异步调用
require(['./muti'], function (muti) {
    console.log('muti(2, 3) = ', muti(2, 3))
})