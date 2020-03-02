/**
 * name：ocrManager.js
 * author：wangquanyou
 * describe：OCR 网络图片识别调用入口
*/

let fs = require('fs');
let ocrSDK = require('./ocrSDK.js');

let image = fs.readFileSync("assets/example.jpg").toString("base64");
let ocrSDKClient = ocrSDK.getInstance();

class ocrManager {
  // 调用网络图片文字识别, 图片参数为本地图片
  webImage() {
    ocrSDKClient.webImage(image).then(function (result) {
      console.log(JSON.stringify(result));
    }).catch(function (err) {
      // 如果发生网络错误
      console.log(err);
    });
  }

  // 带参数调用网络图片文字识别, 图片参数为本地图片
  webImageOpt(options) {
    // 如果有可选参数
    // let options = {};
    // options["detect_direction"] = "true";
    // options["detect_language"] = "true";

    ocrSDKClient.webImage(image, options).then(function (result) {
      console.log(JSON.stringify(result));
    }).catch(function (err) {
      // 如果发生网络错误
      console.log(err);
    });
  }

  // 调用网络图片文字识别, 图片参数为远程url图片
  webImageUrl(url) {
    //let url = "https//www.x.com/sample.jpg";

    ocrSDKClient.webImageUrl(url).then(function (result) {
      console.log(JSON.stringify(result));
    }).catch(function (err) {
      // 如果发生网络错误
      console.log(err);
    });
  }

  // 带参数调用网络图片文字识别, 图片参数为远程url图片
  webImageUrlOpt(url, options) {
    // 如果有可选参数
    // let options = {};
    // options["detect_direction"] = "true";
    // options["detect_language"] = "true";

    ocrSDKClient.webImageUrl(url, options).then(function (result) {
      console.log(JSON.stringify(result));
    }).catch(function (err) {
      // 如果发生网络错误
      console.log(err);
    });
  }
}

module.exports = ocrManager;

