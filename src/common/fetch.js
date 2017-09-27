import {message} from 'antd';
import {hashHistory} from 'react-router';
message.config({
  top: 60,
  duration: 2,
});
export default function newfetch(obj){
   var url=obj.url;
   if(!url){
    message.warning('请求网址未填写');
        return
   }
   var requestJson=obj.jsonp;
   var bodyjsonp="";
     if(!requestJson){
      message.warning('请求数据未填写');
        return
     }else{
        var arr=[];
        for(let key in requestJson){
          arr.push(key)
        }
    for(let i=0;i<arr.length;i++){
      var keyObj=arr[i];
      if(i===0){
        bodyjsonp+=keyObj+"="+requestJson[keyObj]
      }else{
         bodyjsonp+="&"+arr[i]+"="+requestJson[keyObj]
          }
      } 
    }     
    fetch(url, {
          method: 'POST',
         mode: 'cors',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
        },
        dataType:'jsonp',
        body: bodyjsonp
      })
     .then((response) => response.json()) //把response转为json
     .then((responseData) => { // 上面的转好的json
        if('200' === responseData.code){
          if(responseData.data&&responseData.data.token){
            global.token = responseData.data.token;
          }
           obj.func200(responseData);
        } else if('201' === responseData.code){
          if(obj.func201){
            obj.func201(responseData);
          }
           message.warning(responseData.msg);
           return false;
        } else if(responseData.code === '400') {
          message.warning(responseData.msg );
          localStorage.clear();
          hashHistory.push('/login');
          return false;
        } else {
          message.warning(responseData.msg);
          return false;
        }
     })
     .catch((error)=> {
       message.warning('系统异常，请稍后再试3！');
       return false;
     })
      
}