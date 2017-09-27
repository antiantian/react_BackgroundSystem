import React from 'react'
import { Router, Route, IndexRedirect ,IndexRoute,Redirect } from 'react-router'
import WrappedNormalLoginForm from './login';
import DealList from './deal/dealList';           //交易列表
import DealDetals from './deal/dealDetals';
import SettleList from './deal/settleList';       //交易结算列表
import FlowDetails from './deal/flowDetails';
import OffcialList from './official/offcialList';  //合作商
import AddOffcial from './official/addOffcial';
import GroupList from './official/groupList';
import AddGroup from './official/addGroup';
import MerchantList from './merchant/merchantList'; //商户
import MerchantCapital from './merchant/MerchantCapital'; //商户
import MerchantCapitaDetail from './merchant/MerchantCapitaDetail';
import AddMerchant from './merchant/addMerchant'; 
import PaymentWay from './settings/paymentWay';
import PaymentType from './settings/paymentType';
import PaymentChannel from './settings/paymentChannel';
import EditSettlement from './settings/editSettlement';
import AddPaymentType from './settings/addPaymentType';
import AddPaymentWay from './settings/addPaymentWay';
import SettlementList from './settings/settlementList';
import PaymentConfiguration from './settings/paymentConfiguration';
import AddPaymentConfiguration from './settings/addPaymentConfiguration';
import AddPaymentChannel from './settings/addPaymentChannel';
import Pwdchange from './user/pwdchange';//修改密码
import LayoutSlider from './layout';
import Fail from './404';
import './css/style.css';
import layoutlist from './layoutlist';
  console.log(localStorage.whiteBlackList)
class RouteMap extends React.Component { 
  state = {
    initlist:localStorage.whiteBlackList&&JSON.parse(localStorage.whiteBlackList)["layoutlist"]?JSON.parse(localStorage.whiteBlackList)["layoutlist"]:layoutlist
  }
  updateHandle() { 
      //console.log(this.state.initlist) //不会改变
      // console.log(localStorage.layoutlist?JSON.parse(localStorage.layoutlist).list_url:null)
  } 
  render() { 
    return ( 
       <Router history={this.props.history} onUpdate={this.updateHandle.bind(this)}> 
          <Route path="/login" component={WrappedNormalLoginForm}/>
          <Route path="/layout" component={LayoutSlider} onEnter={requireCredentials}>
                 <IndexRoute component={DealList} onEnter={requireCredentials}/> 
                 <Route path="/Pwdchange" component={Pwdchange} onEnter={requireCredentials}/>
                 <Route path="/dealDetals" component={DealDetals} onEnter={requireCredentials}>
                   <Route path="/dealDetals/:id" component={DealDetals} onEnter={requireCredentials}/>
                </Route> 
                <Route path="/settleList" component={SettleList} onEnter={requireCredentials}/>
                <Route path="/flowDetails" component={FlowDetails} onEnter={requireCredentials}>
                  <Route path="/flowDetails/:id" component={FlowDetails} onEnter={requireCredentials}/>
                </Route>      
                <Route exact path="/offcialList" component={OffcialList} onEnter={requireCredentials}/>
                <Route path="/groupList" component={GroupList} onEnter={requireCredentials}/>
                <Route path="/addGroup" component={AddGroup} onEnter={requireCredentials}/>
                <Route path="/addOffcial" component={AddOffcial} onEnter={requireCredentials}/>
                <Route exact path="/merchantList" component={MerchantList} onEnter={requireCredentials}/> 
                <Route exact path="/merchantCapital" component={MerchantCapital} onEnter={requireCredentials}/>
                <Route exact path="/merchantCapitaDetail" component={MerchantCapitaDetail} onEnter={requireCredentials}/>
                <Route path="/addMerchant" component={AddMerchant} onEnter={requireCredentials} />                  
                <Route path="/paymentWay" component={PaymentWay}  onEnter={requireCredentials}/>
                <Route path="/paymentType" component={PaymentType} onEnter={requireCredentials}/>
                <Route path="/paymentConfiguration" component={PaymentConfiguration} onEnter={requireCredentials}/>
                <Route path="/paymentChannel" component={PaymentChannel} onEnter={requireCredentials} />
                <Route path="/addPaymentType" component={AddPaymentType} onEnter={requireCredentials}/>
                <Route path="/addPaymentWay" component={AddPaymentWay} onEnter={requireCredentials} />
                <Route path="/addPaymentConfiguration" component={AddPaymentConfiguration} onEnter={requireCredentials} />
                <Route path="/addPaymentChannel" component={AddPaymentChannel} onEnter={requireCredentials}/>
                <Route path="/settlementList" component={SettlementList} onEnter={requireCredentials}/>
                <Route path="/editSettlement" component={EditSettlement} onEnter={requireCredentials}/>
          </Route>
          <Route path="/" >
                <IndexRedirect to="/login" />
          </Route>
          <Route path='/404' component={Fail} />
          <Redirect from='*' to='/404' />  
      </Router> 
    ) 
  } 
}   
export default RouteMap;

 //权限控制的中间服务
function requireCredentials(nextState, replace, next) {
  //获取传输过来的数据
  const repathname=nextState.location.pathname;
  if (hadINDEX(repathname)) {
    
    next()
   
  } else {
    replace('/404')
    next()
  }
}　　
function hadINDEX(pathnamepara){
   //截取路径 因为有的会带参数
   let pathname="/"+pathnamepara.split("/")[1];
   let initlist=localStorage.whiteBlackList&&JSON.parse(localStorage.whiteBlackList).layoutlist?JSON.parse(localStorage.whiteBlackList).layoutlist:layoutlist;
         let pathARR=[];
        for(let i=0;i<initlist.length;i++){
           const par=initlist[i].children;
           for(let j=0;j<par.length;j++){
              pathARR.push({
                  path:par[j].path,
                  par:initlist[i].parent,
                  child:par[j].details,
              });
           }
        }
        pathARR.push({
          path:'/Pwdchange',
          par:'sub1',
        })
    let nesArray=pathARR;
    let had=false;
    for(let i=0;i<nesArray.length;i++){
       if(nesArray[i].path===pathname||nesArray[i].child===pathname){
          had=true;
          break
       }
    }
    return had
}