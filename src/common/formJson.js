/*
  构造函数 定义公共属性 在多个页面共享数据
*/
const jsonTwo={
		settlementType_value: 0, //付款类型
		accountType_value: 0,//账户类型
		accountNo_value:'',//账户类型
		bankName_value:'',//开户行
		accountName_value:'',//收款方名称
		zbankNo_value:'',//联行号
        zbankName_value:'',//联行名称
		IdCard_value:'',//身份证号
		amount_value:'',//代付金额
		phone_value:''//手机号
}
const jsonOne={
		settlementType_value: 0, //付款类型
		accountType_value: 0,//账户类型
		accountNo_value:'',//账户类型
		bankName_value:'',//开户行
		accountName_value:'',//收款方名称
		zbankNo_value:'',//联行号
        zbankName_value:'',//联行名称
		IdCard_value:'',//身份证号
		amount_value:'',//代付金额
		phone_value:''//手机号
}
function FormMess(){
       Object.defineProperty(this,"name",{
		 enumerable :false, //可枚举，默认为false
		 configurable:false, //可配置
		 writable:false,
		 value:jsonOne
	   });
       this.obj=jsonTwo;
}

FormMess.prototype ={
       constructor:FormMess,
        reset:function(){
         // this.obj=this.name;
         // 直接替换是错误的 作用域即使名字相同也不是同一个 需要改变值
		    var parent=this.obj;
			var father=this.name;
       	    for (var i in parent) {  
			  for(var k in father){
				   if(i===k){
					  parent[i]=father[k]; 
				   }
			  }
       	      //parent[i]='';
			}
			return this.obj
       },
       getAll:function(){
       	  return this.obj
       },
       getForm:function(name){
       	    var parent=this.obj;
       	    var final=null;
       	    for (var i in parent) {  
       	      if(name===i){
                 final=parent[i];
                 break;
       	      }  
			}
			return final
       },
       setForm:function(name,item){
            var parent=this.obj;
       	    for (var i in parent) {  
       	      if(name===i){
                 parent[i]=item;
                 break;
       	      }  
			}
			return this.obj
       }
     }
export { FormMess, jsonTwo, jsonOne };