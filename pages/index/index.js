
const api = require("../../utils/api-service.js") 
const NEWS_TYPE = ["gn", "gj", "cj", "yl", "js", "ty", "other"]
const TAB_LIST = [
  {
    id: 0,
    title: '国内'
  },
  {
    id: 1,
    title: '国际'
  },
  {
    id: 2,
    title: '财经'
  },
  {
    id: 3,
    title: '娱乐'
  },
  {
    id: 4,
    title: '军事'
  },
  {
    id: 5,
    title: '体育'
  },
  {
    id: 6,
    title: '其他'
  }
]



Page( {
  data: {
    tablist: {
      list : TAB_LIST,
      selectedId: 0
    },
    newsList: [],
    errorMsg: ''
  },
  handleZanTabChange(e) {
    console.log("handleZanTabChange");
    console.log(JSON.stringify(e));
    var selectedId = e.detail;
    this.getNewsList(selectedId);

  }, 
  getNewsList(id) {
    wx.showLoading({
      title: '加载中...',
    })

    api.getNewsList(NEWS_TYPE[id])
      .then(res => {
        wx.hideLoading();
        // console.log(JSON.stringify(res));
        this.setData({
          newsList: res,
          errorMsg: ''
        })
      })
      .catch(res => {
        wx.hideLoading();
        console.log(res)

        that.setData({
          errorMsg: '请求错误, 请检查网络'
        })
      })
  },
  onLoad: function () {
    const that = this;

    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }
    });
    this.getNewsList(0);
  },
  onTap: function(index) {
    console.log(index.currentTarget.dataset.index);
  }


})