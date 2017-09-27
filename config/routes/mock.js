const express = require('express')
const router = express.Router()
const opporList = require('../mock/opporList.json');
const {
  deallistData,
  paychannelData,
  settleListData,
  setchannelData,
  agencyData,
  AgencyGroupData,
  MerchantData,
  MerchantCapitalData,
  paymentWayData,
  paymentTypeData,
  paymentConfigData
} =  require('../mock/data');
const deallistInfoData=require('../mock/dealinfo');
const settleInfoData=require('../mock/settleinfo');
const Mock = require('mockjs');
var Random = Mock.Random;
//定义统一返回格式
var responseData;
router.use(function(req,res,next){
    responseData={
        code:'200',
        msg:'请求成功',
        data:null,
        admin_id:null,
        token:'123wf4b6njj7687adewf12fgd4'
    }
    next();
})
// 直接读取json文件导出
router.get('/api/web/login', function (req, res) {

  res.json(opporList)
   return;
})

router.post('/api/web/login', function (req, res) {
  
    var userName=req.body.userName||'';
    var password=req.body.password||'';
    // console.log(req.query) //链接上 
    var data = Mock.mock({
      // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
      'list|1-10': [{
        // 属性 id 是一个自增数，起始值为 1，每次增 1
        'id|+1': 1
      }]
    })
    if(userName!='11111'){
       responseData.code='300';
       responseData.msg="用户名不正确";
    }

    responseData.data=data;
    responseData.data.admin_id=userName;
    res.json(responseData)
     return;
})
/*
{
  "code": "200",
  "msg": "登录成功",
  "timeStamp": "1506328539739",
  "data": {
    "admin_id": "11111",
    "email": "454386233@qq.com",
    "lastLoginIp": "192.168.1.121",
    "lastLoginDate": 1505903628000
  },
  "token": "4aebed46db0540438336bb8f2956b126",
  "status": null,
  "success": true
}
*/

function searchData(parent,pageNum,numPerPage,conditions,req){
    let parentData=parent;
   // console.log(parentData)
    var pageNum=pageNum||''; //2
    var numPerPage=numPerPage||''; //10
    let condition={};
    if(conditions&&conditions.length>0){
       for(let i=0;i<conditions.length;i++){
            if(typeof conditions[i] !=='string'){
              var name=conditions[i].name;
              var child=req[name]||null;
              var innerT=conditions[i].text;
            }else{
              var name=conditions[i];
              var child=req[name]||null;
            }
            if(child&&child!=""){
              if(innerT){
                   if(child!==innerT){
                     condition[name]=child;
                   }
              }else{
                  condition[name]=child;
              }
            }
       }

    }
    let carr=[];
    for(k in condition){
       if(k){
           carr.push(k)
       }
    }
   // console.log(condition)
    //条件查询
    let newP=[];
    for(let m=0;m<parentData.length;m++){
          let has=true;
          if(carr.length>0){
              for(k in condition){
                   if(parentData[m][k]!=condition[k]){
                      has=false;
                      break;
                    }
              }
          }
          if(has){
             newP.push(parentData[m])
          }
    }
    
    parentData=newP;
    //重新定义总条数
    for(let i=0;i<parentData.length;i++){
        parentData[i]["key"]=i+1;
        parentData[i]["sumNum"]=parentData.length;
    }
   //页码查询
   if(req.isPage!=1){// 1不分页
       if(parentData.length<((pageNum-1)*numPerPage)){
          pageNum=Math.ceil((parentData.length)/((pageNum-1)*numPerPage));
       }
        let newArr=[];
        for(let i=(pageNum-1)*numPerPage;i<numPerPage*pageNum;i++){
             //console.log(deallistData[i])
             if(parentData[i]){
                  newArr.push(parentData[i])
             }
        }
       parentData=newArr;   
   }
   
   return parentData;
}
router.post('/api/web/admin/paymentOrderList', function (req, res) {
  let parentData=deallistData;
  var pageNum=req.body.pageNum||''; //2
  var numPerPage=req.body.numPerPage||''; //10
 responseData.data=searchData(parentData,pageNum,numPerPage,["orderNo",{name:"payType",text:"-1"},{name:"status",text:"-1"},"merchantOrderNo","agencyNo","merchantNo","channelCode"],req.body);
 if(responseData.data.length<=0){
    responseData.code='201';
    responseData.msg="无数据了";
 }
 res.json(responseData)
 return;
  })
