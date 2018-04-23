const api = require("../../utils/api-service.js") 


Page({
    data: {
        errorMsg: '',
        detailData: {}
    },
    onLoad: function (options) {
        wx.showLoading({
          title: '加载中...',
        })
    
        wx.hideLoading();
        // options.id
        api.getNewDetail(options.id)
          .then(res => {
            console.log(JSON.stringify(res));
            this.setData({
              detailData: res,
              errorMsg: ''
            })
          })
          .catch(res => {
            wx.hideLoading();
            console.log(res)
    
            this.setData({
              errorMsg: '请求错误, 请检查网络'
            })
          })
      },

})