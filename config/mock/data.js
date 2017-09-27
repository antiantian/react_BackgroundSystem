 const Mock = require('mockjs');
 var Random = Mock.Random;
 function deallist() {
    var str3 = Random.integer(8,50);
    let arr=[];  
    for(let i=0;i<str3;i++){
        let child=Mock.mock({
            'key|+1':i,
            "orderNo":/\d{12,16}/,//"@natural",
            "merchantOrderNo":/\d{12,16}/,
            "agencyNo":/\d{5,8}/,
            "merchantNo":/\d{5,8}/,
            "channelOrderNo":/\d{12,16}/,
            "createDate":(new Date()).getTime(),
            "finishDate":(new Date()).getTime(),
            "payType|1":["express_t1","express_d0","gateway"],
            "amount|0-500": 1,
            "fee|2-8.0-2": 1,
            "status|0-1":0,
            "settlementType|0-1":0,
           'email': '@EMAIL',
           "sumAmount":"",
           "sumNum":str3,
          });
        arr.push(child)
    } 
    return arr;
} 
/*
{
      "key": 1,
      "orderNo": "346118171800798549",
      "merchantOrderNo": "2017080412132953574",
      "createDate": 1501820080000,
      "finishDate": null,
      "payType": "express_t1",
      "amount": 11,
      "fee": 0.17,
      "status": "0",
      "sumNum": 228,
      "sumAmount": 66766.04,
      "merchantNo": "10025153461",
      "agencyNo": "10025",
      "channelOrderNo": "10064094",
      "channelCode": "tftpay",
      "payConfigCode": "express_t1"
    }
*/
/*
{
      "key": 1,
      "orderNo": "100221323958804320",
      "createDate": 1501675881000,
      "updateDate": 1501676737000,
      "accountName": "方致远",
      "bankInfo": "招商银行武汉分行青山支行",
      "payType": "0",
      "amount": 170,
      "status": "2",
      "fee": 2,
      "sumNum": 13,
      "sumAmount": 2536.02,
      "relatedOrderNo": null,
      "merchantNo": "10025",
      "agencyNo": "10025",
      "channelSettlementNo": "10001950",
      "merchantSettlementNo": "6ada0edfc71141578bc0fd09b041a87d",
      "settlementCode": "tftpayPay",
      "netAmount": 172
    }
*/
function settleList(){
    var str3 = Random.integer(8,50);
    let arr=[];  
    for(let i=0;i<str3;i++){
        let child=Mock.mock({
            'key|+1':i,
            "orderNo":/\d{12,18}/,//"@natural",
            "createDate":(new Date()).getTime(),
            "updateDate":(new Date()).getTime(),
            "accountName":"@cname", 
            "bankInfo":"招商银行武汉分行青山支行",
            "payType|0-1":0,
            "amount|0-500": 1,
            "status|1":[0,2,3,5],
            "fee|2-8.0-2": 1,
            "sumNum":str3,
            "sumAmount":"",
            "relatedOrderNo":/\d{12,18}/,
            "merchantNo":/\d{5,8}/,
            "agencyNo":/\d{5,8}/,
            "channelSettlementNo":/\d{12,16}/,
            "merchantSettlementNo":/[\da-z]{12,16}/,
            "settlementCode":"",
            "netAmount|0-500": 1,
          });
        arr.push(child)
    } 
    return arr;
}
function paychannellist(){
   var str3 = Random.integer(2,10);
   let arr=[];
   template={
      "key": 1,
      "channelCode": "@string('lower',2, 4)",
      "name": "@ctitle(3,5)",
      "start": "10:19",
      "end": "21:14:49",
      "status|0-1":0,
      "chanRates": [
        {
          "rate|0.1-5": 1,
          "fee|0.1-5": 1,
          "minTransaction|1-500": 1,
          "maxTransaction|500-10000":500,
          "creditRate|0.1-5": 1,
          "fakeRate|0.1-5": 1,
          "allowCredit":'@boolean',
          "autoD0":'@boolean',
          "key": 1,
          "name|1":["express_t1","express_d0","gateway"]
        }
      ],
      "chanConfigs": {
        "appId": "@string('lower', 2, 5)",
        "account": null,
        "endpoint": "@url",
        "notifyUrl": "@url",
        "privateKey": null,
        "publicKey": null,
        "dataKey": null,
        "signKey": null
      },
      "sumNum": str3
    };
    
    for (var i = 0; i < str3; i++) {
      var child=Mock.mock(template);
      child.key=i+1;
      arr.push(child)
    }
    return arr;
}
function setchannellist(){
   var str3 = Random.integer(2,10);
   let arr=[];
   template={
      "key": 1,
      "settlementCode":"@string('lower', 3, 5)",
      "name":"@ctitle(2,4)",
      "chanRates": [
        {
          "fee|0.1-5": 1,
          "minTransaction|1-500": 1,
          "maxTransaction|500-10000":500,
          "d0Fee|0-1.1-5": 1,
          "allowD0":'@boolean',
          "key": 1
        }
      ],
      "start": "09:00",
      "end": "21:00",
      "status|0-1": 0,
      "sumNum":str3,
      "chanConfigs": {
        "appId": "@string('number', 3, 15)",
        "account": null,
        "endpoint": "@url",
        "notifyUrl": "@url",
        "privateKey":/[\da-zA-Z]{30,50}/,
        "publicKey":/[\da-zA-Z]{30,50}/,
        "dataKey":/[\da-zA-Z]{30,50}/,
        "signKey":/[\da-zA-Z]{30,50}/,
      }
    };
    
    for (var i = 0; i < str3; i++) {
      var child=Mock.mock(template);
      child.key=i+1;
      arr.push(child)
    }
    return arr;
}
//合作商列表
function agency(){
    var str3 = Random.integer(8,50);
    let arr=[];  
    for(let i=0;i<str3;i++){
        let child=Mock.mock({
            'key|+1':i+1,
            "agencyNo":/\d{5,8}/,
            "agencyGroupNo":"@string('number', 1, 15)",
            "name":'@cname',
            "idCard":"@id",
            "phone":"18971999100",
            "accountExs": {
              "contract": null,
              "bankCard|1": [null,"@string('number',16)","@string('number',19)"],
              "bankName": null,
              "cardMobile": null,
              "email": "test@test.com",
              "password": "4757e9f521099b54f0f0c544dd2b68fb",
              "accountType|0-1": 0
            },
            "balance|1-500.0-3": 1,
            "config": {
              "appPublicKey":"@string(30, 100)",
              "platformPrivateKey":"@string(30, 100)",
              "notifyUrl": "@url",
              "sb": '@boolean'
            },
            "status|0-1": 0,
            "sumNum":str3,
            "tradeVolume": 0,
            "profit": 0
          });
        arr.push(child)
    } 
    return arr;
   // {
   //    "key": 2,
   //    "agencyNo": "10025",
   //    "agencyGroupNo": "2",
   //    "name": "测试合作商",
   //    "idCard": "420***********5810",
   //    "phone": "18971999100",
   //    "accountExs": {
   //      "contract": null,
   //      "bankCard": null,
   //      "bankName": null,
   //      "cardMobile": null,
   //      "email": "test@test.com",
   //      "password": "4757e9f521099b54f0f0c544dd2b68fb",
   //      "accountType": 0
   //    },
   //    "balance": "9.12",
   //    "config": {
   //      "appPublicKey": "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAv93/XLA0bW1AwzWg45P7It6Lqa1Sk2o4ssA1fbxtuOamp0J5M5Kve4kQIQW9yNQIOwzTTwxL/HzDpx0FXRj7X2wV9KN6XhPJKJFGipq21hVe3ngcSx9mJ/naNUNjOKc1hLpS0Nuk7XgMrs1qPzIrCW1Wrxb/V+fh7Xq3nmzOPZ8P+zteMqM+6SsgGxOvUKSO0zFGLU53R6LBMF+uvIAOPx0AfnrsNe0rF9Bh964QnTvpRV4Sjo+kez+SVDapk1cnHMHDf2XqsI3IjxtPBkkORFmZ76YHWKpmjSp2b2vcrIdqXi6T2qN+TODM+S0dpCCrX6lRHNWEDK9jGIM5ErsNCwIDAQAB",
   //      "platformPrivateKey": "MIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQC32LoSE6TbvlbRbMWj83NCBgtUSJGLgn6CUdD5GyZfYNyAY7tYd/M2BewBnOZbypTKoSwOgJ+3TqsOsSODql2Q35NAo9JAafJzQ5n7d2uNttySU9po6DkKEua5ojFjxdlzNWFysw+tpaJvumkzuzhhn2+enTb6vJkdPa+Mm2MisQle8kZG7EQxArhyq1PoaiB9h5WZjosJCHZpQxREi5FW0X5DmZZlBU3reYpU/kW7G4BV16bN5kvGmNFG/jPDNofFhnZTydtnKtl2J/gkRD/XEfqJGFlwdU40RiwGnTyHEaNbznqPQf0XaxQzDwRo6qEYWriLLznfTBIS29ahHz6bAgMBAAECggEAfJMmwkj9VMlNGuuRoN6+Iublll72AIqUHspByApVnhuMTpNFx1TAQMMSgKVIkrpayFMd/1W45AUyc+okHnu6mwhkR1C6j1s7Jk+Qb40kHArku2KGhL+WpvTX0sHMpcbS6fYp6gbbgNbTktHFp4AdXEkk4V22e4CAYAgEhEpmioI1vmq+6UpaoIOw00bW/1Y7c5HVSJNuYXaO2E/Un4Xs17XnIVmVS5ix4SKHQRqrw7quncdOiQwVuuk5rM4fY0kKqfZ047tsFHCtokDOBaaqTntuwk1oM/QbrMuxVkWRxY11cwYLE9dzwRdf6dHqtUN9EzZUuwwABNCWA3xHsRIAAQKBgQDdTbj+wmrz4yyfVqH/RcgO/EGNoLA+Y98QLo1xnWlTKJ6DO4UgBkKmywfKUi1vC3d852HWaqHkCYOLui2NshNw8YxFcBCudtN3Jw+210vUO3AoqX4w+tRIkrvWmiD1+PCjl4Y7rRJlhf9UVMQizlmLZcnQJ5hhY1o7jFskgq0QAQKBgQDUq5+VhpK5QGz85DCQUn8Mg4yKVVSY/PEKpVdvMGlsc0SO47wnkjF9DoZ0Zyg0LRcQV4FpLI5ubnVPA/wRSGI8fS1XnasoJLQpPowlxvia5SgtSsGHOUgzg1Y7N6/Vx3UxYv/l0bUPMcz1xe6G/KtzXsvkjaT8c4w5YOdKI3aOmwKBgQDF+Fhstnk88dWiOLq0hLVCCpGN49imB2utqydnIrzs4mJi3WTq0A7h7LBsYnU4aFacytRwHnXybDxcS9Gid1IC8GJeX7DckXn8llntY8327rEX/v/fSxOKVJFqmfiwceC7R7qSOfJCFcvioe3PgS8Dj6wo5LLhNCKtMJL8J1YwAQKBgQCKs/Bd/in9hoZOnakKx7My/y0PH74QFZBD6DhRPVrUr4z8QI17pX5/WJTaoFj5RpsvPlMZvEScw4/g2/FveC0R1HZZGW0CvoV+DNws20tTArgkagg0YGi1qCf6cUROAkttzWqmghI7ebh6ZwA9q9dKZH5IbxU2zUmcNpZCpURylwKBgQDEZCQkjBNnVvKYwOqzQFhrSRVwSdiMQqobo1hHbVfWh2MMMWjv/yvh2zUY+JqWvUnKN0l1XAW3YpLBWm9GQUUffujgGLfK2kr6AZgu2cRaWSVDBAMvrouy9Fbv9B70ppvE/3ZxaizSeWgmBgsgUamED3JMjB9YmowQHI5ISx/MTg==",
   //      "notifyUrl": "http://cuntao.tt.w3cmark.com:8000/member/pay/xinlexinpay/not.php",
   //      "sb": true
   //    },
   //    "status": 0,
   //    "sumNum": 13,
   //    "tradeVolume": 0,
   //    "profit": 0
   //  }
}
function randomSort(arr, newArr) {
// 如果原数组arr的length值等于1时，原数组只有一个值，其键值为0
// 同时将这个值push到新数组newArr中
  if(arr.length == 1) {
  newArr.push(arr[0]);
  return newArr; // 相当于递归退出
  }
  // 在原数组length基础上取出一个随机数
  var random = Math.ceil(Math.random() * arr.length) - 1;
  // 将原数组中的随机一个值push到新数组newArr中
  newArr.push(arr[random]);
  // 对应删除原数组arr的对应数组项
  arr.splice(random,1);
  return randomSort(arr, newArr);
}
function AgencyGroupList(){
    var str3 = Random.integer(1,10);
    var permis=Mock.mock({
        "array|1-3": [
          {
            "name|+1": [
              "create",
              "update",
              "delete"
            ]
          }
        ]
      })
    var cpermiss="";
    for(let i=0;i<permis.array.length;i++){
        if(i==0){
          cpermiss+=permis.array[i].name 
        }else{
          cpermiss+=(","+permis.array[i].name) 
        }
        
     }
    let arr=[];  
    for(let i=0;i<str3;i++){
        var arr1=["express_d0","express_t1","gateway"];
        var newArr=[];
        var par=randomSort(arr1,newArr);
        let child=Mock.mock({
          "key|+1":i+1,
          "name": "合作商组-@ctitle(2,4)",
          "channelConfig": [
            "newPayeco",
            "tftpay"
          ],
          "settConfig": [],
          "routeConfig": {
            "retryTime": "@natural(1-100)"
          },
          "agencyLimit": {
            "permission":cpermiss
          },
          "agencyRate|1-3": [
            {
              "rate|0-1.1-5": 1,
              "fee|1-10.0-3": 1,
              "minTransaction|1-10000": 1,
              "maxTransaction|10000-1000000": 20000,
              "autoD0": '@boolean',
              "defaultSaleRate|0-5": {
                "rate|0-1.1-5": 1,
                "fee|1-10.0-3": 1,
                "minTransaction|1-10000": 1,
                "maxTransaction|10000-1000000": 20000,
                "allowCredit": true
              },
              "key|+1": 1,
              "name":function() {
                 
                  return par[this.key-1]
                },
            }
          ],
          "sumNum":str3
        });
        arr.push(child)
    } 
    return arr;
}
function MerchantList(){
    var str3 = Random.integer(1,50);
    let arr=[];  
    for(let i=0;i<str3;i++){
        var banks=Mock.mock({
            city:"@city"
        })
        var arr1=["express_d0","express_t1","gateway"];
        var newArr=[];
        var par=randomSort(arr1,newArr);
        let child=Mock.mock({
          "key|+1":i+1,
          "merchantNo": "@string('number',11)",
          "agencyNo": "@string('number',5)",
          "name": "测试商户-@increment",
          "idCard": "@id",
          "phone": /^1(3|4|5|7|8)\d{9}$/,
          "accountExs": {
            "contract": "@cname",
            "bankCard|1": ["@string('number',16)","@string('number',19)"],
            "bankName":banks.city+"银行",
            "cardMobile|0-1":/^1(3|4|5|7|8)\d{9}$/,
            "email": "@email",
            "password": "@string(30,50)",
            "accountType|1":[0,1],
          },
          "status|1":[0,1],
          "sumNum":str3,
          "config": {
            "notifyUrl": "@url"
          },
          "rate|1-3": [
            {
              "rate|0.1-4":0.23, 
              "minTransaction|1-10000": 1,
              "maxTransaction|10000-200000":10000,
              "allowCredit":"@boolean",
              "key|+1": 1,
              "name":function() {
                 
                  return par[this.key-1]
                }
            }
          ]
        });
        arr.push(child)
    } 
    return arr;
}
function MerchantCapitallist(){
    var str3 = Random.integer(1,50);
    let arr=[];  
    for(let i=0;i<str3;i++){
        let child=Mock.mock({
          "key|+1":i+1,
          "merchantNo":/\d{12,16}/,
          "agencyNo":"@string('number',5,8)",
          "accountingDate":"20170827",
          "tradeVolume|1-100":1,
          "netIncome|1-100":1,
          "withdrawD0|1-1000":1,
          "withdrawT1|1-1000":1,
          "paymentFee|0-10.1-4":0.23,
          "settFeeD0|0-10.1-4":0.23,
          "settFeeD0|0-10.1-4":0.23,
          "settFeeT1|0-10.1-4":0.23,
          "balance|1-1000.0-4":1,
          "inTransit|1-1000.0-4":1,
          "refund|0-1000.0-4":1,
          "freeze|0-1000.0-4":1,
        });
        arr.push(child)
    } 
    return arr;
  
}
function paymentWayList(){
    var str3 = Random.integer(1,10);
    let arr=[];  
    for(let i=0;i<str3;i++){
        let child=Mock.mock({
          "key|+1":i+1,
          "code":"@string('lower',1,2)@increment",
          "name":/[\da-zA-Z]{3,5}/,
          "status|1":[0,1],
          "sumNum":str3
        });
        arr.push(child)
    } 
    return arr;
}
function paymentTypeList(){
    var str3 = Random.integer(1,10);
    let arr=[];  
    for(let i=0;i<str3;i++){
        let child=Mock.mock({
          "key|+1":i+1,
          "name":/[\da-zA-Z]{3,5}/,
          "type|1":["app","pc","wap"],
          "sumNum":str3
        });
        arr.push(child)
    } 
    return arr;
}
const paymentWayData=paymentWayList();
const paymentTypeData=paymentTypeList();

