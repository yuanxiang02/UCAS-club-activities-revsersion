// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
const shcg=db.collection("shcg")
// 云函数入口函数
exports.main = async (event, context) => {
  return await db.collection("shcg").doc(event.id).update({
    data:{
      zhuangtai:"未通过"
    }
  })
}
//对数据库中特定位置（ID）的“zhuangtai”对应的值进行更新，改为“未通过”