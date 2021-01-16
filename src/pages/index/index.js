// index.js
// 获取应用实例
// const app = getApp()

Page({
  data: {
    motto: 'Hello Helllllllllllll',
    moneyNum: 0,
    suffixStr: '块钱',
    message: '',
    numAnimation: {},
  },
  onLoad() {
   setInterval(()=> {
     this.data.moneyNum++
     this.setData({
      moneyNum: this.data.moneyNum,
      numAnimation:this.generateAnimation()
     })
   }, 1000)
  },
  generateAnimation() {
    const animation = wx.createAnimation({
      delay: 500,
      timingFunction: 'linear'
    })
    animation
      .opacity(1)
      .step()
      .opacity(0)
      .step()
    return animation.export()
  }
})
