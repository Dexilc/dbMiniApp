//app.js
App({
  onLaunch: function() {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  loadCity(cityCallBack) {
    wx.getLocation({
      success: (resLocation) => {
        wx.request({
          url: 'https://api.map.baidu.com/reverse_geocoding/v3',
          data: {
            output: 'json',
            coordtype: 'wgs84ll',
            ak: 'TQYhxPRUI6BVI4ITHCpZ2IN0PQbWtFLM',
            location: resLocation.latitude + ',' + resLocation.longitude
          },
          success(res) {
            let city = res.data.result.addressComponent.city
            city = city.substring(0, city.length - 1)
            cityCallBack && cityCallBack(city)
          },
          fail() {
            wx.showToast({
              icon: 'none',
              title: '获取城市信息失败'
            })
          }
        })
      },
      fail: () => {
        wx.showToast({
          icon: 'none',
          title: '获取位置信息失败'
        })
      }
    })
  },
  updateMovie(movie) {
    let stars = parseInt(movie.rating.stars);
    if (stars == 0) return;
    movie.stars = {}
    movie.stars.on = stars % 10 == 0 ? stars / 10 : stars / 10 - 0.5
    movie.stars.half = stars % 10 == 0 ? 0 : 1
    movie.stars.off = movie.stars.half == 0 ? 5 - movie.stars.on : 3 - movie.stars.on
  },
  globalData: {
    userInfo: null,
    url: "https://api.douban.com/v2",
    apikey: "0b2bdeda43b5688921839c8ecb20399b",
    newMovie: "/movie/new_movies", //新片榜
    theaters: '/movie/in_theaters', //正在热映
    top250: '/movie/top250', //top250
    weekly: '/movie/weekly', //口碑榜
    us_box: '/movie/us_box', //北美票房榜
    subject: '/movie/', //详情
    search: '/movie/search', //搜索
  }
})