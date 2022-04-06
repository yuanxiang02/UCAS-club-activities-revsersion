//代码注释者：张宇恒
//注释进行时间：2021年5月29日
//注释时进行的修改：暂无
//-----------------------------------------
//page name:chaxun_step2
//module:对应主界面中第三项“结果查询”中一个数据的查看
//function:展现查询的具体结果，并可返回原查询主页面

//初始化数据库，赋值shcg指向shcg数据库
const db = wx.cloud.database()
const shcg = db.collection("shcg")
const tasks = {}
//初始化时间、地点、备注、人数、负责人、联系方式、名称、其他，内容均为空值
const shijian=null
const didian=null
const beizhu=null
const renshu=null
const fuzeren=null
const lianxifangshi=null
const mingcheng=null
const qita=null
const neirong=null


Page({
   //页面初始数据为空
  data: {
    task: null,
  },
  //定义返回chaxun页面的函数
  back:function(){
    wx.navigateBack({})
    
  },
  //
  onLoad:function(event){
    //将数据“event.id”存储在本地缓存“id”中
    wx.setStorage({
      key:"id",
      data:event.id
    })
    
    //将“时间、地点、备注、人数、负责人、联系方式、名称、其他，内容、审核人、反馈”存储在本地缓存中
     shcg.doc(event.id).get().then(res=>{
      let shijian=res.data.shijian;
      let mingcheng =res.data.mingcheng;
      let renshu = res.data.renshu;
      let didian=res.data.didian;
      let neirong=res.data.neirong;
      let beizhu =res.data.beizhu;
      let fuzeren =res.data.fuzeren;
      let reviewer=res.data.reviewer;
      let feedback=res.data.feedback
     
      ///将“时间、地点、备注、人数、负责人、联系方式、名称、其他，内容、审核人、反馈”值赋给相应部分（更新）
      this.setData({
        shijian:shijian,
        mingcheng:mingcheng,
        renshu:renshu,
        qita:qita,
        fuzeren:fuzeren,
        didian:didian,
        neirong:neirong,
        beizhu:beizhu,
        reviewer:reviewer,
        feedback:feedback
      })
    })
  },
  //onPullDownRefresh用户下拉刷新不执行任何操作
  onPullDownRefresh:function(){
  }, 
})