function paymentConfigList(){
    var str3 = 3;
    var methodArr=[];
    var typeArr=[];
    for(let i=0;i<paymentWayData.length;i++){
       methodArr.push(paymentWayData[i].code)
    }
    for(let i=0;i<paymentTypeData.length;i++){
       typeArr.push(paymentTypeData[i].type)
    }
    let arr=[];  
    for(let i=0;i<str3;i++){
        let child=Mock.mock({
          "key|+1":i+1,
          "payCode|1":function(){
            return ["express_d0","payeco_a","tftpay"][this.key-1]
          },
          "name":function(){
            return ["新易联","易联A","腾付通"][this.key-1]
          },
          "method|1":methodArr,
          "type|1":typeArr,
          "status|0-1": 0,
          "sumNum":str3
        });
        arr.push(child)
    } 
    return arr;
}
const deallistData=deallist();
const paychannelData=paychannellist();
const setchannelData=setchannellist();
const settleListData=settleList();
const agencyData=agency();
const AgencyGroupData=AgencyGroupList();
const MerchantData=MerchantList();
const MerchantCapitalData=MerchantCapitallist();

const paymentConfigData=paymentConfigList();
module.exports={
  deallistData,
  settleListData,
  paychannelData,
  setchannelData,
  agencyData,
  AgencyGroupData,
  MerchantData,
  MerchantCapitalData,
  paymentWayData,
  paymentTypeData,
  paymentConfigData
}
