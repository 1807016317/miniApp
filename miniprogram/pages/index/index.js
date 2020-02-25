/**
 * name: index.js
 * author: wangquanyou
 * describe: 进入小程序的主页
 */
const app = getApp()
const db = require('../../util/dataBase.js')

Page({
  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl: './user-unlogin.png',
    userInfo: {},
    logged: false,
    takeSession: false,
    requestResult: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    db.onQueryAllTable('team');
    //进入小程序即向玩家申请授权
    // 可以通过 wx.getSetting 先查询一下用户是否授权了 "scope.record" 这个 scope
    let self = this;
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.record']) {
          wx.authorize({
            scope: 'scope.userInfo',
            success() {
              // 用户已经同意被获取用户信息
              console.log('get userInfo success')
            }
          })
        }
        // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
        wx.getUserInfo({
          success: res => {
            self.setData({
              avatarUrl: res.userInfo.avatarUrl,
              userInfo: res.userInfo
            })
          }
        })
      }
    })
  },

  /**
   * 跳转创建审核页面
   */
  create_verify: function() {
    //console.log(this.data.userInfo),
    wx.redirectTo({
      url: '../create_verify/create_verify',
    })
  },

  /**
   * 跳转申请审核页面
   */
  application_verify: function() {
    wx.redirectTo({
      url: '../application_verify/application_verify',
    })
  },

  /**
   * 跳转修改审核页面
   */
  change_verify: function() {
    wx.redirectTo({
      url: '../application_verify/application_verify',
    })
  },
})