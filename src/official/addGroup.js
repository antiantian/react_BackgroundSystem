import React,{Component} from 'react';
import {Row, Col, Button, Select, Form, Input, Icon, Switch,Radio,message} from 'antd';
import update from 'react/lib/update';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import DragSelect from '../EditAddCommon/DragSelect';
import {hashHistory} from 'react-router';
import host from '../config.js';
import {api} from '../config.js';
import newfetch from './../common/fetch';
import changeID from './../common/commonID';
import {trim} from './../common/util';
import {NewSelect} from './../common/resetAntd';
import CreatePay from './../EditAddCommon/addPaymentChannel_CreatePay';
import {ValidateEA,postObject,rateJson_Change} from '../EditAddCommon/EAcommon';
import {groupRate} from '../EditAddCommon/FormParamsCommon';
import {messParams,messChildParams,returnAddEdit} from './../common/util';
const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;
class AddGroup extends React.Component {
    constructor(props){
      super(props);
      this.mess=this.props.location.state?this.props.location.state.mess:null; 
      this.returnAddEdit=returnAddEdit;
      this.state = {
      key:messParams(this.mess,'key'),
      name:messParams(this.mess,'name'),
      channelConfig:messParams(this.mess,'channelConfig','arr'),
      settConfig:messParams(this.mess,'settConfig','arr'),
      mode:messChildParams(this.mess,'routeConfig','mode'),
      retryTime:messChildParams(this.mess,'routeConfig','retryTime'),
      permission:messChildParams(this.mess,'agencyLimit','permission'),
      inTransitLimit:messChildParams(this.mess,'agencyLimit','inTransitLimit'),
      balanceLimit:messChildParams(this.mess,'agencyLimit','balanceLimit'),
      allInTransitLimit:messChildParams(this.mess,'agencyLimit','allInTransitLimit'),
      allBalanceLimit:messChildParams(this.mess,'agencyLimit','allBalanceLimit'),
      agencyRate:messParams(this.mess,'agencyRate'),
      routeConfig:messParams(this.mess,'routeConfig','obj'),
      routeConfig_Arr:["mode","retryTime"],
      agencyLimit_Arr:["permission","inTransitLimit","balanceLimit","allInTransitLimit","allBalanceLimit"],
      agencyLimit:messParams(this.mess,'agencyLimit','obj'),
      isAdd:this.props.location.state.isAdd, //0 add 1 edit
      agencyRateJson:[],
      ratenames:[],
      rateNecsssary:['minTransaction','maxTransaction','rate'],
      channelConfig_Data:[],//支付渠道配置
      settConfig_Data:[],//
      PayConfigList:[],
      channelConfigArr:[],
      settConfigArr:[],
      }
   }
   componentDidMount() {
       this.setState({
          //PayConfigList:datas,
          PayConfigList_check:true,
          getPayChanData:[{name:'支付宝',channelCode:'10022'},{name:'钱起',channelCode:'1100222'}],
          getSettChanData:[{name:'支付宝',settlementCode:'10022'},{name:'钱起',settlementCode:'1100222'}]
       })

       this.getAllList('getSettChanList','settConfig_Data')
       this.getAllList('getPayChanList','channelConfig_Data');
       this.getPayConfigList();
       
    }
    changePinput=(val,child,parent)=>{
      var values=trim(val);
      this.setState({
        [child]:values,
      });
      var parents=this.state[parent];
         parents[child]=values;
         this.setState({
           [parent]:parents
         })
    }
    getPayConfigList=()=>{
    //获取支付配置列表
     const objectJson={
        token:localStorage.cok,
        status:-1,
        type:3,
        isPage:1
    }
    changeID(objectJson)
    var obj={
      url:api.resourcePath+api.getTypeMethodList,
      jsonp:objectJson,
      func200:(json)=>{
          message.info('请求成功');
          if(json.data&&json.data.length>0){
             this.setState({
              PayConfigList:json.data,
              PayConfigList_check:true
             })
          }
      }
    }
    newfetch(obj)
  }
  getAllList=(path,stateIndex)=>{
      var objectJson={
        token:localStorage.cok,
        status:-1,
        isPage:1,
      }
      changeID(objectJson);
      var obj={
        url:api.resourcePath+api[path],
        jsonp:objectJson,
        func200:(json)=>{
            global.token = json.token;
            this.setState({
              [stateIndex]: json.data
            },()=>{
               if(stateIndex==="channelConfig_Data"){
                  //获取支付渠道配置，结算渠道配置列表
                 this.onselChange(this.state.channelConfig,'channelConfig');
                 
               }else if(stateIndex==="settConfig_Data"){
                 this.onselChange(this.state.settConfig,'settConfig');
               }
            })
            
        },
        func201:(json)=>{
           this.setState({
              [stateIndex]:[]
            })
        }
      }
      newfetch(obj)
  }
  changerateJson=(obj)=>{
    var arr=this.state.agencyRateJson;
    var names=this.state.ratenames;
    rateJson_Change(obj,arr,names,()=>{
           this.setState({
             agencyRateJson:arr,
             ratenames:names
           })  
    })
    // console.log(JSON.stringify( arr ))
  }
  onselChange=(val,name)=>{
      const code=name==="settConfig"?"settlementCode":"channelCode";
      const data=this.state[name+'_Data'];
      var arrs=name+'Arr';
      var arr=[];
      for(let i=0;i<val.length;i++){
         for(let j=0;j<data.length;j++){
             if(val[i]===data[j][code]){
                arr.push({
                  id:data[j][code],
                  text:data[j]['name']
                })
                 break;
             }           
         }       
      }//_Data  
    this.setState({
      [name]:val,
      [arrs]:arr
    })
  }
  onChangeAll=(e)=>{
      this.setState({
        [e.target.name]:e.target.value,
      });
   } 
  moveCard=(dragIndex, hoverIndex,parentData)=>{
   // const { cards } = this.state;
    const cards=this.state[parentData+'Arr'];
    const dragCard = cards[dragIndex];

    this.setState(update(this.state, {
      [parentData+'Arr']: {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, dragCard],
        ],
      },
    }),()=>{
      var arr=[];
      var init=this.state[parentData+'Arr'];
       for(let i=0;i<init.length;i++){
           arr.push(init[i].id)
       }
       this.setState({
          [parentData]:arr,
       })
       
    });
  }  
    render(){
        const {channelConfigArr,settConfigArr}=this.state;
        return (
            <div>
                <div  className="EA_title">
                  <Button className="qc-add-list" onClick={()=>{
                    this.returnAddEdit('/groupList')
                  }}>返回</Button>
                  <h2 className="deal-title">{this.state.isAdd===1?'编辑':'添加'}合作商</h2>    
                </div> 
                {this.state.isAdd===1&&
                  <Row style={{marginTop:30}}>
                    <Col span={6} style={{fontWeight:700,textAlign:'right'}}><span style={{marginRight:10}}><span className="star">*</span>合作商组编号</span></Col>
                    <Col span={12}>
                       <Input 
                        placeholder="合作商组编号"
                        name="agencyNo"
                        onChange={this.onChangeAll}
                        value={this.state.key}
                        className="mineWidth"
                        disabled={true}
                       />
                    </Col>
                  </Row>
                }
                 <Row style={{marginTop:10}}>
                    <Col span={6} style={{fontWeight:700,textAlign:'right'}}><span style={{marginRight:10}}><span className="star">*</span>合作商组名称</span></Col>
                    <Col span={12}>
                        <Input  
                         placeholder="请输入合作商组名称"
                         onChange={this.onChangeAll}
                         value={this.state.name}
                         name="name"
                         className="mineWidth"
                         />
                    </Col>
                </Row>
                <Row style={{marginTop:10}}>
                    <Col span={6} style={{fontWeight:700,textAlign:'right'}}><span style={{marginRight:10}}>支付渠道配置</span></Col>
                    <Col span={12}>
                       <NewSelect 
                       name="channelConfig" 
                       mode="multiple"
                       placeholder="请选择"
                       value={this.state.channelConfig}
                       datas={this.state.channelConfig_Data}  
                       style={{ width: '100%',fontSize:'12px' }} 
                       valMess={'channelCode'}
                       textMess={'name'}  
                       onselChange={this.onselChange}
                       />
                    </Col>
                </Row>
                <Row style={{marginTop:10}}>
                   <Col span={6}></Col>
                   <Col span={12}>
                   {channelConfigArr&&channelConfigArr.map((card, i) => (
                      <DragSelect
                        key={card.id}
                        index={i}
                        id={card.id}
                         text={card.text}
                        parentData="channelConfig"
                        moveCard={this.moveCard}
                        identfy="channelConfigselect"
                      />
                    ))}
                    </Col>
                </Row>
                 <Row style={{marginTop:10}}>
                    <Col span={6} style={{fontWeight:700,textAlign:'right'}}><span style={{marginRight:10}}>结算渠道配置</span></Col>
                    <Col span={12}>
                       <NewSelect name="settConfig" 
                       placeholder="请选择"
                       mode="multiple"
                       value={this.state.settConfig}
                       datas={this.state.settConfig_Data}  
                       style={{ width: '100%',fontSize:'12px' }} 
                       valMess={'settlementCode'}
                       textMess={'name'}
                       onselChange={this.onselChange}
                       />
                    </Col>
                </Row>
                <Row style={{marginTop:10}}>
                   <Col span={6}></Col>
                   <Col span={12}>
                   {settConfigArr&&settConfigArr.map((card, i) => (
                      <DragSelect
                        key={card.id}
                        index={i}
                        id={card.id}
                         text={card.text}
                        parentData="settConfig"
                        moveCard={this.moveCard}
                        identfy="settConfigselect"
                      />
                    ))}
                    </Col>
                </Row>
                <Row style={{marginTop:10}}>
                   <Col span={6} style={{fontWeight:700,textAlign:'right'}}>
                        <p style={{marginRight:10}}>路由配置</p>
                   </Col>
                   <Col span={12}>
                        <Row>
                            <Col span={5} style={{textAlign:'right'}}><span style={{marginRight:10}}>mode</span></Col>
                            <Col span={19}>
                                <CreateInput 
                                 placeholder="请输入mode"
                                 name="mode"
                                 parent="routeConfig"
                                 changePinput={this.changePinput}
                                 value={this.state.mode}
                                />
                            </Col>
                        </Row>
                         <Row style={{marginTop:10}}>
                            <Col span={5} style={{textAlign:'right'}}><span style={{marginRight:10}}>retryTime</span></Col>
                            <Col span={19}>
                                <CreateInput 
                                 placeholder="请输入retryTime"
                                 name="retryTime"
                                 parent="routeConfig"
                                 changePinput={this.changePinput}
                                 value={this.state.retryTime}
                                 />
                            </Col>
                        </Row>
                   </Col>
                </Row>
                <Row style={{marginTop:10}}>
                   <Col span={6} style={{fontWeight:700,textAlign:'right'}}>
                        <p style={{marginRight:10}}>限制配置</p>
                   </Col>
                   <Col span={12}>
                        <Row style={{}}>
                              <Col span={5} style={{textAlign:'right'}}><span style={{marginRight:10}}>permission</span></Col>
                              <Col span={19}>
                                  <CreateInput 
                                   placeholder="请输入permission"
                                   changePinput={this.changePinput}
                                   name="permission"
                                   parent="agencyLimit"
                                   value={this.state.permission}
                                   />
                              </Col>
                          </Row>
                         
                          <Row style={{marginTop:10}}>
                              <Col span={5} style={{textAlign:'right'}}><span style={{marginRight:10}}>inTransitLimit</span></Col>
                              <Col span={19}>
                                  <CreateInput 
                                   placeholder="请输入inTransitLimit"
                                   changePinput={this.changePinput}
                                   value={this.state.inTransitLimit}
                                   parent="agencyLimit"
                                   name="inTransitLimit"
                                   />
                              </Col>
                          </Row>
                          <Row style={{marginTop:10}}>
                              <Col span={5} style={{textAlign:'right'}}><span style={{marginRight:10}}>balanceLimit</span></Col>
                              <Col span={19}>
                                  <CreateInput 
                                   placeholder="请输入balanceLimit"
                                   changePinput={this.changePinput}
                                   value={this.state.balanceLimit}
                                   parent="agencyLimit"
                                   name="balanceLimit"
                                   />
                              </Col>
                          </Row>
                           <Row style={{marginTop:10}}>
                              <Col span={5} style={{textAlign:'right'}}><span style={{marginRight:10}}>allInTransitLimit</span></Col>
                              <Col span={19}>
                                  <CreateInput 
                                   placeholder="请输入allInTransitLimit"
                                   changePinput={this.changePinput}
                                   value={this.state.allInTransitLimit}
                                   parent="agencyLimit"
                                   name="allInTransitLimit"
                                   />
                              </Col>
                          </Row>
                          <Row style={{marginTop:10}}>
                              <Col span={5} style={{textAlign:'right'}}><span style={{marginRight:10}}>allBalanceLimit</span></Col>
                              <Col span={19}>
                                  <CreateInput 
                                   placeholder="请输入allBalanceLimit"
                                   changePinput={this.changePinput}
                                   value={this.state.allBalanceLimit}
                                   parent="agencyLimit"
                                   name="allBalanceLimit"
                                   />
                              </Col>
                          </Row>
                   </Col>
                </Row>
                <Row style={{marginTop:10}}>
                  <Col style={{textAlign:'right',fontWeight:900,lineHeight:'32px'}} span={6}>
                       <div style={{marginRight:10}}><span className="star">*</span>销售费率</div>
                  </Col>
                  <Col  span={12} style={{marginBottom:'20px'}}>
                       {this.state.PayConfigList_check&&
                          <div>
                              {this.state.PayConfigList.map((item,index)=>
                                 <CreatePay  
                                   datasValidate={this.state.datasValidate} 
                                   codename={this.state.codename}
                                   ref="FormGroup" 
                                   changeParrateJson={this.changerateJson} 
                                   key={index} 
                                   index={index} 
                                   item={item} 
                                   necessaryMess={this.state.rateNecsssary}
                                   changeValidate={this.repayvalidate}
                                   chanRates={this.state.agencyRate}
                                   default_OBJ={groupRate}
                                 />
                              )}
                          </div>
                        }
                  </Col>
            </Row>
                <div className="qc-save">
                    <Button type="primary" onClick={this.conserve}>保存</Button>
                </div>
            </div>         
        );
    }
  repayvalidate=()=>{
       this.setState({
          datasValidate:'true'
        }) 
  }  
  conserve=()=>{
    const saveList=[{
      index:'name',
      mess:'合作商组名称不能为空',
      arr:this.state.name,
    },{
      index:'agencyRate',//rateJson
      type:'datasValidate', //数组验证datasValidate
      necessary:this.state.rateNecsssary,
      arr:this.state.agencyRateJson,
      mess:'销售费率不能为空',
      messAll:'请补全销售费率必填信息',
    }]
  var ValidateReturn=ValidateEA(saveList);
   if(ValidateReturn.nextDo){
      const objectJson={
        token:localStorage.cok,
        isAdd:this.state.isAdd,
        // channelConfig:this.state.channelConfig.length>0?this.state.channelConfig:null,
        // settConfig:this.state.settConfig.length>0?this.state.settConfig:null,
        // routeConfig:isEmptyObject(this.state.routeConfig)?null:JSON.stringify(this.state.routeConfig),
        // agencyLimit:isEmptyObject(this.state.agencyLimit)?null:JSON.stringify(this.state.agencyLimit), //非必填信息
      }
      if(this.state.channelConfig.length>0){
         objectJson['channelConfig']=this.state.channelConfig;
      }
      if(this.state.settConfig.length>0){
         objectJson['settConfig']=this.state.settConfig;
      }
      if(!isEmptyObject(this.state.routeConfig)){
         objectJson['routeConfig']=JSON.stringify(this.state.routeConfig);
      }
      if(!isEmptyObject(this.state.agencyLimit)){
         objectJson['agencyLimit']=JSON.stringify(this.state.agencyLimit);
      }
      if(this.state.isAdd===1){
        objectJson['key']=this.state.key;
      }
      postObject(saveList,objectJson) 
      changeID(objectJson);
      var obj={
        url:api.resourcePath+api.saveAgencyGroup,
        jsonp:objectJson,
        func200:()=>{
            message.info('请求成功');
            hashHistory.push('/groupList')
        }
      }
        newfetch(obj) 
    }else{
       if(ValidateReturn.indexVal=='agencyRate'){
                  this.setState({
                    datasValidate:'false',
                    codename:ValidateReturn.codename,
                  })
       }
    }  
 }  
}
class CreateInput extends Component{
  onChangeAll=(e)=>{
     this.props.changePinput(e.target.value,e.target.name,this.props.parent)
  }
  render(){
    return(
           <Input 
             onChange={this.onChangeAll}
             placeholder={this.props.placeholder}
             name={this.props.name}
             value={this.props.value}
          />
    )
  }
}

//export default AddGroup;
export default DragDropContext(HTML5Backend)(AddGroup);
function isEmptyObject(obj) {   
　　for (var name in obj){
　　　　return false;//返回false，不为空对象
　　}　　
　　return true;//返回true，为空对象
}

const datas= [{
        "key": 1,
        "payCode": "express_d0",
        "name": "新易联",
    },
    {
        "key": 2,
        "payCode": "payeco_a",
        "name": "易联A",
        "start": "09:00",
    },
    {
        "key": 3,
        "payCode": "tftpay",
        "name": "腾付通",
        "start": "09:00",
        "end": "21:00",
    }]
