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
 //
 //初始化taskId和task.data中的数据 
 let taskId = await event.taskId
  let tasks = await shcg.where({
    _id: taskId
  }).get();
  let touser = tasks.data[0]._openid
  let submit_time = tasks.data[0].submit_time
  let mingcheng = tasks.data[0].mingcheng
  let reviewer=tasks.data[0].reviewer
  //将申请通过的信息发送给申请者
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
          value: '你的申请没有通过'
        }
      },
      templateId: 'kD7xiyncjPy-bm2OD9kgazbYo4EqZ80c_KLR4FCXOqE'
    })
   //更新数据库中的数据
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

