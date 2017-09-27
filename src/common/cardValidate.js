'use strict';
// 构造函数，变量为15位或者18位的身份证号码
import React, { Component } from 'react';
import {message} from 'antd';
message.config({
  top: 60,
  duration: 2,
});

function clsIDCard(CardNo) {
  this.Valid=false;
  this.ID15='';
  this.ID18='';
  this.Local='';
  if(CardNo!=null)this.SetCardNo(CardNo);
}

// 设置身份证号码，15位或者18位
clsIDCard.prototype.SetCardNo = function(CardNo) {
  this.ID15='';
  this.ID18='';
  this.Local='';
  CardNo=CardNo.replace(" ","");
  var strCardNo;
  var pattern;
  if(CardNo.length==18) {
    pattern= /^\d{17}(\d|x|X)$/;
    if (pattern.exec(CardNo)==null)return;
    strCardNo=CardNo.toUpperCase();
  } else {
    pattern= /^\d{15}$/;
    if (pattern.exec(CardNo)==null)return;
    strCardNo=CardNo.substr(0,6)+'19'+CardNo.substr(6,9)
    strCardNo+=this.GetVCode(strCardNo);
  }
  this.Valid=this.CheckValid(strCardNo);
}

// 校验身份证有效性
clsIDCard.prototype.IsValid = function() {
  return this.Valid;
}

// 返回生日字符串，格式如下，1981-10-10
clsIDCard.prototype.GetBirthDate = function() {
  var BirthDate='';
  if(this.Valid)BirthDate=this.GetBirthYear()+'-'+this.GetBirthMonth()+'-'+this.GetBirthDay();
  return BirthDate;
}

// 返回生日中的年，格式如下，1981
clsIDCard.prototype.GetBirthYear = function() {
  var BirthYear='';
  if(this.Valid)BirthYear=this.ID18.substr(6,4);
  return BirthYear;
}

// 返回生日中的月，格式如下，10
clsIDCard.prototype.GetBirthMonth = function() {
  var BirthMonth='';
  if(this.Valid)BirthMonth=this.ID18.substr(10,2);
  if(BirthMonth.charAt(0)=='0')BirthMonth=BirthMonth.charAt(1);
  return BirthMonth;
}

// 返回生日中的日，格式如下，10
clsIDCard.prototype.GetBirthDay = function() {
  var BirthDay='';
  if(this.Valid)BirthDay=this.ID18.substr(12,2);
  return BirthDay;
}

// 返回性别，1：男，0：女
clsIDCard.prototype.GetSex = function() {
  var Sex='';
  if(this.Valid)Sex=this.ID18.charAt(16)%2;
  return Sex;
}

// 返回15位身份证号码
clsIDCard.prototype.Get15 = function() {
  var ID15='';
  if(this.Valid)ID15=this.ID15;
  return ID15;
}

// 返回18位身份证号码
clsIDCard.prototype.Get18 = function() {
  var ID18='';
  if(this.Valid)ID18=this.ID18;
  return ID18;
}

// 返回所在省，例如：上海市、浙江省
clsIDCard.prototype.GetLocal = function() {
  var Local='';
  if(this.Valid)Local=this.Local;
  return Local;
}

clsIDCard.prototype.GetVCode = function(CardNo17) {
  var Wi = new Array(7,9,10,5,8,4,2,1,6,3,7,9,10,5,8,4,2,1);
  var Ai = new Array('1','0','X','9','8','7','6','5','4','3','2');
  var cardNoSum = 0;
  for (var i=0; i<CardNo17.length; i++)cardNoSum+=CardNo17.charAt(i)*Wi[i];
  var seq = cardNoSum%11;
  return Ai[seq];
}

clsIDCard.prototype.CheckValid = function(CardNo18) {
  if(this.GetVCode(CardNo18.substr(0,17))!=CardNo18.charAt(17))return false;
  if(!this.IsDate(CardNo18.substr(6,8)))return false;
  var aCity={11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江 ",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北 ",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏 ",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外"};
  if(aCity[parseInt(CardNo18.substr(0,2))]==null)return false;
  this.ID18=CardNo18;
  this.ID15=CardNo18.substr(0,6)+CardNo18.substr(8,9);
  this.Local=aCity[parseInt(CardNo18.substr(0,2))];
  return true;
}

