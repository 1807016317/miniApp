/**
 * name: create_verify.js
 * author: wangquanyou
 * describe: 创建战队审核
 */
//import db from '../../util/dataBase.js'
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
    dangradingArray: [], //用于选择器显示的段位参数
    datagArray: [], //从数据库取到的所有段位参数
    dangradingIndex: [0, 0, 0], //段位选择器列数
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let data = [];
    //存入数据库取出的所有段位参数，去除最后一位 _id 参数
    this.setData({
      datagArray: Object.values(JSON.parse(db.data.queryResult))
    });
    this.data.datagArray.pop();
    //遍历所有段位参数，将用于显示的段位参数取出，选择条件可优化
    this.data.datagArray.forEach((element, index) => {
      if (index == 0 || index == 1 || index == 9) {
        data.push(element);
        this.setData({
          dangradingArray: Object.values(JSON.parse(JSON.stringify(data, null, 0)))
        });
      }
    })
    console.log(this.data.datagArray)
  },

  //区服选择
  bindSystemPickerChange: function(e) {
    console.log('区服选择改变，携带值为', e.detail.value)
    this.setData({
      systemIndex: e.detail.value
    })
  },

  bindSystemPickerColumnChange: function(e) {
    console.log('区服修改的列为', e.detail.column, '，值为', e.detail.value);
    let data = {
      systemArray: this.data.systemArray,
      systemIndex: this.data.systemIndex
    };
    data.systemIndex[e.detail.column] = e.detail.value;
    console.log(data.systemIndex);
    this.setData(data);
  },

  //段位选择
  bindDanPickerChange: function(e) {
    console.log('段位选择改变，携带值为', e.detail.value)
    this.setData({
      dangradingIndex: e.detail.value
    })
  },

  //段位选择器列选择参数发生改变时
  bindDanPickerColumnChange: function(e) {
    console.log(this.data.dangradingArray)
    console.log('段位修改的列为', e.detail.column, '，值为', e.detail.value);
    let data = {
      dangradingArray: this.data.dangradingArray,
      dangradingIndex: this.data.dangradingIndex
    };
    data.dangradingIndex[e.detail.column] = e.detail.value;
    switch (e.detail.column) {
      case 0:
        switch (data.dangradingIndex[0]) {
          case 0:
            data.dangradingArray[1] = this.data.datagArray[1];
            data.dangradingArray[2] = this.data.datagArray[9];
            break;
          case 1:
            data.dangradingArray[1] = this.data.datagArray[2];
            data.dangradingArray[2] = this.data.datagArray[9];
            break;
          case 2:
            data.dangradingArray[1] = this.data.datagArray[3];
            data.dangradingArray[2] = this.data.datagArray[8];
            break;
          case 3:
            data.dangradingArray[1] = this.data.datagArray[4];
            data.dangradingArray[2] = this.data.datagArray[7];
            break;
          case 4:
            data.dangradingArray[1] = this.data.datagArray[5];
            data.dangradingArray[2] = this.data.datagArray[7];
            break;
          case 5:
            data.dangradingArray[1] = this.data.datagArray[6];
            data.dangradingArray[2] = this.data.datagArray[7];
            break;
          case 6:
            data.dangradingArray[1] = [];
            data.dangradingArray[2] = this.data.datagArray[10];
          case 7:
            data.dangradingArray[1] = [];
            data.dangradingArray[2] = this.data.datagArray[10];
            break;
        }
        data.dangradingIndex[1] = 0;
        data.dangradingIndex[2] = 0;
        break;
    }
    console.log(data.dangradingIndex);
    this.setData(data);
  },

})