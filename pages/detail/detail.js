// pages/detail/detail.js
let datas = require('../data/data.js')
let appDatas = getApp(); // 获取app.js的data里面的数据
console.log(appDatas)

Page({
  /**
   * 页面的初始数据
   */
  data: {
    detailObj: {},
    index: null,
    isCollected: false,
    isMusicPlay: false,
    isPlayBg: false

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    // options里面存储着url问号后面的内容，接收的是源页面传递过来的参数。
    // 如：url: "/pages/detail/detail?index=" + value 
    //     若value为2，则options为一个数据对象{index: 2}

    let index = options.index;
    this.setData({
      detailObj: datas.list_data.ratings[index],
      index: index
    });

    let detailStorage = wx.getStorageSync("isCollected")
    console.log(detailStorage, typeof detailStorage)

    //若本地无收藏的数据对象，则新建一个
    if (!detailStorage) { //0, 空、null、undifined取反后都是true，
      wx.setStorageSync("isCollected", {})
    }
    
    //用户收藏过且值为true，则显示收藏
    if (detailStorage[index]) { //若detailStorage[index]的值为undifined，则没收藏 
      this.setData({
        isCollected: true
      })  
    }

    // 监听音乐播放,按音乐播放时触发
    wx.onBackgroundAudioPlay(() => {
      console.log('play');
      this.setData({ //让网页播放器的按钮与系统播放器的按钮同步显示
        isMusicPlay: true
      });

      // 修改app.js里面的data
      appDatas.data.isPlay = true;
      appDatas.data.pageIndex = index;
    })

    // 点击进入到datail页面时，判断本"页面的音乐"是否在播放
    if (appDatas.data.isPlay && appDatas.data.pageIndex === index) {
      this.setData({  //让网页播放器的按钮与系统播放器的按钮同步显示
        isMusicPlay: true,
        isPlayBg: true
      })
    }


    // 监听音乐暂停，按音乐暂停时触发
    wx.onBackgroundAudioPause(() => {
      console.log('pause')
      this.setData({ //让网页播放器的按钮与系统播放器的按钮同步显示
        isMusicPlay: false
      })

      appDatas.data.isPlay = false;
    })
  },
  
  /* 处理收藏和未收藏的状态 */
  handleCollect() {
    console.log(this)

    // 注意：在data里面定义的数据，一定要在this后面加data才能取到。
    let isCollected = !this.data.isCollected; 
    this.setData({
      isCollected
    })

    // 提示用户收藏成功
    let title = isCollected ? '收藏成功' : '取消收藏';
    wx.showToast({
      title,
      icon: "success",
      duration: 2000  //提示消息的持续时间
    }) 

    let { index } = this.data; //data对象里面有一个index属性，index为被点击图像的索引
    wx.getStorage({
      key: 'isCollected',
      success: (datas) => { //datas里面为读取到的数据
        console.log(datas, "datadatas")
       let obj = datas.data;

        //若obj中的index已经存在，则修改对应的数据;否则在obj中新增一条数据
        obj[index] = isCollected;

        wx.setStorage({
          key: 'isCollected',
          data: obj,
          success: () => {
            console.log("缓存成功");
          } 
        }) 
      }
    })
  },

  /* 处理背景音乐播放 */
  handleMusic() {
    let isMusicPlay = !this.data.isMusicPlay;
    this.setData({
      isMusicPlay
    })

    //播放音乐
    if (isMusicPlay) {
      wx.playBackgroundAudio({
        dataUrl: 'http://music.163.com/song/media/outer/url?id=1305187415.mp3',
        title: "音乐测试"
      }) 
    } else { //暂停音乐
      wx.pauseBackgroundAudio();
    }
    
    // 处理播放音乐的背景图片
    // this.data.isPlayBg = true; 不能直接修改data里面的数据，必须要用中间变量进行保存
    let isPlayBg = this.data.isPlayBg = true;
    this.setData({
      isPlayBg
    })
  },

  /* 设置分享功能，用企业号才能分享出去 */
  handleShare() {
    wx.showActionSheet({
      itemList: ["分享到朋友圈", "分享到微博", "分享到qq空间"]
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