/**
 * name: util.js
 * author: wangquanyou
 * describe: 通用方法
 */

let util = {
  //判断数据是否有效，有效返回true
  dataIsValid: function(data){
    if(data != null && data != undefined) {
      return true;
    }
    return false;
  },
}

module.exports = util;