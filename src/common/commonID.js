export default function changeID(objson){
	if(global.belongs==='merchant'){
       objson.merchantId=localStorage.loginId
    }else if(global.belongs==='agency'){
      objson.agencyId=localStorage.loginId
    }else if(global.belongs==='admin'){
       objson.adminId=localStorage.loginId
    }
}