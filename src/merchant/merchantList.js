import React from 'react';
import {Select, Input, Button, Table, Row, Col, message, Spin, Popconfirm,Pagination,Modal} from 'antd';
import {hashHistory} from 'react-router';
import {api} from '../config.js';
import newfetch from './../common/fetch';
import changeID from './../common/commonID';
import {Open_disable,CollectionAccountType,accountExs,addEditParams,initListState} from '../common/util.js';
import {TableCommon,NewSelect}  from '../common/resetAntd.js';
// import data from './data';
message.config({
  top: 60,
  duration: 2,
});
const Option = Select.Option;
let  columns=[];
class MerchantList extends React.Component {
   constructor(props) {
    super(props);
    this.state = {
      data:[],
      merchantNo:'',
      agencyNo:'',
      status:'-1',
      current: 1,
      pageSize:10,
      total:'',
      size: 'large',
      modal2Visible:false,
      nowName:null
    }
    //pathname,isAdd,stateArray,record
    this.stateArray=['merchantNo','agencyNo','status','current','pageSize'],
    this.addEditParams=addEditParams; //一定要使用this 否则不会绑定到当前的组建属性等
    this.initListState=initListState;
    columns.push(
       {
        title:'操作',
        dataIndex: 'operation',
        render:  (text, record, index) => <div><Button onClick={()=>{
           // let stateObj={};
           // for(let i=0;i<this.stateArray.length;i++){
           //    let keys=this.stateArray[i];
           //    stateObj[keys]=this.state[keys];
           // }
           // console.log(JSON.stringify(stateObj))
           // hashHistory.push({pathname:'/addMerchant',state:{
           //    mess:record,
           //    listMess:JSON.stringify(stateObj),
           //    isAdd:1
           //  }})
            this.addEditParams('/addMerchant',1,this.stateArray,record)
        }}>编辑</Button>
        <Popconfirm 
            placement="top"  
            autoAdjustOverflow="true"            
            title={'是否重置密码'} 
            onConfirm={()=>{
                this.ModalShow(record.merchantNo)
            }} 
            okText="确定" 
            cancelText="取消">
           <Button style={{marginLeft:'10px'}}>密码重置</Button>
          </Popconfirm>
        </div>,
      }
    )
  }
   
