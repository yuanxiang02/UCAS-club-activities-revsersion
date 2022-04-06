//代码注释者：王元湘
//注释进行时间：2021年4月24日
//注释时进行的修改：暂无
//-----------------------------------------
//page name:chaxun
//module:对应主界面中第三项“结果查询”
//function:陈列出小程序云数据库中各项

//初始化数据库操作，赋值shcg指向shcg数据库
const db =wx.cloud.database()
const shcg =db.collection("shcg")


Page({
 //页面初始数据为空
  data: {
    task:null
  },
  //？onLoad加载入数据为空
  onLoad: function (options) {
    this.getData(res=>{});
  },
 //onReady和onShow均不执行任何操作
  onReady: function () {
  },
  onShow:function(){
  },
 //onpulldownfresh 常规执行刷新操作
  onPullDownRefresh:function(){
    this.getData(res=>{
      wx.stopPullDownRefresh();
    });
  },
  //getData函数，为获取schg数据库中的数据，更新task
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
 
  //detail函数：保留当前页面，跳转到chaxun_step2页面
  detail:function(e){
    wx.navigateTo({
      url: "/pages/chaxun_step2/index9?id="+ e.currentTarget.dataset.id
    })
  }
})