import React, { Component } from 'react';
import {Table} from 'antd';
const bizMetaText = [{
  title: '姓名',
  dataIndex: 'name',
}, {
  title: '电话',
  dataIndex: 'phone',
}, {
  title: '身份证号码',
  dataIndex: 'idCard',
}, {
  title: '银行',
  dataIndex: 'bankName',
}, {
  title: '银行卡号码',
  dataIndex: 'bankCard',
},{
  title: 'bankCode',
  dataIndex: 'bankCode',
}];
/*
, {
  title: 'expirationDate',
  dataIndex: 'expirationDate',
},{
  title: 'cvn2',
  dataIndex: 'cvn2',
}
*/
const profitText = [{  
  title: '是否自动D0',
  dataIndex: 'autoD0',
  render: (text, record, index) => <span>{statusText(text)}</span>
}, {
  title: '手续费',
  dataIndex: 'transactionFee',
},{
 title: '合作商利润',
  dataIndex: 'agencyProfit',
},{
 title: '平台利润',
  dataIndex: 'platformProfit',
},{
 title: '平台名义利润',
  dataIndex: 'fakePlatformProfit',
},{
  title: '是否使用信用卡',
  dataIndex: 'credit',
  render: (text, record, index) => <span>{statusText(text)}</span>
}];
const pay_merchantRate = [{
  title: '是否使用信用卡',
  dataIndex: 'allowCredit',
  render: (text, record, index) => <span>{statusText(text)}</span>
},{
  title: '手续费',
  dataIndex: 'fee',
},{
  title: '费率',
  dataIndex: 'rate',
}, {
  title: '最小限额',
  dataIndex: 'minTransaction',
},{
 title: '最大限额',
  dataIndex: 'maxTransaction',
}];
const set_merchantRate = [{
  title: '手续费',
  dataIndex: 'fee',
},{
  title: '费率',
  dataIndex: 'rate',
}, {
  title: '最小限额',
  dataIndex: 'minTransaction',
},{
 title: '最大限额',
  dataIndex: 'maxTransaction',
},{
 title: 'd0费率',
  dataIndex: 'd0Rate',
},{
 title: 'd0手续费',
  dataIndex: 'd0Fee',
},{
  title: '是否使用信用卡',
  dataIndex: 'allowCredit',
  render: (text, record, index) => <span>{statusText(text)}</span>
}];
const agencyRateinner=[{
  title: '手续费',
  dataIndex: 'fee',
},{
  title: '费率',
  dataIndex: 'rate',
}, {
  title: '最小限额',
  dataIndex: 'minTransaction',
},{
 title: '最大限额',
  dataIndex: 'maxTransaction',
},{
 title: 'd0费率',
  dataIndex: 'd0Rate',
},{
 title: 'd0手续费',
  dataIndex: 'd0Fee',
},{
  title: '是否使用信用卡',
  dataIndex: 'allowCredit',
  render: (text, record, index) => <span>{statusText(text)}</span>
}];
class Createul extends Component{
  render(){
      const lis=agencyRateinner.map((item,index)=>
        <li key={index}>
           <p>
            <span>
             {item.title}
            </span>
            {item.dataIndex==='allowCredit'?
            this.props.item[item.dataIndex]:
            statusText(this.props.item[item.dataIndex])
           }
           </p>
        </li>
      )
    return(
       <ul className='inner-tableul'>
          {lis}
       </ul>
    )
  }
}
const agencyRate = [{
  title: '手续费',
  dataIndex: 'fee',
},{
  title: '费率',
  dataIndex: 'rate',
}, {
  title: '最小限额',
  dataIndex: 'minTransaction',
},{
 title: '最大限额',
  dataIndex: 'maxTransaction',
},{
 title: '是否自动D0',
  dataIndex: 'autoD0',
  render: (text, record, index) => <span>{statusText(text)}</span>
}];
/*
,{
  title: 'defaultSaleRate',
  dataIndex: 'defaultSaleRate',
  render: (text, record, index) =>  <span>{JSON.stringify(record.defaultSaleRate)}</span>
}
*/
const pay_channelRateText= [{
  title: '手续费',
  dataIndex: 'fee',
},{
  title: '费率',
  dataIndex: 'rate',
}, {
  title: '最小限额',
  dataIndex: 'minTransaction',
},{
 title: '最大限额',
  dataIndex: 'maxTransaction',
},{
 title: '信用卡费率',
  dataIndex: 'creditRate',
},
{
  title: '名义费率',
  dataIndex: 'fakeRate',
},{
   title: '是否使用信用卡',
  dataIndex: 'allowCredit',
  render: (text, record, index) => <span>{statusText(text)}</span>
},{
   title: '是否自动D0',
  dataIndex: 'autoD0',
  render: (text, record, index) => <span>{statusText(text)}</span>
}
];
const set_channelRateText= [{
  title: '手续费',
  dataIndex: 'fee',
},{
  title: '费率',
  dataIndex: 'rate',
}, {
  title: '最小限额',
  dataIndex: 'minTransaction',
},{
 title: '最大限额',
  dataIndex: 'maxTransaction',
},{
   title: '是否使用d0',
  dataIndex: 'allowD0',
  render: (text, record, index) => <span>{statusText(text)}</span>
},{
 title: 'd0费率',
  dataIndex: 'd0Rate',
},{
 title: 'd0手续费',
  dataIndex: 'd0Fee',
}
];
function statusText(text){
  if(text===true){
    return '是';
  }
  if(text===false){
    return '否';
  }
   
}
export {bizMetaText,profitText,pay_merchantRate,set_merchantRate,agencyRate,pay_channelRateText,set_channelRateText}