    ModalShow=(name)=>{
     this.setState({
        nowName:name, //唯一Id
     },()=>{
        this.resetMerchantPwd(this.state.nowName) 
     })
  }
  componentDidMount() {
    this.initListState(this.BalancePost,this.stateArray)
  }
  componentWillUnmount(){
    //移除最后一个  因为会重新添加
    columns.pop();
  }
  BalancePost = () => {
        var objectJson={
            token:localStorage.cok,
            merchantNo:this.state.merchantNo,
            agencyNo:this.state.agencyNo,
            status:this.state.status,
            pageNum:this.state.current,
            numPerPage:this.state.pageSize,
        }
        changeID(objectJson);
        var obj={
          url:api.resourcePath+api.getMerchantList,
          jsonp:objectJson,
          func200:(json)=>{
              global.token = json.token;
              this.setState({
                loading: false,
                data: json.data,
                total: json.data[0].sumNum,
              })
          },
          func201:(json)=>{
             this.setState({
                total: 0,
                data: [],
                loading: false,
              })
          }
        }
        newfetch(obj)
  }
  //获得状态
  handleChangeStatus=(value)=>{
   this.setState({
      status:value
    })  
  }
  //添加列表项
    addMerchant=()=>{
      // hashHistory.push({pathname:'/addMerchant',state:{
      //   isAdd:0
      // }})
      this.addEditParams('/addMerchant',0,this.stateArray)
  }
  resetBtn=()=>{
    this.setState({
      merchantNo:'',
      agencyNo:'',
      status:'-1',
      total: '',
      pageSize:10,
      current:1
    },()=>{
      this.BalancePost();
    });
  }
  changeAll=(e)=>{
    this.setState({
      [e.target.name]:e.target.value
    })
  }
    render(){
      const size = this.state.size;
        return (
            <div>
                <Button type="primary" icon="plus" className="qc-add-list" onClick={this.addMerchant}>添加</Button>
                <h2 className="deal-title">商户列表</h2>
                <div className="example-input">
                    <Input size="large" placeholder="输入商户编号" value={this.state.merchantNo} name="merchantNo" onChange={this.changeAll} className="mineWidth"/>
                    <Input size="large" placeholder="输入合作商编号" value={this.state.agencyNo} name="agencyNo" onChange={this.changeAll} className="mineWidth" />
                    {/* <Input size="large" placeholder="输入客服电话" /> */}
                    <Select  size="large" defaultValue={this.state.status} value={this.state.status} style={{ width: 110,verticalAlign:'middle',marginRight:10,}} onChange={this.handleChangeStatus}>
                        <Option value="-1">全部</Option>
                        <Option value="0">启用</Option>
                        <Option value="1">禁止</Option>
                    </Select>
                    <Button type="primary" icon="search" style={{marginRight:10}} onClick={this.BalancePost}></Button>
                    <Button icon="reload"  onClick={this.resetBtn}></Button>
                </div>
                <TableCommon 
                   onShowSizeChange={this.onShowSizeChange}  
                   onChangePage={this.onChangePage}
                   columns={columns}
                   currentpage={this.state.current}
                   currentpageSize={this.state.pageSize}
                   data={this.state.data}
                   total={this.state.total}
                   load={this.state.loading}
                   scroll={{ x: 2200 }}
                   style={{marginTop:"20px"}}
                />
            </div>
        );
    }
   resetMerchantPwd=(nowName)=>{
      if(!nowName){
         message.warning('编号不能为空')
      }else{
         var objectJson={
            token:localStorage.cok,
            id:nowName
        }
        changeID(objectJson);
        var obj={
          url:api.resourcePath+api.resetMerchantPwd,
          jsonp:objectJson,
          func200:(json)=>{
              global.token = json.token;
              message.success('密码重置成功')
          }
        }
        newfetch(obj)
      }
   }
   cancelModal=()=>{
     this.setState({
        modal2Visible:false
     })  
   }
   onChangePage=(page, pageSize)=>{
     this.pageCurrentC(page, pageSize)
   }
   onShowSizeChange=(current, size)=>{
    this.pageCurrentC(current, size)
  }
  pageCurrentC=(page, pageSize)=>{
      this.setState({
        current: page,
        pageSize:pageSize
      },()=>{
        this.BalancePost()
      });
  }
}
columns = [{
      title: '商户号',
      dataIndex: 'merchantNo',
      width: 165,
      fixed: 'left',
      render: text => <p style={{width:165}}>{text}</p>,
    }, {
      title: '合作商编号',
      dataIndex: 'agencyNo',
      width: 165,
      fixed: 'left',
      render: text => <p style={{width:165}}>{text}</p>,
    }, {
      title: '商户名称',
      dataIndex: 'name',
      width: 100,
      fixed: 'left',
      render: text => <p style={{width:100}}>{text}</p>,
    },{
      title:'身份证',
      dataIndex: 'idCard',
      width: 165,
      render: text => <p style={{width:165}}>{text}</p>,
    },{
      title:'手机号',
      dataIndex: 'phone',
      render: text => <p style={{width:120}}>{text}</p>,
    },{
      title:'收款账户号',
      dataIndex: 'bankCard',
       render:  (text, record, index) =><p style={{width:160}}>{accountExs(record,'accountExs','bankCard')}</p>
    },{
      title:'收款账户名称',
      dataIndex: 'contract',
      render:  (text, record, index) =><p style={{width:120}}>{accountExs(record,'accountExs','contract')}</p>,
    },{
      title:'收款开户银行',
      dataIndex: 'bankName',
       render:  (text, record, index) =><p style={{width:120}}>{accountExs(record,'accountExs','bankName')}</p>
    },{
      title:'收款账户邮箱',
      dataIndex: 'email',
       render:  (text, record, index) =><p style={{width:140}}>{accountExs(record,'accountExs','email')}</p>  
    },{
      title:'收款账户类型',
      dataIndex: 'accountType',
      render: (text, record, index)=> <p style={{width:80}} style={{color:'#22BC22'}}>{accountExs(record,'accountExs','accountType')}</p>,
    },{
      title:'状态',
      dataIndex: 'status',
      render: text => <p style={{width:60}} style={{color:text===0?'green':'red'}}>{Open_disable(text)}</p>,
    }]
/*
,{
      title:'收款账户银行手机号',
      dataIndex: 'cardMobile',
       render:  (text, record, index) =><p style={{width:140}}>{accountExs(record,'accountExs','cardMobile')}</p>  
    }
*/
const data = [{
  key:1,
  merchantNo:"10011123483",//商户编号
  agencyNo:"10011",//合作商编号
  name:"测试商户",//商户名称
  idCard:"130732198608190493",//身份证
  phone:"13552005525",//手机号
  accountExs:{//收款信息
    contract:"丁国庆",//收款人姓名
    bankCard:"6222020200015660000",//收款账号
    bankName:"工商银行",//收款银行
    cardMobile:"13552005525",//收款银行手机号
    email:"test@test.com",//邮箱
    accountType:0,// 账户类型 0个人  1公户"
  },
  status:0,//状态 0是开启，1是禁用
  sumNum:"1",//总条数
  config:{//商户配置 
      notifyUrl:'',//  要这个就可以了
      returnUrl:null,
      inTransitLimit:null,
      balanceLimit:null
  },
  rate:[
  {
      "rate": "0.0033",
      "fee": "0.6",
      "key": 1,
      "name": "express_d0",
      "minTransaction": "10",
      "maxTransaction": "20000",
      "d0Rate": null,
      "d0Fee": null,
      "allowCredit":true
  },{
      "rate": "0.0033",
      "fee": "0.6",
      "key": 1,
      "name": "express_d1",
      "minTransaction": "10",
      "maxTransaction": "20000",
      "d0Rate": null,
      "d0Fee": null,
      "allowCredit":true
  }]
}
]


export default MerchantList;

