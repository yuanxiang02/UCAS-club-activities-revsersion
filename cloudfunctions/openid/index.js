const cloud = require('wx-server-sdk')
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  return {
    event,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }
}
//获取云数据库中的各种信息：事件、openID、appid，unionID