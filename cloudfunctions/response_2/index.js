// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
const shcg = db.collection("shcg")
exports.main = async (event, context) => {
  let task = await shcg.where
    ({
      zhuangtai: "未通过",message:"false"
    }).get();
    console.log(task)

  for (i = 0; i < task.data.length; i++) {
    await cloud.callFunction({
      name: "response_step2",
      data: {
        taskId: task.data[i]._id,
      }
    })
  }
}
