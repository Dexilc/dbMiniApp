// pages/more/more.js
let app = getApp()
let http = require('../../utils/http.js')
let global = app.globalData
let apikey = global.apikey
Page({

  /**
   * 页面的初始数据
   */
  data: {

    movies: [],
    start: 0,
    count: 20,
    newUrl: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.showLoading({
      title: '加载中',
    })

    wx.getStorage({
      key: options.title,
      success: (result) => {
        this.data.movies = result.data;
        this.data.title = options.title;
        this.data.newUrl = options.url;
        this.setData(this.data)
      },
    });
    wx.setNavigationBarTitle({
      title: options.title
    });
    setTimeout(function() {
      wx.hideLoading()
    }, 1500)

  },
  getMore(res) {
    // console.log(res)
    if (!res.total) return
    wx.showLoading({
      title: '加载中',
    })
    const movies = res.subjects
    let tplMore = []
    for (let idx = 0; idx < movies.length; idx++) {
      let movie = movies[idx].subject || movies[idx]
      app.updateMovie(movie)
      tplMore.push(movie)
    }

    if (this.data.start > 0) {
      tplMore = this.data.movies.concat(tplMore);
    } else {
      tplMore = this.data.movies

    }
    this.data.start += this.data.count
    this.setData({
      movies: tplMore
    })
    setTimeout(function() {
      wx.hideLoading()
    }, 1500)

  },
  loadMore() {

    let url = this.data.newUrl + '?start=' + this.data.start + '&count' + this.data.count + '&apikey=' + apikey
    http.request(url, this.getMore)


  },
  detail(e) {
    // console.log(e)
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/detail/detail?id=' + id
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