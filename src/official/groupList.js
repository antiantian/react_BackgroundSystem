import React from 'react';
import {Select,  Input, Button, Table} from 'antd';
import {hashHistory} from 'react-router';
import {api} from '../config.js';
import newfetch from './../common/fetch';
import changeID from './../common/commonID';
import {Open_disable,CollectionAccountType,accountExs,addEditParams,initListState} from '../common/util.js';
import {TableCommon,NewSelect}  from '../common/resetAntd.js';
const Option = Select.Option;
let columns=[];
class GroupList extends React.Component {
   constructor(props) {
    super(props);
    this.state = {
    data:[],
    agencyNo:'',
    status:'0',
    current: 1,
    pageSize:10,
    total: '',
    modal2Visible:false,
    nowName:null,
    kid:''
    }
    this.stateArray=['kid','current','pageSize'],
    this.addEditParams=addEditParams; //一定要使用this 否则不会绑定到当前的组建属性等
    this.initListState=initListState;
    columns.push(
       {
          title:'操作',
          dataIndex: 'operation',
          render:  (text, record, index) => <div><Button onClick={()=>{
                   this.addEditParams('/addGroup',1,this.stateArray,record)
                }}>编辑</Button></div>,
        }
    )
  }
 componentWillUnmount(){
    //移除最后一个  因为会重新添加
    columns.pop();
  }
  componentDidMount() {
   this.initListState(this.BalancePost,this.stateArray)
  }
  BalancePost = () => {
        var objectJson={
            token:localStorage.cok,
            pageNum:this.state.current,
            numPerPage:this.state.pageSize,
            id:this.state.kid
        }
        changeID(objectJson);
        var obj={
          url:api.resourcePath+api.getAgencyGroupList,
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
              },()=>{
                this.setState({
                  data:data
                })
              })
          }
        }
        newfetch(obj)
  }
addBotton=()=>{
      this.addEditParams('/addGroup',0,this.stateArray)
  }
  resetBtn=()=>{
    this.setState({
      kid:'',
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
                <Button type="primary" icon="plus" className="qc-add-list" onClick={this.addBotton}>添加</Button>
                <h2 className="deal-title">合作商组列表</h2>
                <div className="example-input">
                    <Input size="large" name="kid" value={this.state.kid} onChange={this.changeAll} placeholder="输入合作商组编号" className="mineWidth" />
                    <Button type="primary" icon="search" style={{marginRight:10}} onClick={this.BalancePost}></Button>
                    <Button icon="reload" onClick={this.resetBtn}></Button>
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
                   scroll={{ x: 1300 }}
                   style={{marginTop:"20px"}}
                />
            </div>
        );
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
  title: '合作商组编号',
  dataIndex: 'key',
}, {
  title: '合作商组名称',
  dataIndex: 'name',
}, {
  title: '支付渠道配置',
  dataIndex: 'channelConfig',
  render:  (text, record, index) =><p style={{width:120}}>{text&&text.length>0?JSON.stringify(text):''}</p>,
},{
  title:'结算渠道配置',
  dataIndex: 'settConfig',
  render:  (text, record, index) =><p style={{width:120}}>{text&&text.length>0?JSON.stringify(text):''}</p>,
},{
  title:'路由配置mode',
  dataIndex: 'mode',
  render:  (text, record, index) =><p style={{width:120}}>{accountExs(record,'routeConfig','mode')}</p>,
},{
  title:'permission',
  dataIndex: 'permission',
  render:  (text, record, index) =><p style={{width:120}}>{accountExs(record,'agencyLimit','permission')}</p>,
},{
  title:'balanceLimit',
  dataIndex: 'balanceLimit',
  render:  (text, record, index) =><p style={{width:120}}>{accountExs(record,'agencyLimit','balanceLimit')}</p>,
}];

const data = [{
  key: 'G00001',//"合作商组编号
  name: '钱橙的公司',//合作商组名称
  channelConfig:["payeco_a","newPayeco","tftpay"],//支付渠道配置
  settConfig:["newPayeco","tftpay"],//结算渠道配置
  routeConfig:{mode:null,retryTime:0},//路由配置
  agencyLimit:{"permission":"create,update","balanceLimit":""}, //限制配置
  agencyRate:[
  {
    rate:'0.233',
    fee:'2',
    minTransaction:'1000',
    maxTransaction:'20000',
    autoD0:true,
    defaultSaleRate:{
      d0Rate:null,
      d0Fee:null,
      allowCredit:true,
      rate:'0.233',
      fee:'2',
      minTransaction:'1000',
      maxTransaction:'20000',
    }
  }],
}, {
  key: '1200001',//"合作商组编号
  name: '合作商组2公司',//合作商组名称
  channelConfig:["payeco_a","newPayeco","tftpay"],//支付渠道配置
  settConfig:["newPayeco","tftpay"],//结算渠道配置
  routeConfig:{mode:null,retryTime:0},//路由配置
  agencyLimit:{"permission":"create,update","balanceLimit":""}, //限制配置
  agencyRate:[
  {
    rate:'0.233',
    fee:'2',
    minTransaction:'1000',
    maxTransaction:'20000',
    autoD0:true,
    defaultSaleRate:{
      d0Rate:null,
      d0Fee:null,
      allowCredit:true,
      rate:'0.13',
      fee:'23',
      minTransaction:'10900',
      maxTransaction:'20000',
    }
  }],
}];

export default GroupList;