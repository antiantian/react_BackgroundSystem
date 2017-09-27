const {deallistData} =require('./data');
const {payType,finishDate} =require('./utils');
const Mock = require('mockjs');
 var Random = Mock.Random;
function deallistInfoData(orderNo){
    var data={};
    for(let i=0;i<deallistData.length;i++){
        if(deallistData[i].orderNo==orderNo){
             data= Mock.mock({
                 "orderNo":deallistData[i].orderNo,
                 "merchantOrderNo":deallistData[i].merchantOrderNo,
                  "createDate":finishDate(deallistData[i].createDate),
                  "finishDate":finishDate(deallistData[i].finishDate),
                  "payType":payType(deallistData[i].payType),
                  "amount":deallistData[i].amount,
                  "fee":deallistData[i].fee,
                  "subject":'测试'+'@ctitle',
                  "name":'@cname',
                  "bankCard":['@string("number", 15)','@string("number", 18)'][parseInt(Math.random()*2)],
                  "status":deallistData[i].status,
                  "updateDetails":[
                     {
                      "key": 1,
                      "msg": "支付创建",
                      "date": finishDate(deallistData[i].createDate)
                     }
                  ],
                  "channelOrderNo":deallistData[i].channelOrderNo,
                  "merchantNo":deallistData[i].merchantNo,
                  "agencyNo":deallistData[i].agencyNo,
                  "channelCode":deallistData[i].channelCode,
                  "payConfigCode":deallistData[i].payType,
                  "desc":'测试',
                  "settlementType":deallistData[i].settlementType,
                  "orderExts": [
                    {
                      "key": 0,
                      "name": "张三",
                      "phone": "18651001024",
                      "idCard": "420***********0518",
                      "bankCard": "6225882013511406"
                    }
                  ],
                  "payMerchantRate": [
                    {
                      "rate": "0.0150",
                      "minTransaction": "10",
                      "maxTransaction": "20000",
                      "key": 0,
                      "allowCredit": true
                    }
                  ],
                  "agencyRate": [
                    {
                      "rate": "0.0040",
                      "autoD0": false,
                      "key": 0
                    }
                  ],
                  "payChannelRateText": [
                    {
                      "rate": "0.0040",
                      "minTransaction": "10",
                      "maxTransaction": "20000",
                      "key": 0,
                      "creditRate": "0.0040",
                      "allowCredit": true,
                      "autoD0": false
                    }
                  ],
                  "merchantConfigText": [
                    {
                      "key": 0,
                      "notifyUrl": "http://cuntao.tt.w3cmark.com:8000/member/pay/xinlexinpay/not.php",
                      "inTransitLimit": "0",
                      "balanceLimit": "0.8"
                    }
                  ],
                  "merchantRequestText": [
                    {
                      "key": 0,
                      "clientIp": "58.64.148.141"
                    }
                  ],
                  "feeText": [
                    {
                      "key": 0,
                      "autoD0": false,
                      "transactionFee": 0.17,
                      "agencyProfit": 0.12,
                      "platformProfit": 0,
                      "fakePlatformProfit": 0.05,
                      "credit": false
                    }
                  ]
            })
              
              break;     
        }
    }
    return data;
}
  // let child=Mock.mock({
  //           'key|+1':i,
  //           "orderNo":"@natural",
  //           merchantOrderNo:/\d{12,16}/,
  //           agencyNo:/\d{5,8}/,
  //           merchantNo:/\d{5,8}/,
  //           channelOrderNo:/\d{12,16}/,
  //           "createDate":(new Date()).getTime(),
  //           "finishDate":(new Date()).getTime(),
  //           "payType|1":["express_t1","express_d0","gateway"],
  //           "amount|0-500": 1,
  //           "fee|2-8.0-2": 1,
  //           "status|0-1":0,
  //          'email': '@EMAIL',
  //          "sumAmount":"",
  //          "sumNum":str3,
  //         });
const deallistInfoData2={
  "code": "200",
  "msg": "成功",
  "timeStamp": "1506390218740",
  "data": {
    "orderNo": "346118171800798549",
    "merchantOrderNo": "2017080412132953574",
    "createDate": "2017-08-04 12:14:40",
    "finishDate": null,
    "payType": "快捷支付T1",
    "amount": 11,
    "fee": 0.17,
    "subject": "测试",
    "name": "张三",
    "bankCard": "6225****1406",
    "status": 0,
    "updateDetails": [
      {
        "key": 1,
        "msg": "支付创建",
        "date": "2017-08-04 12:14:40"
      }
    ],
    "channelOrderNo": "10064094",
    "merchantNo": 10025153461,
    "agencyNo": 10025,
    "channelCode": "tftpay",
    "payConfigCode": "express_t1",
    "desc": "测试",
    "orderExts": [
      {
        "key": 0,
        "name": "张三",
        "phone": "18651001024",
        "idCard": "420***********0518",
        "bankCard": "6225882013511406"
      }
    ],
    "settlementType": null,
    "payMerchantRate": [
      {
        "rate": "0.0150",
        "minTransaction": "10",
        "maxTransaction": "20000",
        "key": 0,
        "allowCredit": true
      }
    ],
    "agencyRate": [
      {
        "rate": "0.0040",
        "autoD0": false,
        "key": 0
      }
    ],
    "payChannelRateText": [
      {
        "rate": "0.0040",
        "minTransaction": "10",
        "maxTransaction": "20000",
        "key": 0,
        "creditRate": "0.0040",
        "allowCredit": true,
        "autoD0": false
      }
    ],
    "merchantConfigText": [
      {
        "key": 0,
        "notifyUrl": "http://cuntao.tt.w3cmark.com:8000/member/pay/xinlexinpay/not.php",
        "inTransitLimit": "0",
        "balanceLimit": "0.8"
      }
    ],
    "merchantRequestText": [
      {
        "key": 0,
        "clientIp": "58.64.148.141"
      }
    ],
    "feeText": [
      {
        "key": 0,
        "autoD0": false,
        "transactionFee": 0.17,
        "agencyProfit": 0.12,
        "platformProfit": 0,
        "fakePlatformProfit": 0.05,
        "credit": false
      }
    ]
  },
  "token": "dba71fcac8264dccbff736920fc849df",
  "status": null,
  "success": true
}

module.exports=deallistInfoData;