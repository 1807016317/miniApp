/**
 * name: application_verify.js
 * author: wangquanyou
 * describe: 申请战队审核
 */
const db = require('../../util/dataBase.js')
const app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    systemArray: [
      ["iOS", "Android"],
      ["QQ", "微信"]
    ],
    systemIndex: [0, 0], //系统选择器列表
    teamArray: [], //用于选择器显示的战队
    teamIndex: [0], //战队选择器类
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let data = [];
    //存入数据库取出的所有段位参数，去除最后一位 _id 参数
    data = Object.values(JSON.parse(db.data.queryResult['team']));
    data.pop();
    this.setData({
      teamArray: data
    });
  },

  //区服选择
  bindSystemPickerChange: function (e) {
    console.log('区服选择改变，携带值为', e.detail.value)
    this.setData({
      systemIndex: e.detail.value
    })
  },

  bindSystemPickerColumnChange: function (e) {
    console.log('区服修改的列为', e.detail.column, '，值为', e.detail.value);
    let data = {
      systemArray: this.data.systemArray,
      systemIndex: this.data.systemIndex
    };
    data.systemIndex[e.detail.column] = e.detail.value;
    console.log(data.systemIndex);
    this.setData(data);
  },

  //战队选择
  bindTeamPickerChange: function (e) {
    console.log('战队选择改变，携带值为', e.detail.value)
    this.setData({
      teamIndex: e.detail.value
    })
  },

  // 上传图片
  doUpload: function () {
    // 选择图片
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {

        wx.showLoading({
          title: '上传中',
        })

        const filePath = res.tempFilePaths[0]

        // 上传图片
        const cloudPath = 'my-image' + filePath.match(/\.[^.]+?$/)[0]
        wx.cloud.uploadFile({
          cloudPath,
          filePath,
          success: res => {
            console.log('[上传文件] 成功：', res)

            app.globalData.fileID = res.fileID
            app.globalData.cloudPath = cloudPath
            app.globalData.imagePath = filePath

            wx.navigateTo({
              url: '../storageConsole/storageConsole'
            })
          },
          fail: e => {
            console.error('[上传文件] 失败：', e)
            wx.showToast({
              icon: 'none',
              title: '上传失败',
            })
          },
          complete: () => {
            wx.hideLoading()
          }
        })

      },
      fail: e => {
        console.error(e)
      }
    })
  },

})