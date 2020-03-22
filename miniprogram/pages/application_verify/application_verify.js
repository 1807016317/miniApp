/**
 * name: application_verify.js
 * author: wangquanyou
 * describe: 申请战队审核
 */
import { $init, $digest } from '../../util/utils/common.util'
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
    teamInfo: [],
    imgUrl: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    $init(this);
    let data = [];
    //存入数据库取出的所有战队参数
    this.data.teamInfo = db.data.promiseValue['team'];
    console.log('数据类型', typeof (this.data.teamInfo))  
    this.data.teamInfo.forEach((element, index) => {
      data.push(element['_id'])
    })
    this.setData({
      teamArray: data
    });
    console.log('this.data.teamArray', this.data.teamArray)
    console.log('this:', this)
  },

  //拉取战队信息
  onQueryTeamTable() {
    let self = this;
    console.log('战队数据解析json', data);
  },

  //区服选择
  bindSystemPickerChange: function(e) {
    console.log('区服选择改变，携带值为', e.detail.value)
    this.setData({
      systemIndex: e.detail.value
    })
  },

  bindSystemColumnChange: function(e) {
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
  bindTeamPickerChange: function(e) {
    console.log('战队选择改变，携带值为', e.detail.value)
    this.setData({
      teamIndex: e.detail.value
    })
  },

  // 选择图片
  doUpload: function() {
    let self = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        console.log('res.tempFilePaths:', res.tempFilePaths)
        
        self.data.imgUrl.push(res.tempFilePaths[0])
        const filePath = res.tempFilePaths[0]
        console.log('imgUrl:', self.data.imgUrl)
        // 上传图片
        const cloudPath = 'my-image' + filePath.match(/\.[^.]+?$/)[0]
        console.log('cloudPath:', cloudPath)
        $digest(this);
      },
      fail: e => {
        console.error(e)
      }
    })
  },

  //上传图片
  upLoadImg() {
    wx.cloud.uploadFile({
      cloudPath,
      filePath,
      success: res => {
        wx.showLoading({
          title: '上传中',
        })
        console.log('[上传文件] 成功：', res)

        // app.globalData.fileID = res.fileID
        // app.globalData.cloudPath = cloudPath
        // app.globalData.imagePath = filePath

        // wx.navigateTo({
        //   url: '../storageConsole/storageConsole'
        // })
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

})