router.post('/api/web/admin/settOrderList', function (req, res) {
 let parentData=settleListData;
 var pageNum=req.body.pageNum||''; //2
 var numPerPage=req.body.numPerPage||''; //10
 responseData.data=searchData(parentData,pageNum,numPerPage,[{name:"payType",text:"-1"},{name:"status",text:"-1"},"orderNo","agencyNo","merchantNo","channelCode"],req.body);
 if(responseData.data.length<=0){
    responseData.code='201';
    responseData.msg="无数据了";
 }
 res.json(responseData)
   return;
})
// 基于mockjs生成数据, 优势在于对项目代码无侵入，并且支持fetch，xhr等多种方式的拦截
router.post('/api/web/admin/getPayChanList', function (req, res) {
  /* /api/web/admin/getPayChanList
  name 支付通道名 query string
  pageNum 第几页 query integer
  numPerPage  条数  query integer
  isPage 是否分页 0分页 1不分页 query integer 
  token
  */
  let parentData=paychannelData;
  var pageNum=req.body.pageNum||''; //2
 var numPerPage=req.body.numPerPage||''; //10
 responseData.data=searchData(parentData,pageNum,numPerPage,["name"],req.body);
 if(responseData.data.length<=0){
    responseData.code='201';
    responseData.msg="无数据了";
 }
 res.json(responseData)
   return;
})
router.post('/api/web/admin/getSettChanList', function (req, res) {
  /* /api/web/admin/getPayChanList
  name 支付通道名 query string
  pageNum 第几页 query integer
  numPerPage  条数  query integer
  isPage 是否分页 0分页 1不分页 query integer 
  token
  */
  let parentData=setchannelData;

  var pageNum=req.body.pageNum||''; //2
 var numPerPage=req.body.numPerPage||''; //10
 responseData.data=searchData(parentData,pageNum,numPerPage,["name"],req.body);
 if(responseData.data.length<=0){
    responseData.code='201';
    responseData.msg="无数据了";
 }
 res.json(responseData)
   return;
})

router.post('/api/web/admin/paymentOrderInfo',function(req,res){
     var orderNo=req.body.orderNo;
     var data=deallistInfoData(orderNo);
     responseData.data=data;
     res.json(responseData);
})
router.post('/api/web/admin/settOrderInfo',function(req,res){
     var orderNo=req.body.orderNo;
     var data=settleInfoData(orderNo);
     responseData.data=data;
     res.json(responseData);
})

router.post('/api/web/refresh', function (req, res) {
  res.json(responseData)
   return;
})
//合作商列表
router.post('/api/web/admin/getAgencyList', function (req, res) {
 let parentData=agencyData;
 var pageNum=req.body.pageNum||''; //2
 var numPerPage=req.body.numPerPage||''; //10
 responseData.data=searchData(parentData,pageNum,numPerPage,["agencyNo",{name:"status",text:"-1"}],req.body);
 if(responseData.data.length<=0){
    responseData.code='201';
    responseData.msg="无数据了";
 }
 res.json(responseData)
   return;
})
//合作商组列表
router.post('/api/web/admin/getAgencyGroupList', function (req, res) {
 let parentData=AgencyGroupData;
 var pageNum=req.body.pageNum||''; //2
 var numPerPage=req.body.numPerPage||''; //10
 responseData.data=searchData(parentData,pageNum,numPerPage,["id"],req.body);
 if(responseData.data.length<=0){
    responseData.code='201';
    responseData.msg="无数据了";
 }
 res.json(responseData)
   return;
})
//商户
router.post('/api/web/admin/getMerchantList', function (req, res) {
 let parentData=MerchantData;
 var pageNum=req.body.pageNum||''; //2
 var numPerPage=req.body.numPerPage||''; //10
 responseData.data=searchData(parentData,pageNum,numPerPage,["merchantNo","agencyNo",{name:"status",text:"-1"}],req.body);
 if(responseData.data.length<=0){
    responseData.code='201';
    responseData.msg="无数据了";
 }
 res.json(responseData)
   return;
})
//商户资金列表
router.post('/api/web/admin/merchantCapital', function (req, res) {
 let parentData=MerchantCapitalData;
 var pageNum=req.body.pageNum||''; //2
 var numPerPage=req.body.numPerPage||''; //10
 responseData.data=searchData(parentData,pageNum,numPerPage,["merchantNo","agencyNo",{name:"status",text:"-1"}],req.body);
 if(responseData.data.length<=0){
    responseData.code='201';
    responseData.msg="无数据了";
 }
 res.json(responseData)
   return;
})
router.post('/api/web/admin/getTypeMethodList', function (req, res) {
 var type=req.body.type;// 1 支付方式 paymentWay  2 paymentType支付类型  3  paymentConfiguration 支付配置
 let parentData=null;
 if(type==1){
    parentData=paymentWayData;
 }
 if(type==2){
     parentData=paymentTypeData;
 }
 if(type==3){
      parentData=paymentConfigData;
 }
 responseData.data=searchData(parentData,null,null,[{name:"status",text:"-1"}],req.body);;
 if(responseData.data.length<=0){
    responseData.code='201';
    responseData.msg="无数据了";
 }
 res.json(responseData)
   return;
})

