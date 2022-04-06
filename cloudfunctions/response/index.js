// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
const shcg = db.collection("shcg")
exports.main = async (event, context) => {
  //获取状态在“已通过”的数据存入task中
  let task = await shcg.where
    ({
      zhuangtai: "已通过",message:"false"
    }).get();
    console.log(task)
//对每一条状态为“已通过”的数据执行"response_step1"函数
  for (i = 0; i < task.data.length; i++) {
    await cloud.callFunction({
      name: "response_step1",
      data: {
        taskId: task.data[i]._id,
      }
    })
  }
 //获取状态在“未通过”的数据存入task中
  task = await shcg.where
  ({
    zhuangtai: "未通过",message:"false"
  }).get();
  console.log(task)
//对每一条状态为“未通过”的数据执行"response_step2"函数
for (i = 0; i < task.data.length; i++) {
  await cloud.callFunction({
    name: "response_step2",
    data: {
      taskId: task.data[i]._id,
    }
  })
}
}
