var app = getApp()
Page({
  data: {
  },
  async onReady(){
    let open_id = await wx.cloud.callFunction({
      name:"openid",
      data:{}
    })
    wx.setStorage({
      key:"openid",
      data:open_id.result.openid
    })
  },
  onPullDownRefresh:function(){
  },  

  enter:function(event){
    wx.getStorage({
      key: 'openid',
      success(res){
        let  openid = res.data
    if(openid=="ofZws5DW_u5cieueA4rmlkShxHIs"||openid =="ofZws5I9NS3KKN5GZ_sYciEaKlYQ"||openid=="ofZws5LW8RPUURcdTQQlIdcVlZ54"){
      wx.navigateTo({
        url: '/pages/shenhe/index5',
      })
    }
    else{
      wx.showModal({
        title:"错误",
        content:"您暂时无审核权限",
        showCancel:false,
        confirmText:"确认",
        confirmColor:"skyblue",
      })
    }
  }
})
}
})
