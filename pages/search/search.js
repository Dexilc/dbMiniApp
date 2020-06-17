// pages/search/search.js
let app = getApp()
let http = require('../../utils/http.js')
// let global = app.globalData
// let url = global.url
// let apikey = global.apikey
// let search = global.search
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },
  detail(e) {
    // console.log(e)
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/detail/detail?id=' + id
    })
  },
  inputValue(e) {
    let val = e.detail.value
    let url = 'https://movie.douban.com/j/search_subjects?tag='
    http.request(url + val, this.getSearch)

  },
  getSearch(res) {
    // console.log(res)
    this.setData({
      searchList: res.subjects
    })
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