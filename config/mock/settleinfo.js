const {settleListData} =require('./data');
const {payType,finishDate} =require('./utils');
const Mock = require('mockjs');
 var Random = Mock.Random;
function settleInfoData(orderNo){
    var deallistData=settleListData;
    var data={};
    for(let i=0;i<deallistData.length;i++){
        if(deallistData[i].orderNo==orderNo){
             data= Mock.mock({
                "successList": [
                  {
                    "key": 1,
                    "accountNo": "6226********3555",
                    "accountName": "方致远",
                    "bankName": "招商银行武汉分行青山支行",
                    "province": null,
                    "city": null,
                    "amount": 170,
                    "phone": "18651863403",
                    "idCard": "420***********0417"
                  }
                ],
                "failList": [],
                "pendingList": [],
                "orderNo": deallistData[i].orderNo,
                "createDate": deallistData[i].createDate,
                "updateDate": deallistData[i].updateDate,
                "payType": deallistData[i].payType,
                "amount": deallistData[i].amount,
                "fee":deallistData[i].fee,
                "status": deallistData[i].status,
                "updateDetails": [
                  {
                    "key": 1,
                    "msg": "settlement.create",
                    "date": "2017-08-02 20:11:20"
                  },
                  {
                    "key": 2,
                    "msg": "settlement.create",
                    "date": "2017-08-02 20:11:22"
                  },
                  {
                    "key": 3,
                    "msg": "处理完成",
                    "date": "2017-08-02 20:25:36"
                  }
                ],
                "relatedOrderNo": deallistData[i].relatedOrderNo,
                "merchantNo":deallistData[i].merchantNo,
                "agencyNo": deallistData[i].agencyNo,
                "channelSettlementNo": deallistData[i].channelSettlementNo,
                "merchantSettlementNo":deallistData[i].merchantSettlementNo,
                "settlementCode":deallistData[i].settlementCode,
                "netAmount": deallistData[i].netAmount,
                "settMerchantRate": [
                  {
                    "key": 0,
                    "allowCredit": false
                  }
                ],
                "agencyRate": [
                  {
                    "autoD0": false,
                    "key": 0
                  }
                ],
                "settChannelRateText": [
                  {
                    "rate": "0",
                    "fee": "0",
                    "minTransaction": "10",
                    "maxTransaction": "200000",
                    "key": 0,
                    "d0Rate": "0",
                    "d0Fee": "0",
                    "allowD0": true
                  }
                ],
                "merchantConfigText": [
                  {
                    "key": 0
                  }
                ],
                "feeText": [
                  {
                    "key": 0,
                    "autoD0": false,
                    "transactionFee": 2,
                    "platformProfit": 2,
                    "credit": false
                  }
                ]
              })
              
              break;     
        }
    }
    return data;
}


module.exports=settleInfoData;