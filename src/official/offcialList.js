import React from 'react';
import {Select, Input, Button, Table, Row, Col, message, Spin, Pagination,Modal,Popconfirm} from 'antd';
import {hashHistory} from 'react-router';
import {api} from '../config.js';
import newfetch from './../common/fetch';
import changeID from './../common/commonID';
import {Open_disable,CollectionAccountType,accountExs,addEditParams,initListState} from '../common/util.js';
import {TableCommon,NewSelect}  from '../common/resetAntd.js';
const Option = Select.Option;
let columns=[];
class offcialList extends React.Component {
   constructor(props) {
    super(props);
    this.state = {
    data:[],
    agencyNo:'',
    status:'-1',
    current: 1,
    pageSize:10,
    total: '',
    modal2Visible:false,
    nowName:null
    }
    this.stateArray=['status','agencyNo','current','pageSize'],
    this.addEditParams=addEditParams; //一定要使用this 否则不会绑定到当前的组建属性等
    this.initListState=initListState;
    columns.push(
       {
        title:'操作',
        dataIndex: 'operation',
        render:  (text, record, index) => <div><Button onClick={()=>{
           this.addEditParams('/addOffcial',1,this.stateArray,record)
        }}>编辑</Button>
        <Popconfirm 
            placement="top"  
            autoAdjustOverflow="true"            
            title={'是否重置密码'} 
            onConfirm={()=>{
                this.ModalShow(record.agencyNo)
            }} 
            okText="确定" 
            cancelText="取消">
           <Button style={{marginLeft:'10px'}}>密码重置</Button>
          </Popconfirm>
          <Popconfirm 
            placement="top"  
            autoAdjustOverflow="true"            
            title={'是否密钥重置'} 
            onConfirm={()=>{
                this.resetAgencyKey(record.agencyNo)
            }} 
            okText="确定" 
            cancelText="取消">
           <Button style={{marginLeft:'10px'}}>密钥重置</Button>
          </Popconfirm>
        </div>,
      }
    )
  }
  resetAgencyKey=(name)=>{
     if(!name){
         message.warning('编号不能为空')
      }else{
         var objectJson={
            token:localStorage.cok,
            id:name
        }
        changeID(objectJson);
        var obj={
          url:api.resourcePath+api.resetAgencyKey,
          jsonp:objectJson,
          func200:(json)=>{
              global.token = json.token;
              message.success('密钥重置成功')
          }
        }
        newfetch(obj)
      }
  }
  ModalShow=(name)=>{
     this.setState({
        nowName:name, //唯一Id
     },()=>{
        this.resetMerchantPwd(this.state.nowName) 
     })
  }
  componentWillUnmount(){
    //移除最后一个  因为会重新添加
    columns.pop();
  }
  componentDidMount() {
    this.initListState(this.BalancePost,this.stateArray)
    console.log(this.state.hideAddButton?"1":"0")
  }
  BalancePost = () => {
        var objectJson={
            token:localStorage.cok,
            status:this.state.status,
            agencyNo:this.state.agencyNo,
            pageNum:this.state.current,
            numPerPage:this.state.pageSize,
        }
        changeID(objectJson);
        var obj={
          url:api.resourcePath+api.getAgencyList,
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
  addBotton=()=>{
      this.addEditParams('/addOffcial',0,this.stateArray)
  }
  resetBtn=()=>{
    this.setState({
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
        return (
            <div>
                {!this.state.hideAddButton&&
                 <Button type="primary" icon="plus" className="qc-add-list" onClick={this.addBotton}>添加{this.state.hideAddButton?"1":"0"}</Button>
                }
                <h2 className="deal-title">合作商列表</h2>
                <div className="example-input">
                    <Input size="large" placeholder="输入合作商编号"  name="agencyNo" value={this.state.agencyNo} onChange={this.changeAll} className="mineWidth"/>
                    <Select size="large" defaultValue={this.state.status} value={this.state.status} style={{ width: 110,verticalAlign:'middle',marginRight:10,}} onChange={this.handleChangeStatus}>
                        <Option value="-1">全部</Option>
                        <Option value="0">启用</Option>
                        <Option value="1">禁止</Option>
                    </Select>
                    <Button type="primary" icon="search" style={{marginRight:10}} onClick={this.BalancePost}></Button>
                    <Button icon="reload" onClick={this.resetBtn}></Button>
                </div>
                <TableCommon 
                   onShowSizeChange={this.onShowSizeChange}  
                   onChangePage={this.onChangePage}
                   currentpage={this.state.current}
                   currentpageSize={this.state.pageSize}
                   columns={columns}
                   data={this.state.data}
                   total={this.state.total}
                   load={this.state.loading}
                   scroll={{ x: 1600 }}
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
          url:api.resourcePath+api.resetAgencyPwd,
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
  title: '合作商编号',
  dataIndex: 'agencyNo',
  width: 165,
  fixed: 'left',
  render: text => <p style={{width:165}}>{text}</p>,
}, {
  title: '合作商名称',
  dataIndex: 'name',
  width: 100,
  fixed: 'left',
  render: text => <p style={{width:100}}>{text}</p>,
},{
  title: '合作商身份证号码',
  dataIndex: 'idCard',
  width: 165,
  render: text => <p style={{width:165}}>{text}</p>,
},{
  title: '合作商手机号码',
  dataIndex: 'phone',
  render: text => <p style={{width:120}}>{text}</p>,
},{
  title:'当日交易额',
  dataIndex: 'tradeVolume',
  render: text => <p style={{width:80}}>{text}</p>,
},{
  title:'当日利润',
  dataIndex: 'profit',
  render: text => <p style={{width:80}}>{text}</p>,
},{
  title:'余额',
  dataIndex: 'balance',
  render: text => <p style={{width:80}}>{text}</p>,
},
{
  title:'收款人邮箱',
  dataIndex: 'email',
  render:  (text, record, index) =><p style={{width:140}}>{accountExs(record,'accountExs','email')}</p>
},{
  title:'状态',
  dataIndex: 'status',
  render: text => <p style={{width:60}} style={{color:text===0?'green':'red'}}>{Open_disable(text)}</p>,
},{
      title:'收款账户类型',
      dataIndex: 'accountType',
      render: (text, record, index)=><p style={{width:80}} style={{color:'#22BC22'}}>{accountExs(record,'accountExs','accountType')}</p>,
}];

const data = [{
  key: '1',
  agencyNo: 'G00001',//合作商编号
  groupNo:'dontkonw',//合作商组
  name: '钱橙的公司',
  idCard:6226880011192452,
  phone: 13819723334,
  status:'1', //("状态 0是开启，1是禁用")
  balance:'3000',
  sumNum:1,
  accountExs:{//收款信息
    contract:"丁国庆",//收款人姓名
    bankCard:"6222020200015660000",//收款账号
    bankName:"工商银行",//收款银行
    cardMobile:"13552005525",//收款银行手机号
    email:"test@test.com",//邮箱
    accountType:0,// 账户类型 0个人  1公户"
  },
  config:{//商户配置 
      notifyUrl:'',//  要这个就可以了
      returnUrl:null,
      inTransitLimit:null,
      balanceLimit:null
  }
}];

export default offcialList;
