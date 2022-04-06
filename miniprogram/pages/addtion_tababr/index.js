//此代码注释者：王元湘
//时间：2021年4月22日
//注释时进行的修改：暂无
//--------------------------------------------------------------------------
//page name:addtion_tabbar
//module:对应主页面（详见tabbar1）中的第六个模块，名称为：相关附件
//function：陈列出小程序内部可提供的一系列文件，现在包括{社团工作手册正式版，日常经费报销表，活动日志模板，手册附录，小程序使用手册}；
//          供小程序使用者下载并浏览。
//problems：下载时不能出现“加载中的字样”  ————该问题于1.2.4版本已经修复
//          不能提醒“是否进行下载”（默认点击即下载），无法显示文件大小（现在的文件大小是手动进行表明的）
//---------------------------------------------------------------------------

//初始化数据库操作，赋值database指向shcg数据库
const db =wx.cloud.database()
const database =db.collection("shcg")


Page({
  data: {
    //云函数调用访问的方法将数据库中的文件放在data中，loading作为一个bool值，对“加载中”这一动画进行操作
    lodingHidden:true,
    task:[{
        mingcheng:"社团工作手册正式版",
        type:"PDF",
        size:"1.69M",
        fileid:"cloud://zero-two.7a65-zero-two-1300660105/社团工作手册_正式版.pdf"
    },
    {
      mingcheng:"日常经费报销表",
      type:"DOCX",
      size:"14.69k",
      fileid:"cloud://zero-two.7a65-zero-two-1300660105/日常经费报销表.docx"
  },
  {
    mingcheng:"活动日志模板",
    type:"DOCX",
    size:"972.7k",
    fileid:"cloud://zero-two.7a65-zero-two-1300660105/活动日志模板.docx",
},
{
  mingcheng:"手册附录",
  type:"DOCX",
  size:"135.3K",
  fileid:"cloud://zero-two.7a65-zero-two-1300660105/手册附录：策划书、审批表、日志表.docx"
},
{
 mingcheng:"小程序使用手册",
 type:"DOCX",
 size:"987.4K",
 fileid:"cloud://zero-two.7a65-zero-two-1300660105/小程序使用说明.docx"
}
  ]
  },

  //onload，onready，onshow操作均不执行任何操作
  onLoad: function (options) {
  },
  onReady: function () {
  },
  onShow:function(){
  },
//onpulldownfresh 常规执行刷新操作
  onPullDownRefresh:function(){
    this.getData(res=>{
      wx.stopPullDownRefresh();
    });
  },

//this.SetData函数：将lodingHidden的值变为false
//执行downloadfile以及opendocument云函数，执行下载并打开
  detail:function(e){
    this.setData({
      lodingHidden:false
    })
   // console.log(e.currentTarget.dataset.id)

        wx.cloud.downloadFile({
          fileID:e.currentTarget.dataset.id,
          success: (res) => {
            const filePath = res.tempFilePath
            wx.openDocument({
              filePath: filePath,
              success: res => {
                     this.setData({
                       lodingHidden: true
                     })
              },
              //下载错误返回值
              fail: err => {
                wx.showModal({
                  title:"返回错误10071",
                  content:"读取文件失败",
                  showCancel:false,
                  cancelColor:"skyblue",
                  confirmText:"确认",  
                })
              }
            })
          },
          fail:err=>{
            //打开错误返回值
            wx.showModal({
              title:"返回错误403",
              content:"读取文件失败",
              showCancel:false,
              cancelColor:"skyblue",
              confirmText:"确认",  
            })
          }
        })


     }
})