clsIDCard.prototype.IsDate = function(strDate) {
  var r = strDate.match(/^(\d{1,4})(\d{1,2})(\d{1,2})$/);
  if(r==null)return false;
  var d= new Date(r[1], r[2]-1, r[3]);
  return (d.getFullYear()==r[1]&&(d.getMonth()+1)==r[2]&&d.getDate()==r[3]);
}
//验证银行卡号码
var CheckBankNo=function(bankno){
	 this.bankno=bankno;
}
CheckBankNo.prototype={
	isNum:function(){
		var num = /^\d*$/; //全数字
		if (num.exec(this.bankno)==null) {
		    //alert("银行卡号必须全为数字");
		    return false;
		}else{
			return true
		}
	},
    validateLen:function(){
		if (this.bankno.length < 16 || this.bankno.length > 19) {
		   //alert("银行卡号长度必须在16到19之间");
		   return false;
		}else{
			return true
		}
	},
    beginNum:function(){
		var strBin="10,18,30,35,37,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,58,60,62,65,68,69,84,87,88,94,95,98,99";
		if (strBin.indexOf(this.bankno.substring(0, 2))== -1) {
		   //alert("银行卡号开头6位不符合规范");
		   return false;
		}else{
			return true
		}
	},
    luhm:function(){
		var bankno=this.bankno;
		var lastNum=bankno.substr(bankno.length-1,1);//取出最后一位（与luhm进行比较）
		var first15Num=bankno.substr(0,bankno.length-1);//前15或18位
		var newArr=new Array();
		for(var i=first15Num.length-1;i>-1;i--){ //前15或18位倒序存进数组
		     newArr.push(first15Num.substr(i,1));
		}
		var arrJiShu=new Array(); //奇数位*2的积 <9
		var arrJiShu2=new Array(); //奇数位*2的积 >9
		var arrOuShu=new Array(); //偶数位数组
		for(var j=0;j<newArr.length;j++){
			if((j+1)%2==1){//奇数位
			if(parseInt(newArr[j])*2<9)
			arrJiShu.push(parseInt(newArr[j])*2);
			else
			arrJiShu2.push(parseInt(newArr[j])*2);
			}
			else //偶数位
			arrOuShu.push(newArr[j]);
		}
		var jishu_child1=new Array();//奇数位*2 >9 的分割之后的数组个位数
		var jishu_child2=new Array();//奇数位*2 >9 的分割之后的数组十位数
		for(var h=0;h<arrJiShu2.length;h++){
		jishu_child1.push(parseInt(arrJiShu2[h])%10);
		jishu_child2.push(parseInt(arrJiShu2[h])/10);
		}
		var sumJiShu=0; //奇数位*2 < 9 的数组之和
		var sumOuShu=0; //偶数位数组之和
		var sumJiShuChild1=0; //奇数位*2 >9 的分割之后的数组个位数之和
		var sumJiShuChild2=0; //奇数位*2 >9 的分割之后的数组十位数之和
		var sumTotal=0;
		for(var m=0;m<arrJiShu.length;m++){
			sumJiShu=sumJiShu+parseInt(arrJiShu[m]);
		}
		for(var n=0;n<arrOuShu.length;n++){
			sumOuShu=sumOuShu+parseInt(arrOuShu[n]);
		}
		for(var p=0;p<jishu_child1.length;p++){
			sumJiShuChild1=sumJiShuChild1+parseInt(jishu_child1[p]);
			sumJiShuChild2=sumJiShuChild2+parseInt(jishu_child2[p]);
		}
		//计算总和
		sumTotal=parseInt(sumJiShu)+parseInt(sumOuShu)+parseInt(sumJiShuChild1)+parseInt(sumJiShuChild2);
		//计算Luhm值
		var k= parseInt(sumTotal)%10==0?10:parseInt(sumTotal)%10;
		var luhm= 10-k;
		if(lastNum==luhm){
			//alert("Luhm验证通过");
			return true;
		}
		else{
			//alert("银行卡号必须符合Luhm校验");
			return false;
		}
	}	
}	
//验证手机号码 
var CheckPhoneNo=function(PhoneNo){
	 this.PhoneNo=PhoneNo;
}
CheckPhoneNo.prototype={
	 hasNum:function(){
		var num = this.PhoneNo;
		if (num==''||num==undefined||num==null) {
		    //alert("不能为空");
		    return false;
		}else{
			return true
		}
	},
	fitNumber:function(){
		var num = this.PhoneNo;
		if(num.length != 11){
			return false;
		}else{
			return true
		}
	},
	rightNumber:function(){
		var myreg = /^(((13[0-9]{1})|(14[0-9]{1})|(17[0]{1})|(15[0-3]{1})|(15[5-9]{1})|(18[0-9]{1}))+\d{8})$/;
		if(!myreg.test(this.PhoneNo)){	
			return false;
		}else{
			return true
		}
	}
}
　function CheckBankNo2(bankno){
        
        var num = /^\d*$/; //全数字
		if (!num.exec(bankno)) {
		alert("银行卡号必须全为数字");
		    return false;
		}
		
		if (bankno.length < 16 || bankno.length > 19) {
		alert("银行卡号长度必须在16到19之间");
		   return false;
		}
		
		//开头6位
		var strBin="10,18,30,35,37,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,58,60,62,65,68,69,84,87,88,94,95,98,99";
		if (strBin.indexOf(bankno.substring(0, 2))== -1) {
		alert("银行卡号开头6位不符合规范");
		   return false;
		}
		var lastNum=bankno.substr(bankno.length-1,1);//取出最后一位（与luhm进行比较）
		var first15Num=bankno.substr(0,bankno.length-1);//前15或18位
		var newArr=new Array();
		for(var i=first15Num.length-1;i>-1;i--){ //前15或18位倒序存进数组
		     newArr.push(first15Num.substr(i,1));
		}
		var arrJiShu=new Array(); //奇数位*2的积 <9
		var arrJiShu2=new Array(); //奇数位*2的积 >9
		var arrOuShu=new Array(); //偶数位数组
		for(var j=0;j<newArr.length;j++){
			if((j+1)%2==1){//奇数位
			if(parseInt(newArr[j])*2<9)
			arrJiShu.push(parseInt(newArr[j])*2);
			else
			arrJiShu2.push(parseInt(newArr[j])*2);
			}
			else //偶数位
			arrOuShu.push(newArr[j]);
		}
		var jishu_child1=new Array();//奇数位*2 >9 的分割之后的数组个位数
		var jishu_child2=new Array();//奇数位*2 >9 的分割之后的数组十位数
		for(var h=0;h<arrJiShu2.length;h++){
		jishu_child1.push(parseInt(arrJiShu2[h])%10);
		jishu_child2.push(parseInt(arrJiShu2[h])/10);
		}
		var sumJiShu=0; //奇数位*2 < 9 的数组之和
		var sumOuShu=0; //偶数位数组之和
		var sumJiShuChild1=0; //奇数位*2 >9 的分割之后的数组个位数之和
		var sumJiShuChild2=0; //奇数位*2 >9 的分割之后的数组十位数之和
		var sumTotal=0;
		for(var m=0;m<arrJiShu.length;m++){
			sumJiShu=sumJiShu+parseInt(arrJiShu[m]);
		}
		for(var n=0;n<arrOuShu.length;n++){
			sumOuShu=sumOuShu+parseInt(arrOuShu[n]);
		}
		for(var p=0;p<jishu_child1.length;p++){
			sumJiShuChild1=sumJiShuChild1+parseInt(jishu_child1[p]);
			sumJiShuChild2=sumJiShuChild2+parseInt(jishu_child2[p]);
		}
		//计算总和
		sumTotal=parseInt(sumJiShu)+parseInt(sumOuShu)+parseInt(sumJiShuChild1)+parseInt(sumJiShuChild2);
		//计算Luhm值
		var k= parseInt(sumTotal)%10==0?10:parseInt(sumTotal)%10;
		var luhm= 10-k;
		if(lastNum==luhm){
			alert("Luhm验证通过");
			return true;
		}
		else{
			alert("银行卡号必须符合Luhm校验");
			return false;
		}
	}
 function NoToChinese(num) { 
		if (!/^\d*(\.\d*)?$/.test(num)) { alert("Number is wrong!"); return "Number is wrong!"; } 
		var AA = new Array("零", "壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖"); 
		var BB = new Array("", "拾", "佰", "仟", "萬", "億", "点", ""); 
		var a = ("" + num).replace(/(^0*)/g, "").split("."), k = 0, re = ""; 
		for (var i = a[0].length - 1; i >= 0; i--) { 
		switch (k) { 
		case 0: re = BB[7] + re; break; 
		case 4: if (!new RegExp("0{4}\\d{" + (a[0].length - i - 1) + "}$").test(a[0])) 
		re = BB[4] + re; break; 
		case 8: re = BB[5] + re; BB[7] = BB[5]; k = 0; break; 
		} 
		if (k % 4 == 2 && a[0].charAt(i + 2) != 0 && a[0].charAt(i + 1) == 0) re = AA[0] + re; 
		if (a[0].charAt(i) != 0) re = AA[a[0].charAt(i)] + BB[k % 4] + re; k++; 
		} 

		if (a.length > 1) //加上小数部分(如果有小数部分) 
		{ 
		re += BB[6]; 
		for (var i = 0; i < a[1].length; i++) re += AA[a[1].charAt(i)]; 
		} 
		return re; 
	} 
