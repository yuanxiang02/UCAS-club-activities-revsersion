const cloud = require('wx-server-sdk')
cloud.init()
var timestamp = Date.parse(new Date())
timestamp = timestamp / 1000;
var n = timestamp * 1000;
var date = new Date(n);
var Y = date.getFullYear();
var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
var time = Y + "年" + M + "月" + D + "日"     //上面这一段是获取一个服务器时间
exports.main = async (event, context) => {
  //将'今日无待审核的场地预定'的结果以及时间发送给特定的用户（审核人）
  try {
    const result = await cloud.openapi.subscribeMessage.send({
      touser: "ofZws5DW_u5cieueA4rmlkShxHIs", //要推送给那个用户
      page: 'pages/premission/index6', //要跳转到那个小程序页面
      data: {//推送的内容
        date2: {
          value: time
        },
        thing3: {
          value: '今日无待审核的场地预定'
        }
      },
      templateId:'JGXogagly-vxus11aeZNsTHkhcguErfeVoVTAgha5zY'
    })
    //return result
  } catch (err) {
    //console.log(err)
    return err
  }
}