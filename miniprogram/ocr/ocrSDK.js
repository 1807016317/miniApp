/**
 * name：ocrSDK.js
 * author：wangquanyou
 * describe：OCR 识别SDK接入客户端入口
*/
let AipOcrClient = require("baidu-aip-sdk").ocr;
let util = require('../util/util.js');

class ocrSDK {
  // 设置APPID/AK/SK
  APP_ID = "18560748";
  API_KEY = "jv70OtWpBTyV5OWVm8PGcoNw";
  SECRET_KEY = "rT51vyL9qjnb7ftKDhup5kGwREm7fRzn";
  instance = null;

  // 新建一个对象，建议只保存一个对象调用服务接口-单例
  getInstance() {
    return function () {
      if (!util.dataIsValid(instance)) {
        instance = new AipOcrClient(APP_ID, API_KEY, SECRET_KEY);
      }
      return instance;
    }
  };
}

module.exports = ocrSDK;
