// pages/lsit/list.js
let datas = require('../data/data.js')
// console.log(datas, typeof datas)

Page({

  /**
   * 页面的初始数据
   */
  data: {
    listArr: []

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    this.setData({
      listArr: datas.list_data.ratings
    })

  },

  // 点击跳转到详情页面
  toDetail (event) {
    console.log(event)
    let index = event.currentTarget.dataset.index; // currentTarget的index是系统生成的。

    // 跳转到目标页面时，会将url问号后面的参数一起传给目标页面的options（在onLoad函数里面）
    wx.navigateTo({ //会把旧页面隐藏（触发onHide周期函数），载入新页面，还可以返回旧页面
      url: "/pages/detail/detail?index=" + index
    })
  },

  //点击轮播图时，跳转到详情页。 
  swipperToDetial (event) {
    console.log(event)
    let index = event.target.dataset.index; //target的index是自定义的
    wx.navigateTo({
      url: "/pages/detail/detail?index=" + index
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})