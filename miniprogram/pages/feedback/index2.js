//代码注释者：张宇恒
//注释进行时间：2021年5月29日
//注释时进行的修改：暂无
//-----------------------------------------
//page name:chaxun_step2
//module:对应主界面中第四项“反馈”中一个数据的查看
//function:函数e用于获取用户的反馈信息

//初始化数据库，赋值“反馈信息”指向"response_messages"数据库
const db = wx.cloud.database();
const response_messages = db.collection("response_messages");

Page({
 //onPullDownRefresh用户下拉刷新不执行任何操作
  onPullDownRefresh:function(){
  },  
  //提交函数，获取事件e的detail的值。如果是空，则显示提交失败；否则显示提交成功，并将反馈信息存入data
  formSubmit: function (e) {
    console.log(e.detail.value)
   if(e.detail.value.response_messages==""){
    wx.showModal({
      title:"提交失败",
      content:"请确认所填写的信息准确有效",
      showCancel:true,
      cancelText:"确认",
      cancelColor:"skyblue",
      confirmText:"取消",   
    })
   }
   else{
    response_messages.add({
     data:{
       反馈信息:e.detail.value,
       formId: e.detail.value.formId
     } 
    })
    this.setData({
      wyx: ""
    }) 
    wx.showModal({
      title:"提交成功",
      content:"您的反馈信息已提交，我们会在两天之内对您的反馈进行处理",
      showCancel:true,
      cancelText:"确认",
      cancelColor:"skyblue",
      confirmText:"取消",  
    })
  }
  }
})