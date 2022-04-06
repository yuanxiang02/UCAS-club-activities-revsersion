// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
const shcg = db.collection("shcg")
var timestamp = Date.parse(new Date())
timestamp = timestamp / 1000;
var n = timestamp * 1000;
var date = new Date(n);
var Y = date.getFullYear();
var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
var time = Y + "年" + M + "月" + D + "日"     //上面这一段是获取一个服务器时间（赋值给time） 下面要用
exports.main = async (event, context) => {
  //更新taskId，更新task中的数据
  let taskId = await event.taskId
  let task = await shcg.where({
    _id: taskId
  }).get();
  console.log(task)
  //初始化数据数组
  let touser = task.data[0]._openid
  let submit_time = task.data[0].submit_time
  let mingcheng = task.data[0].mingcheng
  let reviewer=task.data[0].reviewer
  //将审核已通过的信息发送给数据提交者
  try {
    const result = await cloud.openapi.subscribeMessage.send({
      touser:touser, //要推送给那个用户
      page: 'pages/tabbar1/index', //要跳转到那个小程序页面
      data: {//推送的内容
        name1: {
          value: reviewer
        },
        name3: {
          value: mingcheng
        },
        date4: {
          value: submit_time
        },
        thing5: {
          value: '你的申请已经通过'
        }
      },
      //？templateId是什么
      templateId: 'kD7xiyncjPy-bm2OD9kgazbYo4EqZ80c_KLR4FCXOqE'
    })
    //更新数据库schg中的数据
    return await db.collection("shcg").doc(taskId).update({
      data: {
        message: "true"
      }
    })
    return result
  } catch (err) {
    console.log(err)
    return err
  }
}

