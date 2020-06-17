// pages/detail/detail.js
let app = getApp()
let http = require('../../utils/http.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '',
    image: '',
    movie_type: [],
    country: [],
    year: '',
    rating: '',
    summary: '',
    cast: [],
    data: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.showLoading({
      title: '加载中',
    })

    let global = app.globalData
    let url = global.url
    let apikey = global.apikey
    let subject = global.subject
    let id = options.id
    http.request(url + subject + id + '?apikey=' + apikey, this.getDetails)

  },
  getDetails(res) {
    // console.log(res)
    let _this = this
    _this.setData({
      title: res.title,
      image: res.image,
      movie_type: res.attrs.movie_type,
      country: res.attrs.country,
      year: res.attrs.year,
      rating: res.rating,
      summary: res.summary,
      cast: res.attrs.cast
    })
    wx.setNavigationBarTitle({
      title: this.data.title
    })
    setTimeout(function() {
      wx.hideLoading()
    }, 1500)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {


  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})