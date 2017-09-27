//通用接口设置
global.belongs="admin";
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
//api.resourcePath+api.refresh
let host = "http://192.168.1.115:8083/";  
export {host as default,api};
