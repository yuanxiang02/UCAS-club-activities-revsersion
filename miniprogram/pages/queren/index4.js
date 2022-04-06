const db = wx.cloud.database()
const shcg = db.collection("shcg")
const tasks = {}
const shijian=null
const didian=null
const beizhu=null
const renshu=null
const fuzeren=null
const lianxifangshi=null
const mingcheng=null
const qita=null
const neirong=null
var sort=null
var month=null
var day=null
Page({
  data: {
    task: null,
  },
  onLoad:function(event){
    wx.setStorage({
      key:"id",
      data:event.id
    })
     shcg.doc(event.id).get().then(res=>{
       

      if (res.data.riqi[0]==0){
         sort='非周常活动'
         month=res.data.riqi[1]+1+'月'
         day=res.data.riqi[2]+1+'日'
      }
      else{
         sort='周常活动'
        switch(res.data.riqi[1]){
          case 0:
             month = '周一'
            break;
          case 1:
             month = "周二"
            break;
          case 2:
            month = "周三"
            break;
          case 3:
             month = "周四"
            break;
          case 4:
             month = "周五"
            break;
          case 5:
             month =" 周六"
            break;
          default:
             month = "周日"
            break;
          
        }
         day=''
      }
      let shijian=res.data.shijian1 +'--'+res.data.shijian2;
      let mingcheng =res.data.mingcheng;
      let renshu = res.data.renshu;
      let didian=res.data.didian;
      let neirong=res.data.neirong;
      let beizhu =res.data.beizhu;
      let lianxifangshi=res.data.lianxifangshi;
      let fuzeren =res.data.fuzeren;
      let qita = res.data.qita
      let riqi=[sort,month,day]
      this.setData({
        shijian:shijian,
        mingcheng:mingcheng,
        renshu:renshu,
        qita:qita,
        fuzeren:fuzeren,
        didian:didian,
        neirong:neirong,
        beizhu:beizhu,
        lianxifangshi:lianxifangshi,
        qita:qita,
        riqi:riqi
      })
    })
  },
  onPullDownRefresh:function(){
  },  
  formSubmit: function (event) {
       let feedback=event.detail.value.feedback
       let reviewer=event.detail.value.reviewer
       wx.getStorage({
        key: 'id',
        success(res){
          let id=res.data
          wx.cloud.callFunction({
            name:"database_feedback",
            data:{
              id:id,
              feedback:feedback,
              reviewer:reviewer,
            }
          })
        }}
      )

},
formReset: function (event) {
  let feedback=event.detail.value.feedback
  let reviewer=event.detail.value.reviewer
  wx.getStorage({
   key: 'id',
   success(res){
     let id=res.data
     wx.cloud.callFunction({
       name:"database_feedback",
       data:{
         id:id,
         feedback:feedback,
         reviewer:reviewer,
       }
     })
   }}
 )

},
  queren: function () {
    wx.getStorage({
      key: 'id',
      success(res){
        let id =res.data
        wx.cloud.callFunction({
          name:"database",
          data:{
            id:id
          }
        })
      }}
    ),
      wx.requestSubscribeMessage({
      tmplIds: ["JGXogagly-vxus11aeZNsTHkhcguErfeVoVTAgha5zY"],
        success(res) {
          console.log("授权成功", res)
        },
        fail(res) {
          console.log("授权失败", res)
        }
      }),
      wx.showModal({
       title: "确认完成",
       content: "本次确认信息有效且已更新到数据库",
       showCancel: true,
       cancelText: "取消",
       cancelColor: "skyblue",
       confirmText: "确认",
       success(res){
         if(res.confirm)
         {
          wx.navigateTo({
            url: "/pages/shenhe/index5"
         })
         }else {
        }
       }
     })    
 },
 
     fouren: function () {
       wx.getStorage({
         key: 'id',
         success(res) {
           let id = res.data
           wx.cloud.callFunction({
             name: "anti_database",
             data: {
               id: id
             }
           })
         }
       }
       ),
       wx.requestSubscribeMessage({
         tmplIds: ["JGXogagly-vxus11aeZNscvM8-De6qtHcgJxo70-weE"],
         success(res) {
           console.log("授权成功", res)
         },
         fail(res) {
           console.log("授权失败", res)
         }
       }),
    wx.clearStorage({})
    wx.showModal({
      title: "确认完成",
      content: "本次确认信息有效且已更新到数据库",
      showCancel: true,
      cancelText: "取消",
      cancelColor: "skyblue",
      confirmText: "确认",
      success(res){
        if(res.confirm)
        {
         wx.navigateTo({
           url: "/pages/shenhe/index5"
        })
        }else {
       }
      }
    })   
   },
})