//代码注释者：张宇恒
//注释进行时间：2021年6月2日
//注释时进行的修改：暂无
//-----------------------------------------
//page name:premission
//module:对应主界面中第五项“云服务”
//function:

// miniprogram/pages/final_page/index6.js
Page({
  //数据初始为空
  data: {
  },
  //
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
  //onPullDownRefresh用户下拉刷新不执行任何操作
  onPullDownRefresh:function(){
  },  
  shenhe:function(event){
    //调起客户端小程序订阅消息界面，返回用户订阅消息的操作结果：成功，打印授权成功；失败，打印授权失败。！！！
    wx.requestSubscribeMessage({
      tmplIds: ["JGXogagly-vxus11aeZNsTHkhcguErfeVoVTAgha5zY"],
        success(res) {
          console.log("授权成功", res)
        },
        fail(res) {
          console.log("授权失败", res)
        }
      }),
    //获取用户ID，如果是审核者，显示成功；否则失败
    wx.getStorage({
      key: 'openid',
      success(res){
        let  openid = res.data
    if(openid=="ofZws5DW_u5cieueA4rmlkShxHIs"||openid =="ofZws5I9NS3KKN5GZ_sYciEaKlYQ"){
      wx.showModal({
        title:"成功",
        content:"成功拉取审核权限",
        showCancel:false,
        confirmText:"确认",
        confirmColor:"skyblue",
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
