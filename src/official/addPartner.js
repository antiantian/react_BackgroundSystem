import React from 'react';
import {Row, Col, Button, Select, Form, Input, Icon, Switch,Radio,message} from 'antd';
import {hashHistory} from 'react-router';
import host from '../config.js';
import {api} from '../config.js';
import newfetch from './../common/fetch';
import changeID from './../common/commonID';
import OffcialList from './offcialList';
const FormItem = Form.Item;
const Option = Select.Option;
function handleChange(value) {
  console.log(`selected ${value}`);
}
const RadioGroup = Radio.Group;
class AddPartner extends React.Component {
    constructor(props){
    super(props);
    this.state = {
    newAgencyNo:localStorage.agencyNo,
    newName:localStorage.name,
    newIdCard:localStorage.idCard,
    newPhone:localStorage.phone,
    newContract:localStorage.contract,
    newBankCard:localStorage.bankCard,
    newBankName:localStorage.bankName,
    newCardMobile:localStorage.cardMobile,
    newEmail:localStorage.email,
    newPassword:localStorage.password,
    newAccountType:localStorage.accountType,
    newStatus:localStorage.status,
    }
 }
//商户号
newAgencyNo=(e)=>{
  this.setState({
     newAgencyNo: e.target.value,
    }); 
}
// 商户名称
newName=(e)=>{
  this.setState({
     newName: e.target.value,
    }); 
}
// 商户身份证号码
newIdCard=(e)=>{
  this.setState({
     newIdCard: e.target.value,
    }); 
}
newPhone=(e)=>{
  this.setState({
     newPhone: e.target.value,
    }); 
}
newContract=(e)=>{
  this.setState({
    newContract: e.target.value,
    }); 
}
newBankCard=(e)=>{
  this.setState({
    newBankCard: e.target.value,
    }); 
}
 newBankName=(e)=>{
  this.setState({
      newBankName: e.target.value,
    }); 
}
newCardMobile=(e)=>{
  this.setState({
     newCardMobile: e.target.value,
    }); 
}
newEmail=(e)=>{
  this.setState({
     newEmail: e.target.value,
    }); 
}
newPassword=(e)=>{
  this.setState({
     newPassword: e.target.value,
    }); 
}
//账户类型
onChangeAccountType= (e) => {
    // console.log('radio1 checked', e.target.value);
    this.setState({
      newAccountType: e.target.value,
    });
  }
//账户类型
onChangeStatus=(e) => {
    // console.log('radio1 checked', e.target.value);
    this.setState({
      newStatus: e.target.value,
    });
  }
//保存
conserve=()=>{  
 var requestSTR = "";
    requestSTR = "token=" + localStorage.cok+"&agencyNo="+this.state.newAgencyNo+"&name="+this.state.newName
    +"&idCard="+this.state.newIdCard+"&phone="+this.state.newPhone+"&contract="+this.state.newContract+'&bankCard='+this.state.newBankCard
    +"&bankName="+this.state.newBankName+"&cardMobile="+this.state.newCardMobile+"&email="+this.state.newEmail+"&password="+this.state.newPassword
    +"&accountType="+this.state.newAccountType+"&status="+this.state.newStatus+ "&merchantId=" + localStorage.loginId;
    console.log(requestSTR);
    fetch(host+'/web/admin/saveAgencyList', {
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      body: requestSTR

    }).then((response) => response.json())
      .then((json) => {
        // api/list正常返回格式{errcode:0,errmsg:'',data:[]}
        if (json.code == '200') {
          message.info('请求成功');
          hashHistory.push('/OffcialList')
        }
        else {
          message.warning('请求失败');
        }
      })
      .catch((err) => {
        message.warning('数据加载失败');
      });
      return false; 
  }
    render(){
        return (
            <div>
                <Button className="qc-add-list" onClick={()=>{hashHistory.go(-1)}}>返回</Button>
                <h2 className="deal-title">编辑合作商</h2>    
                <Row style={{marginTop:30}}>
                    <Col span={6} style={{fontWeight:700,textAlign:'right'}}><span style={{marginRight:10}}>商户号</span></Col>
                    <Col span={12}>
                       <Input
                        value={this.state.newAgencyNo} 
                        placeholder="请输入合作商编号"
                        onChange={this.newAgencyNo}
                       />
                    </Col>
                </Row>
                  <Row style={{marginTop:10}}>
                    <Col span={6} style={{fontWeight:700,textAlign:'right'}}><span style={{marginRight:10}}>商户名称</span></Col>
                    <Col span={12}>
                        <Input
                        value={this.state.newName}
                         placeholder="请输入合作商名称"
                        onChange={this.newName}
                         />
                    </Col>
                </Row>
                <Row style={{marginTop:10}}>
                    <Col span={6} style={{fontWeight:700,textAlign:'right'}}><span style={{marginRight:10}}>商户身份证号码</span></Col>
                    <Col span={12}>
                        <Input  
                        value={this.state.newIdCard} 
                        placeholder="请输入合作商身份证号码"
                         onChange={this.newIdCard}
                        />
                    </Col>
                </Row>
                 <Row style={{marginTop:10}}>
                    <Col span={6} style={{fontWeight:700,textAlign:'right'}}><span style={{marginRight:10}}>商户手机号</span></Col>
                    <Col span={12}>
                        <Input
                         value={this.state.newPhone} 
                         placeholder="请输入合作商手机号"
                         onChange={this.newPhone}
                         />
                    </Col>
                </Row>
               
                  <Row style={{marginTop:10}}>
                    <Col span={6} style={{fontWeight:700,textAlign:'right'}}><span style={{marginRight:10}}>收款账户名</span></Col>
                    <Col span={12}>
                        <Input
                         value={this.state.newContract} 
                         placeholder="请输入收款账户名"
                         onChange={this.newContract}
                         />
                    </Col>
                </Row>

                <Row style={{marginTop:10}}>
                    <Col span={6} style={{fontWeight:700,textAlign:'right'}}><span style={{marginRight:10}}>收款账户号</span></Col>
                    <Col span={12}>
                        <Input
                        value={this.state.newBankCard} 
                        placeholder="请输入收款账号"
                        onChange={this.newBankCard}
                        />
                    </Col>
                </Row>

                      <Row style={{marginTop:10}}>
                    <Col span={6} style={{fontWeight:700,textAlign:'right'}}><span style={{marginRight:10}}>收款账户开户行名称</span></Col>
                    <Col span={12}>
                        <Input
                         value={this.state.newBankName}
                          placeholder="请输入收款账户开户行名称"
                          onChange={this.newBankName}
                          />
                    </Col>
                </Row> 

                <Row style={{marginTop:10}}>
                    <Col span={6} style={{fontWeight:700,textAlign:'right'}}><span style={{marginRight:10}}>收款账户银行手机号</span></Col>
                    <Col span={12}>
                        <Input 
                          value={this.state.newCardMobile}
                          placeholder="请输入收款账户银行手机号码"
                          onChange={this.newCardMobile}
                          />
                    </Col>
                </Row>

                {/* <Row style={{marginTop:10}}>
                    <Col span={6} style={{fontWeight:700,textAlign:'right'}}><span style={{marginRight:10}}>收款账户联行号</span></Col>
                    <Col span={12}>
                        <Input value="123456"/>
                    </Col>
                </Row> */}

        

                {/* <Row style={{marginTop:10}}>
                    <Col span={6} style={{fontWeight:700,textAlign:'right'}}><span style={{marginRight:10}}>商户名称</span></Col>
                    <Col span={12}>
                        <Input value="中国中信银行"/>
                    </Col>
                </Row>
                
                <Row style={{marginTop:10}}>
                    <Col span={6} style={{fontWeight:700,textAlign:'right'}}><span style={{marginRight:10}}>商户简称/收款方</span></Col>
                    <Col span={12}>
                        <Input value="中国中信银行"/>
                    </Col>
                </Row>

                <Row style={{marginTop:10}}>
                    <Col span={6} style={{fontWeight:700,textAlign:'right'}}><span style={{marginRight:10}}>商户地址</span></Col>
                    <Col span={12}>
                        <Input value="中国中信银行"/>
                    </Col>
                </Row>

                <Row style={{marginTop:10}}>
                    <Col span={6} style={{fontWeight:700,textAlign:'right'}}><span style={{marginRight:10}}>商户联系人名称</span></Col>
                    <Col span={12}>
                        <Input value="中国中信银行"/>
                    </Col>
                </Row>

                <Row style={{marginTop:10}}>
                    <Col span={6} style={{fontWeight:700,textAlign:'right'}}><span style={{marginRight:10}}>客服电话</span></Col>
                    <Col span={12}>
                        <Input value="1588888888889"/>
                    </Col>
                </Row> */}

                <Row style={{marginTop:10}}>
                    <Col span={6} style={{fontWeight:700,textAlign:'right'}}><span style={{marginRight:10}}>商家联系人邮箱</span></Col>
                    <Col span={12}>
                        <Input
                         value={this.state.newEmail} 
                         placeholder="请输入合商家联系人邮箱"
                         onChange={this.newEmail}
                         />
                    </Col>
                </Row>
               
                <Row style={{marginTop:10}}>
                    <Col span={6} style={{fontWeight:700,textAlign:'right'}}><span style={{marginRight:10}}>商家联系人密码</span></Col>
                    <Col span={12}>
                        <Input
                         value={this.state.newPassword} 
                         placeholder="请输入合商家联系人密码"
                         onChange={this.newPassword}
                         />
                    </Col>
                </Row>
               
                  <Row style={{marginTop:10}}>
                    <Col span={6} style={{fontWeight:700,textAlign:'right'}}><span style={{marginRight:10}}>账户类型</span></Col>
                    <Col span={12}>
                          <RadioGroup defaultValue="0" onChange={this.onChangeAccountType} value={this.state.newAccountType}>
                         <Radio value='0'>个人</Radio>
                       <Radio value='1'>公户</Radio>
                      </RadioGroup>
                    </Col>
                </Row> 

                  <Row style={{marginTop:10}}>
                    <Col span={6} style={{fontWeight:700,textAlign:'right'}}><span style={{marginRight:10}}>账户状态</span></Col>
                    <Col span={12}>
                          <RadioGroup defaultValue="1" onChange={this.onChangeStatus} value={this.state.newStatus}>
                         <Radio value='0'>开启</Radio>
                       <Radio value='1'>禁用</Radio>
                      </RadioGroup>
                    </Col>
                </Row> 
                {/* <Row style={{marginTop:10}}>
                    <Col span={6} style={{fontWeight:700,textAlign:'right'}}><span style={{marginRight:10}}>商家组织机构代码</span></Col>
                    <Col span={12}>
                        <Input value="123456"/>
                    </Col>
                </Row>

                <Row style={{marginTop:10}}>
                    <Col span={6} style={{fontWeight:700,textAlign:'right'}}><span style={{marginRight:10}}>商户营业执照号</span></Col>
                    <Col span={12}>
                        <Input value="456789"/>
                    </Col>
                </Row> */}
                <div className="qc-save">
                    <Button type="primary" onClick={this.conserve}>保存</Button>
                </div>
            </div>

           
        );
    }
}

export default AddPartner;