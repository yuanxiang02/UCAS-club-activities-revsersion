// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
const shcg = db.collection("shcg")
exports.main = async(event,context)=>{
  let tasks=await shcg.where
  ({
    状态:"审核中",
  }).get();
  for(i=0  ; i<tasks.data.length ; i++)
  {
    await cloud.callFunction({
      name:"login",
      data:{
        taskId:tasks.data[i]._id,
      }
    })
  }
  const wxContext = cloud.getWXContext()
  return {
    event,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }
}