//代码注释者：张宇恒
//注释进行时间：2021年6月2日
//注释时进行的修改：暂无
//-----------------------------------------
//page name:shenhe
//module:对应主页面（详见tabbar1）中的第二个模块，名称为：审核页面
//function:

//初始化数据库
const db =wx.cloud.database()
const shcg =db.collection("shcg")
//获取时间
var timestamp =Date.parse(new Date())
    timestamp = timestamp/1000 ;
    var n =timestamp*1000;
    var date = new Date(n);
    var Y =date.getFullYear();
    var M=(date.getMonth() +1<10?'0' + (date.getMonth() + 1) : date.getMonth() + 1);
    var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    var time = Y+"年"+M+"月"+D+"日"
Page({
  data: {
    task:null
  },
 //以下三个函数均无实际效果
  onLoad: function (options) {
    this.getData(res=>{});
  },
  onReady: function () {
  },
  onShow:function(){
  },
  //刷新函数跳转到停止刷新
  onPullDownRefresh:function(){
    this.getData(res=>{
      wx.stopPullDownRefresh();
    });
  },
  //得到数据？
  getData:function(callback){
    shcg.get().then(res => {
      this.setData({
        task:res.data
      },res=>{
        callback();
      })
    }
    )
  },
  //确认函数，跳转到确认页面
  queren:function(e){
    wx.navigateTo({
      url: "/pages/queren/index4?id="+ e.currentTarget.dataset.id
    })
  },
})