function ValidateCards(i){ 

	       let next=true;
	       let mess='';
	       if(i.type=="phone"){
				 if(i.con==''||i.con==undefined){
				
					//message.warning('请填写手机号');
					mess='请填写手机号';
					next=false;
					return {next:next,message:mess}
				 }else{
					const _consigneePhone=trim(i.con);
					if(_consigneePhone.length != 11){
						//message.warning('您输入的手机号位数不对');
						mess='您输入的手机号位数不对';
						next=false;
					    return {next:next,message:mess}
					}
					var myreg = /^(((13[0-9]{1})|(14[0-9]{1})|(17[0]{1})|(15[0-3]{1})|(15[5-9]{1})|(18[0-9]{1}))+\d{8})$/;
					if(!myreg.test(_consigneePhone)){
						//message.warning('请输入正确的手机号码！');
						mess='请输入正确的手机号码！';
						next=false;
					    return {next:next,message:mess}
					}
				 }
					 
			 }
             if(i.type=="idcard"){
				if(i.con==''||i.con==undefined){
				    if(!i.initIdCard){
				    	//message.warning('请填写身份证号');
						mess='请填写身份证号';
						next=false;
						return {next:next,message:mess}
				    }
					
				 }else{
					  var checkFlag = new clsIDCard(i.con);
					  if(i.con.length!=18&&i.con.length!=15){
                          mess='身份证号长度不对！';
					      next=false;
					      return {next:next,message:mess}
					  }
					  if (!checkFlag.IsValid()) {
					   //message.warning("输入的身份证号无效,请输入真实的身份证号！");
					   mess='请输入真实的身份证号！';
					   next=false;
					   return {next:next,message:mess}
					  }
				 } 	 
			 }	 
			 if(i.type=="banknum"){
				if(i.con==''||i.con==undefined){
				
					///message.warning('请填写银行卡号');
					mess='请填写银行卡号';
					next=false;
					return {next:next,message:mess}
				 }else{
					  i.con=trim(i.con);
					  var checkFlag =new CheckBankNo(i.con);
					  if (!checkFlag.isNum()) {
					   //message.warning("银行卡号必须全为数字");
					   mess='银行卡号必须全为数字';
					   next=false;
					   return {next:next,message:mess}
					  }
					  if (!checkFlag.validateLen()) {
					   //message.warning("银行卡号长度必须在16到19之间");
					   mess='银行卡号长度必须在16到19之间';
					   next=false;
					   return {next:next,message:mess}
					  }
					  if (!checkFlag.beginNum()) {
					   //message.warning("银行卡号开头6位不符合规范")
					   mess='银行卡号开头6位不符合规范';
					   next=false;
					   return {next:next,message:mess}
					  }
					  if (!checkFlag.luhm()) {
					   //message.warning("银行卡号必须符合Luhm校验");
					   mess='银行卡号必须符合Luhm校验';
					   next=false;
					   return {next:next,message:mess}
					  }
				 } 	  
			 }
           
			return {next:next,message:mess}
}	
function trim(s){
    return s.replace(/(^\s*)|(\s*$)/g, "");
}  

export{
  clsIDCard,
  CheckBankNo,
  CheckPhoneNo,
  NoToChinese,
  ValidateCards
};
