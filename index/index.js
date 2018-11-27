Page({
  data: {
    appear: false,
    nav: ['测试1', '测试测试测试2', '测试3', '测试测试4', '测试5', '测试6', '测试7', '测试8'],
    activeIdx: 0,
    systemInfo: '',
    moveParams: {
      scrollLeft: 0
    }
  },
  onLoad() {
    var that = this;
    wx.getSystemInfo({
      success: function(res) {
        let moveParams = that.data.moveParams
        moveParams.screenHalfWidth = res.screenWidth/2;
        that.setData({
          systemInfo: res
        })
      },
    })
  },

  choseNav: function(e) {
    let ele = 'ele' + e.target.dataset.index
    this.setData({
      activeIdx: e.target.dataset.index
    });
    this.getRect('#'+ele);
  },

  getRect(ele) {
    var that = this;
    wx.createSelectorQuery().select(ele).boundingClientRect(function (rect) {
      let moveParams = that.data.moveParams;
      moveParams.subLeft = rect.left;
      moveParams.subHalfWidth = rect.width/2;
      that.moveTo();
    }).exec()
  },

  scrollMove(e) {
    let moveParams = this.data.moveParams;
    moveParams.scrollLeft = e.detail.scrollLeft;
    this.setData({
      moveParams: moveParams
    })
  },

  moveTo: function() {
    let subLeft = this.data.moveParams.subLeft;
    let screenHalfWidth = this.data.moveParams.screenHalfWidth;
    let subHalfWidth = this.data.moveParams.subHalfWidth;
    let scrollLeft = this.data.moveParams.scrollLeft;

    let distance = subLeft - screenHalfWidth + subHalfWidth;

    scrollLeft = scrollLeft + distance;

    this.setData({
      scrollLeft: scrollLeft
    })
  }
})
