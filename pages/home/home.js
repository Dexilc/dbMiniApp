// pages/home.js
let app = getApp()
// let http = require('../../utils/http.js')
let global = app.globalData
let url = global.url
let apikey = global.apikey
let theaters = global.theaters
let newMovie = global.newMovie
let top250 = global.top250
let weekly = global.weekly
let us_box = global.us_box
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [{
        title: '影院热映',
        url: url + theaters + '?apikey=' + apikey,
        movies: []
      }, {
        title: '新片榜',
        url: url + newMovie + '?apikey=' + apikey,
        movies: []
      }, {
        title: 'Top250',
        url: url + top250 + '?apikey=' + apikey,
        movies: []
      }, {
        title: '口碑榜',
        url: url + weekly + '?apikey=' + apikey,
        movies: []
      }, {
        title: '北美票房榜',
        url: url + us_box + '?apikey=' + apikey,
        movies: []
      },

    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // http.request(url+newMovie+apikey,this.getHttp)    
    // http.requestMovie(url + us_box + strEnd + apikey, 'us_box', "北美票房榜", this.getHttp)
    app.loadCity(this.loadData)

  },
  // getHttp(res, key, title) {
  //   // console.log(res, key, title)
  //   this.data.list[key] = {
  //     title: title,
  //     movie: res
  //   }
  //   this.setData({
  //     list: this.data.list
  //   })
  //   console.log(this.data.list)
  // },  
  loadData: function(city) {
    for (let index = 0; index < this.data.list.length; index++) {
      wx.request({
        url: this.data.list[index].url,
        data: index == 0 ? {
          city: city
        } : {},
        header: {
          'content-type': 'json'
        },
        success: (result) => {
          const movies = result.data.subjects
          let obj = this.data.list[index]
          obj.movies = [];
          for (let idx = 0; idx < movies.length; idx++) {
            let movie = movies[idx].subject || movies[idx]
            app.updateMovie(movie)
            obj.movies.push(movie)
          }
          this.setData(this.data)
          wx.setStorage({
            key: obj.title,
            data: obj.movies
          });
        },
        fail: () => {
          wx.showToast({
            icon: 'none',
            title: '获取正在热映信息失败'
          })
        }
      });

    }

  },
  // 搜索
  toSearch() {
    wx.navigateTo({
      url: '/pages/search/search'
    })
  },



  detail(e) {
    // console.log(e)
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/detail/detail?id=' + id
    })
  },
  viewMore: function(event) {
    const index = event.currentTarget.id;
    const obj = this.data.list[index];
    wx.navigateTo({
      url: `/pages/more/more?title=${obj.title}&url=${obj.url}`
    });

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