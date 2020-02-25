// pages/util/dataBase.js
/**
 * name: dataBase.js
 * author: wangquanyou
 * 描述：数据库管理池
 */
const db = wx.cloud.database()
const app = getApp()
const util = require('./util.js')

let dataBase = {

  data: {
    step: 1,
    counterId: '',
    openid: '',
    count: null,
    queryResult: JSON,
    promiseValue: [],
  },

  constructor() {
    if (app.globalData.openid) {
      this.setData({
        openid: app.globalData.openid
      })
    }
  },

  //新增
  //collection：集合
  //obj：需要解析成json的对象
  onAdd(collection, obj) {
    let jsonStr = JSON.stringify(obj, null, 0);
    let tableId = obj.teamNameStr;
    console.log(jsonStr);
    db.collection(collection).add({
      data: {
        _id: tableId,
        jsonStr
      },
      success: res => {
        // 在返回结果中会包含新创建的记录的 _id
        // this.setData({
        //   counterId: res._id,
        //   count: 1
        // })
        wx.showToast({
          title: '创建成功',
        })
        console.log('[数据库] [新增记录] 成功，记录 _id: ', res._id)
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '创建失败：-1'
        })
        console.error('[数据库] [新增记录] 失败：', err)
      }
    })
  },

  //通过ID查询指定Table
  //collection：集合
  //id：记录表的 _id
  onQueryById(collection, id) {
    // 1、查询指定的 table
    db.collection(collection).doc(id).get({
      success: res => {
        this.data.queryResult[id] = JSON.stringify(res.data, null, 0)
        console.log('[数据库] [查询记录] 成功：', res)
      },
      fail: err => {
         wx.showToast({
           icon: 'none',
           title: '访问失败：-2'
         })
        console.error('[数据库] [查询记录] 失败：', err)
      }
    })
  },

  //查询整个集合
  async _onQueryCollection(collection) {
    // 2、查询整个集合
    const MAX_LIMIT = 100;
    
    const tasks = []; // 承载所有读操作的 promise 的数组
    
    let queryResult = []; //存放数据库返回的table

    // 先取出集合记录总数
    const countResult = await db.collection(collection).count();
    const total = countResult.total;
    // 计算需分几次取
    const batchTimes = Math.ceil(total / MAX_LIMIT);
    for (let i = 0; i < batchTimes; i++) {
      const promise = db.collection(collection).skip(i * MAX_LIMIT).limit(MAX_LIMIT).get();
      tasks.push(promise);
    }
    if(tasks.length == 0) {
      return;
    }
    // 等待所有
    queryResult = (await Promise.all(tasks)).reduce((acc, cur) => {
      console.log('acc', acc, 'cur', cur);
      return {
        data: acc.data.concat(cur.data),
        errMsg: acc.errMsg,
      }
    })
    console.log('查询成功，战队资料为：');
    return queryResult.data;
  },

  //解析异步promis参数
  onQueryAllTable(collection) {
    let self = this;
    let promiseData = this._onQueryCollection(collection);
    Promise.resolve(promiseData).then((res) => {
      self.data.promiseValue[collection] = res
      console.log('promiseValue', self.data.promiseValue)
    })
  },

  //修改
  onCounterInc() {
    const newCount = this.data.count + 1
    db.collection('counters').doc(this.data.counterId).update({
      data: {
        count: newCount
      },
      success: res => {
        this.setData({
          count: newCount
        })
      },
      fail: err => {
        icon: 'none',
        console.error('[数据库] [更新记录] 失败：', err)
      }
    })
  },

  onCounterDec() {
    const newCount = this.data.count - 1
    db.collection('counters').doc(this.data.counterId).update({
      data: {
        count: newCount
      },
      success: res => {
        this.setData({
          count: newCount
        })
      },
      fail: err => {
        icon: 'none',
        console.error('[数据库] [更新记录] 失败：', err)
      }
    })
  },

  //删除
  onRemove() {
    if (this.data.counterId) {
      db.collection('counters').doc(this.data.counterId).remove({
        success: res => {
          wx.showToast({
            title: '删除成功',
          })
          this.setData({
            counterId: '',
            count: null,
          })
        },
        fail: err => {
          wx.showToast({
            icon: 'none',
            title: '删除失败',
          })
          console.error('[数据库] [删除记录] 失败：', err)
        }
      })
    } else {
      wx.showToast({
        title: '无记录可删，请见创建一个记录',
      })
    }
  },

  nextStep() {
    // 在第一步，需检查是否有 openid，如无需获取
    if (this.data.step === 1 && !this.data.openid) {
      wx.cloud.callFunction({
        name: 'login',
        data: {},
        success: res => {
          app.globalData.openid = res.result.openid
          this.setData({
            step: 2,
            openid: res.result.openid
          })
        },
        fail: err => {
          wx.showToast({
            icon: 'none',
            title: '获取 openid 失败，请检查是否有部署 login 云函数',
          })
          console.log('[云函数] [login] 获取 openid 失败，请检查是否有部署云函数，错误信息：', err)
        }
      })
    } else {
      const callback = this.data.step !== 6 ? function() {} : function() {
        console.group('数据库文档')
        console.log('https://developers.weixin.qq.com/miniprogram/dev/wxcloud/guide/database.html')
        console.groupEnd()
      }

      this.setData({
        step: this.data.step + 1
      }, callback)
    }
  },

  prevStep() {
    this.setData({
      step: this.data.step - 1
    })
  },

  goHome() {
    const pages = getCurrentPages()
    if (pages.length === 2) {
      wx.navigateBack()
    } else if (pages.length === 1) {
      wx.redirectTo({
        url: '../index/index',
      })
    } else {
      wx.reLaunch({
        url: '../index/index',
      })
    }
  }

}
module.exports = dataBase