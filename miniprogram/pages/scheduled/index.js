const db = wx.cloud.database();
const shcg = db.collection("shcg")//请求云数据库接口
const app=getApp()
var data_array=['01日','02日','03日','04日','05日','06日','07日','08日','09日','10日','11日','12日','13日','14日','15日','16日','17日','18日','19日','20日','21日','22日','23日','24日','25日','26日','27日','28日','29日','30日','31日']
var month_array=['1月','2月','3月','4月','5月', '6月', '7月', '8月', '9月','10月','11月','12月']
var date=[0, 11, 20]
Page({
  data: {
      date:"2021-08-30",
      index: 0,
      multiArray: [['非周常活动', '周常活动'], month_array, data_array],
      multiIndex: date,
      time: '12:01',
      date: '8:00',//默认起始时间  
      date2: '22:00',//默认结束时间 
  },
  onLoad:function(){
    var timestamp =Date.parse(new Date())
    timestamp = timestamp/1000 ;
    var n =timestamp*1000;
    var date = new Date(n);
    var Y =date.getFullYear();
    var M=  date.getMonth() ;
    var D = date.getDate()-1;
    var dates= [0,M,D];
    this.setData({
      multiIndex: dates
    })

  },
  changeDate:function(e){
    //获取当前选择日期
    var date = e.detail.value;
    this.setData({
      currentDate:date
    })
  },
  formSubmit: function (event) {//formsubmit函数
    console.log(event.detail.value)
    var timestamp =Date.parse(new Date())
    timestamp = timestamp/1000 ;
    var n =timestamp*1000;
    var date = new Date(n);
    var Y =date.getFullYear();
    var M=(date.getMonth() +1<10?'0' + (date.getMonth() + 1) : date.getMonth() + 1);
    var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    var time =M+"月"+D+"日"//获取时间

    if(event.detail.value.riqi=="" ||event.detail.value.shijian2=="" ||event.detail.value.shijian1=="" || event.detail.value.didian=="" || event.detail.value.mingcheng==""  || event.detail.value.neirong==""  || event.detail.value.fuzeren==""  || event.detail.value.lianxifangshi==""  || event.detail.value.renshu==""  || event.detail.value.qita==""  || event.detail.value.beizhu=="" ){//判断是否为空
      wx.showModal({
        title:"返回错误",
        content:"请确认填写的信息中是否有空字节，并填写完整",
        showCancel:true,
        cancelText:"确认",
        cancelColor:"skyblue",
        confirmText:"取消",
      })
    }
    else{
    wx.showModal({
      title: '提交确认',
      content: "是否确认提交",
      showCancel: true,
      confirmText:"是",
      confirmColor: 'skyblue',
      cancelText:"否",
      success: function (res) {
         if (res.cancel) {

         } else {
          db.collection("messages").add({
            data:{
              page:"pages/shenhe/index5",
              data:event.detail.value,
              done:false,
            }
          })
        shcg.add({
          data:{
            didian:event.detail.value.didian,
            mingcheng:event.detail.value.mingcheng,
            neirong: event.detail.value.neirong,
            fuzeren: event.detail.value.fuzeren,
            lianxifangshi: event.detail.value.lianxifangshi,
            renshu: event.detail.value.renshu,
            qita: event.detail.value.qita,
            beizhu: event.detail.value.beizhu,
            riqi:event.detail.value.riqi,
            shijian1:event.detail.value.shijian1,
            shijian2:event.detail.value.shijian2,
            zhuangtai:"审核中",
            submit_time:time,
            message:"false",
            feedback:"暂无反馈",
            reviewer:"暂无"
          }
        }) 
         wx.navigateTo({
            url: "/pages/submit_success_to/index"
          })
         }
      },
      fail: function (res) { },//接口调用失败的回调函数
      complete: function (res) { },//接口调用结束的回调函数（调用成功、失败都会执行）
   })
   
  
    this.setData({
      wyx: ""
    })
  }
},
bindDateChange(e) {
  let that = this;
  console.log(e.detail.value)
  that.setData({
    date: e.detail.value,
  })
},
bindDateChange2(e) {
  let that = this;
  that.setData({
    date2: e.detail.value,
  })

},
quanxian(){
  wx.requestSubscribeMessage({
    tmplIds: ["kD7xiyncjPy-bm2OD9kgazbYo4EqZ80c_KLR4FCXOqE"],
    success(res){
      console.log("授权成功",res)
    },
    fail(res){
      console.log("授权失败",res)
    }
  })
},
formReset: function (event) {
  console.log("撤销", event.detail.value)
  this.setData({
    wyx: ""
  })
},
bindMultiPickerChange: function (e) {
  console.log('picker发送选择改变，携带值为', e.detail.value)
  this.setData({
    multiIndex: e.detail.value
  })
},

bindMultiPickerColumnChange: function (e) {
  console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
  var data = {
    multiArray: this.data.multiArray,
    multiIndex: this.data.multiIndex
  };
  data.multiIndex[e.detail.column] = e.detail.value;
  switch (e.detail.column) {
    case 0:
      switch (data.multiIndex[0]) {
        case 0:
          data.multiArray[1] = month_array;
          data.multiArray[2] = data_array;
          break;
        case 1:
          data.multiArray[1] = ['周一', '周二', '周三','周四','周五','周六','周日'];
          data.multiArray[2] = [];
          break;
      }
      data.multiIndex[1] = 0;
      data.multiIndex[2] = 0;
      break;
  }
  console.log(data.multiIndex);
  this.setData(data);
},

bindTimeChange: function(e) {
  console.log('picker发送选择改变，携带值为', e.detail.value)
  this.setData({
    time: e.detail.value
  })
},
})