import React from 'react';
import { Form, Icon, Input, Button, Checkbox,message } from 'antd';
import {hashHistory} from 'react-router';
import {api} from './config.js';
import newfetch from './common/fetch.js';
import layoutlist from './layoutlist';
import Mock from 'mockjs';
const FormItem = Form.Item;

class NormalLoginForm extends React.Component {
   constructor(props) {
    super(props);
      this.state = {
        userName:'11111',
       password:'11111',
       kouling:'11', 
       loading: false,
      }
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => { 
      if (!err) {
       //console.log('Received values of form: ', values);
      }
    });
    var userName=this.state.userName;
    var password=this.state.password;
    var kouling=this.state.kouling;
    const obj={
      url:api.resourcePath+api.login,
      jsonp:{userName:userName,password:password,googleKey:kouling},
      func200:(json)=>{
        var whiteBlackList={};
        this.setState({loading: true});
            setTimeout(function(){
              global.token=json.token;
              localStorage.loginId = json.data.admin_id;
              localStorage.loginEmail = json.data.email;
              localStorage.cok = json.token;
              localStorage.lastLoginIp = json.data.lastLoginIp;
              localStorage.systemtypes=Math.floor(Math.random()*2)+1;
              if(global.systemtypes==2){
                var arr=[
                  '交易/交易记录,代付记录,商户资金流水列表,合作商资金流水列表',
                  '合作商/*',
                  '商户/*'
                ];
                var authority={
                      type:'black',  //black 不显示 white只显示
                      list:[
                        "交易/交易记录/导出",
                        "合作商/合作商列表/编辑,导出"
                      ]
                  }
 
                if(arr&&arr.length===1&&arr[0]==="*"){
                   return;    //如果返回的是 ["*"] 使用默认的列表
                }else{
                    var list=[];
                    for(let i=0;i<arr.length;i++){ //循环返回的url列表
                        const item=arr[i].split("/");
                        //父级总模块  eg:交易
                        const parents=item[0]; 
                        //相应父级下的展示子集 eg:代付记录,商户资金流水列表,合作商资金流水列表
                        const childs=item[1];  
                        for(let j=0;j<layoutlist.length;j++){
                            const layoutlist_Child=layoutlist[j];
                            if(parents===layoutlist_Child['sidebar']){  
                                  if(childs=='*'){ //当 返回的是*时 则获取原数组相应的子集
                                     list.push(layoutlist[j])  
                                  }else{     //否则 根据获取的子集产生新的子集数组
                                     let par=layoutlist[j];
                                     let newarr=[];
                                     //用“，”区分产生自己数组 并循环查询原列表的匹配值
                                     let childs_arr=childs.split(",");  
                                     for(let m=0;m<childs_arr.length;m++){
                                          for(let n=0;n<par.children.length;n++){
                                             if(childs_arr[m]===par.children[n]['sidebar']){
                                                 newarr.push(par.children[n])
                                                 break;
                                             }
                                          }
                                     }
                                     par.children=newarr;
                                     list.push(par)
                                  }
                                  break;
                            }
                        }
                    }
                    // const list_url={
                    //   list_url:list
                    // }
                    //localStorage.layoutlist=JSON.stringify(list_url);
                    whiteBlackList.layoutlist=list;
                }
                //黑白名单
                 if(authority&&authority.type){
                   // localStorage.authorityType=authority.type;//黑白名单类型
                   whiteBlackList.authorityType=authority.type;
                 }
                //黑白名单列表
                if(authority&&authority.list){
                    const list_layoutlist={
                      list_layoutlist:authority.list
                    }
                    // localStorage.authoritylist=JSON.stringify(list_layoutlist);
                   whiteBlackList.authoritylist=authority.list;
                }
                localStorage.whiteBlackList=JSON.stringify(whiteBlackList);
              }
              var initLoginbutton=null;
              if(localStorage.whiteBlackList&&JSON.parse(localStorage.whiteBlackList).authoritylist){
                let  list=JSON.parse(localStorage.whiteBlackList).authoritylist;
                for(let i=0;i<list.length;i++){
                      const listArr=list[i].split("/");
                      const parentName=listArr[0]+"/"+listArr[1];
                      const childs=listArr[2];
                      if(parentName==='交易/交易记录'){
                          var initLoginbutton=childs;
                         break;
                      }
                }
              }
              // whiteBlackList         
              hashHistory.push({
                pathname:'/layout',
                state:{
                  buttonState:initLoginbutton
                }
              });
              message.info('成功登录');
            },1000);
      }
    }
    newfetch(obj)
      }
     changeTYpe=()=>{
        global.systemtypes=2;  
     }   
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="qc-from-login">
          <h3>系统登录<Button type="button" onClick={this.changeTYpe}>测试黑白名单</Button></h3>
        <FormItem>
          {getFieldDecorator('userName', {
            rules: [{ required: true, message: 'Please input your username!' }],
            initialValue:this.state.userName
          })(
            <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="输入用户名" onChange={this.onChangeUserName}/>
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
            initialValue:this.state.password
          })(
            <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="输入密码" onChange={this.onChangePassWord} />
          )}
        </FormItem>
         <FormItem>
          {getFieldDecorator('kouling', {
            rules: [{ required: true, message: '动态口令输入错误!' }],
            initialValue:this.state.kouling
          })(
            <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="kouling" placeholder="输入动态口令" onChange={this.onChangeKouling}/>
          )}
        </FormItem>
        <FormItem>
          {/* {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(
            <Checkbox>记住密码</Checkbox>
          )} */}
          <Button type="primary" htmlType="submit" className="login-form-button" loading={this.state.loading}>
            登录
          </Button>
        </FormItem>
      </Form>
    );
  }
   onChangeUserName = (e) => {
    this.setState({ userName:e.target.value });
  }
   onChangePassWord = (e) => {
    this.setState({ password: e.target.value });
  }
   onChangeKouling = (e) => {
    this.setState({ kouling: e.target.value });
  }
}

const WrappedNormalLoginForm = Form.create()(NormalLoginForm);

export default WrappedNormalLoginForm;