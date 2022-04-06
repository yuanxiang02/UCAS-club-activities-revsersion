const cloud = require('wx-server-sdk')
const rp =require('request-promise')
const template_id = 'JGXogagly-vxus11aeZNscvM8-De6qtHcgJxo70-weE';
cloud.init()
//初始化数据库
const db = cloud.database()
const shcg = db.collection("shcg")
var timestamp =Date.parse(new Date())
timestamp = timestamp/1000 ;
var n =timestamp*1000;
var date = new Date(n);
var Y =date.getFullYear();
var M=(date.getMonth() +1<10?'0' + (date.getMonth() + 1) : date.getMonth() + 1);
var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
var time = Y+"年"+M+"月"+D+"日"
//得到状态在“审核中”的数据
exports.main=async(event,context)=>{
  let tasks=await shcg.where({
    zhuangtai:"审核中",
  }).get();
 exports.main = async (event, context) => {
  // ？？
  if(tasks.data.length==0){
    let options ={
         url:'https://api.weixin.qq.com/cgi-bin/token',
        qs:{
          grant_type:'client_credential',
          appid:appId,
          secret:secret
        },
      json:true,
      method:'GET'
    };
    let res =await rp(options)
    console.log(res)
    let token = res.access_token;
return await token

   const touser="ofZws5DW_u5cieueA4rmlkShxHIs"
   let body={
    touser: touser,
    template_id:template_id,
    "data":{
      "name1":{
        "value":"目前没有处于审核中的消息"
      },
      "date2":{
        "value":time
      },
      "thing3":{
        "value":"暂无"
      }
    },
      };
      let options2 = {
        method:'POST',
        url:"https://api.weixin.qq.com/cgi-bin/message/subscribe/send?access_token="+token,
        body:body,
        json:true,
        encoding:null
      };
      var tmp =rp(options2);
      return await tmp ;
   }
}
}