module.exports = router



const api={
  "resourcePath":"/api/",
  "login":"web/login",//登陆接口
  "refresh":"web/refresh",//刷新接口 
  "updatePwd":"web/updateAdminPwd",//修改密码
  "paymentOrderList":"web/admin/paymentOrderList",//交易列表
  "exportPaymentOrder":"web/admin/exportPaymentOrder",//导出交易列表 
  "paymentOrderInfo":"web/admin/paymentOrderInfo",//交易列表详情
  "settOrderList":"web/admin/settOrderList",//结算列表
  "exportSettOrder":"web/admin/exportSettOrder",//导出结算列表
  "settOrderInfo":"web/admin/settOrderInfo",//结算列表详情
  "merCapitalFlow":"web/admin/merCapitalFlow",//商户资金流水
  "officialCapitalFlow":"web/admin/agenCapitalFlow",//合作商资金流
  "officialCapitalFlowDetail":"web/admin/agencyFlowInfo", //合作商资金流水详情
  "merchantFlowInfo":"web/admin/merchantFlowInfo",//商户资金流水详情
  "agenCapitalFlow":"web/admin/agenCapitalFlow",//合作商资金流水
  "agencyFlowInfo":"web/admin/agencyFlowInfo",//合作商资金流水详情
  "getTypeMethodList":"web/admin/getTypeMethodList", //支付方式列表
  "savePayMethod":"web/admin/savePayMethod",//保存支付方式列表  
  "delPayMethod":"/web/admin/delPayMethod",//删除支付方式列表  
  "delPayConfig":"web/admin/delPayConfig",// 删除支付配置
  "savePayType":"/web/admin/savePayType",//保存支付类型
  "savePayConfig":"/web/admin/savePayConfig",//保存支付配置
  "getPayChanList":"web/admin/getPayChanList",//支付通道列表  
  "getSettChanList":"web/admin/getSettChanList",//结算通道列表  
  "savePayChan":"web/admin/savePayChan",//保存支付通道  
  "saveSettChan":"web/admin/saveSettChan",//保存结算列表
  "getMerchantList":"web/admin/getMerchantList",  //商户列表
  "merchantCapital":"web/admin/merchantCapital",// 商户资金列表
  "saveMerchantList":"web/admin/saveMerchantList",//商户保存：
  "resetMerchantPwd":"web/admin/resetMerchantPwd",//重置商户密码
  "resetAgencyPwd":"web/admin/resetAgencyPwd",//重置合作商密码
  "getAgencyList":"web/admin/getAgencyList",//合作商列表
  "saveAgencyList":"web/admin/saveAgencyList",//保存合作商
  "getAgencyGroupList":"web/admin/getAgencyGroupList",//合作商组列表
    "saveAgencyGroup":"web/admin/saveAgencyGroup",//合作商组保存
    "copyPaySett":"web/admin/copyPaySett",//通道拷贝
    "copyPayChan":"web/admin/copyPayChan",// 拷贝支付通道
    "copySettChan":"web/admin/copySettChan", //拷贝结算通道
    "resetAgencyKey":"web/admin/resetAgencyKey",//重置合作商秘钥
}