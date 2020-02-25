/**
 * name：httpManager.js
 * author：wangquanyou
 * describe：OCR 识别SDK网络请求管理客户端
*/

var HttpClient = require("baidu-aip-sdk").HttpClient;

class httpManager {
  setRequestOptions(){
    // 设置request库的一些参数，例如代理服务地址，超时时间等
    // request参数请参考 https://github.com/request/request#requestoptions-callback
    HttpClient.setRequestOptions({ timeout: 5000 });
  }

}

module.exports = httpManager;

