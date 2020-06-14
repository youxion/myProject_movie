// pages/test1/test1.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    isShow: true

  },

  // 处理点击事件 
  handleClick () {
    wx.navigateTo({
      url: '/pages/list/list'
    })

  },

  /* 获取用户数据、判断是否授权 */
  getUserData() {
    /* 判断用户是否授权,并控制授权按钮的显示、隐藏 */
    wx.getSetting({
      success: (data) => {
        console.log(data)
        console.log(data.authSetting['scope.userInfo'])

        //若已经授权，则让button隐藏；否则显示button让用户进行授权
        if (data.authSetting['scope.userInfo']) {
          this.setData({
            isShow: false
          })
        } else {
          this.setData({
            isShow: true
          })
        }
      }
    })

    /* 获取用户的登录信息 */
    wx.getUserInfo({
      success: (data) => {
        console.log(data)
        this.setData({   //存储获的数据
          userInfo: data.userInfo
        })
      },
      fail: (err) => {
        console.log(err)
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载(开始加载)
   */
  onLoad: function (options) {
    console.log("onload")
    console.log(this)
    this.getUserData()


  },

  /* 用户授权时，选择“拒绝”、“允许”时都会触发 */ 
  handleUserInfo(data){
    console.log('clicked', data)
    // console.log(data.detail.rawData)
    if (data.detail.rawData) {  //选择“允许”时有rawData，选择“拒绝”时无rawData
      this.getUserData()


    }

  },
  /**
   * 生命周期函数--监听页面显示(开始显示)
   */
  onShow: function () {
    // console.log("onShow")

  },

  /**
   * 生命周期函数--监听页面初次渲染完成（显示完成）
   */
  onReady: function () {
    // console.log("onReady")

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log("onHide")

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log("onUnload")

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