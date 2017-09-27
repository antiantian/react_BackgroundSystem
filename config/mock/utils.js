const  moment =require('moment');
function finishDate(text){
  if(text==null){
    return '';
  }else{
    return moment(text).format('YYYY-MM-DD HH:mm:ss');
  }
}
function bizType(text){
    if (text == -1) {
    return text;
  }else if (text =="pay") {
   return '支付'
} else if (text =="settlement") {
  return '代付'
} else if (text =="settlement-auto") {
  return '自动代付'
} 
}
function payType(text){
  if(text=='express_t1'){
    return '快捷支付T1';
  }
  if(text=='express_d0'){
    return '快捷支付D0';
  }
  if (text == 'gateway') {
    return '网关';
  }
  if(text=='-1'){
    return '全部';
  }
}
function dai_payType(text){   
  if (text == -1) {
    return text;
  }
  else if (text == 0) {
    return '余额代付'
  } else if (text == 1) {
    return '垫资代付'
  }
}
function dai_paystatus(text) {
  if (text == -1) {
    return text;
  }
  else if (text == 0) {
    return '代付中'
  } else if (text == 2) {
    return '代付成功'
  } else if (text == 3) {
    return '代付失败'
  } else if (text == 5) {
    return '部分失败'
  }
}
function statusText(text){   
  if(text==-1){
    return text;
  }
  if(text==0){
    return '未支付';
  }
  if(text==1){
    return '支付中';
  }
   if(text==2){
    return '支付成功';
  }
  if(text==3){
    return '支付失败';
  }
}
//交易 交易状态
const data_gender=[
  {
    val:'-1',
    text:'全部'
  },
  {
    val:'0',
    text:'未支付'
  },
  {
    val:'1',
    text:'支付中'
  },
  {
    val:'2',
    text:'支付成功'
  },
  {
    val:'3',
    text:'支付失败'
  },
]
//交易 交易类型
const data_express=[
 {
    val:'-1',
    text:'全部'
  },
  {
    val:'express_t1',
    text:'快捷支付T1'
  },
  {
    val:'express_d0',
    text:'快捷支付D0'
  }
]
//
const data_express_deal=[  
 {
    val:'-1',
    text:'全部'
  },
  {
    val:'express_t1',
    text:'快捷支付T1'
  },
  {
    val:'express_d0',
    text:'快捷支付D0'
  },
  {
    val:'gateway',
    text:'网关'
  }
]
//代付 代付交易类型
const data_settleType=[  
  {
    val:'-1',
    text:'全部'
  },
  {
    val:'0',
    text:'余额代付'
  },
  {
    val:'1',
    text:'垫资代付'
  }
]
//代付代付状态
const data_settleStatus=[
 {
    val:'-1',
    text:'全部'
  },
  {
    val:'0',
    text:'代付中'
  },
  {
    val:'2',
    text:'代付成功'
  },
  {
    val:'3',
    text:'代付失败'
  },
  {
    val:'5',
    text:'部分失败'
  }
]
//是否启用
function Open_disable(text){
  if(text==0){
    return '开启';
  }
  if(text==1){
    return '禁用';
  }
}
//收款账户类型
function CollectionAccountType(text){
  if(text==0){
    return '个人';
  }
  if(text==1){
    return '公户';
  }
}
//转换内容
function accountExs(record,parent,child){
 if(record[parent]){
     if(child==='accountType'){
        return CollectionAccountType(record[parent][child])
     }else{
        return record[parent][child] 
     }
    
 }else{
   return '-'
 }
}
function trim(s){
    return s.replace(/(^\s*)|(\s*$)/g, "");
}

module.exports={
  finishDate,
  bizType,
  payType,
  dai_payType,
  dai_paystatus,
  statusText,
  data_gender,
  data_express,
  data_express_deal,
  data_settleType,
  data_settleStatus,
  accountExs,
  CollectionAccountType,
  Open_disable,
  trim
}

