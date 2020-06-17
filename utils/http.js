function request(url, callBack) {
  wx.request({
    url: url,
    header: {
      "Content-Type": "json"
    },
    success(res) {
      callBack(res.data)
    }

  })
}

function requestMovie(url, key, title, callBack) {
  wx.request({
    url: url,
    header: {
      "Content-Type": "json"
    },
    success(res) {
      callBack(res.data, key, title)
    }
  })
}

module.exports = {
  request,
  requestMovie
}