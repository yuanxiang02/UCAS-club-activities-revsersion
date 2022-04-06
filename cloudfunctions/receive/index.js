// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
const shcg = db.collection("shcg")

exports.main = async (event, context) => {
  let tasks = await shcg.where
    ({
      zhuangtai:"审核中",
    }).get();
    //获得状态在“审核中”的数据存入tasks中
    console.log(tasks.data.length)
  //进行条件判断，如果tasks数据个数为0，则跳转到函数"receive_step1"
    if ( tasks.data.length == 0) {
    await cloud.callFunction({
      name: "receive_step1",
    })
  }
  //如果tasks数据长度不为0，则跳转到函数"receive_step2"
  else
    {
      await cloud.callFunction({
        name:"receive_step2",
      })
    }
}