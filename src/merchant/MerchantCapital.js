import React from 'react';
import {Select, Input, Button, Table, Row, Col, message, Spin, Popconfirm,Pagination,Modal} from 'antd';
import {hashHistory} from 'react-router';
import {api} from '../config.js';
import newfetch from './../common/fetch';
import changeID from './../common/commonID';
import {Open_disable,CollectionAccountType,accountExs,addEditParams,initListState,changeDate} from '../common/util.js';
import {TableCommon,NewSelect}  from '../common/resetAntd.js';
// import data from './data';
message.config({
  top: 60,
  duration: 2,
});
const Option = Select.Option;
let  columns=[];
class MerchantCapital extends React.Component {
   constructor(props) {
    super(props);
    this.state = {
      data:[],
      merchantNo:'',
      agencyNo:'',
      status:'0',
      current: 1,
      pageSize:10,
      total:'',
      size: 'large',
      modal2Visible:false,
      nowName:null
    }
    //pathname,isAdd,stateArray,record
    this.stateArray=['merchantNo','agencyNo','current','pageSize'],
    this.addEditParams=addEditParams; //一定要使用this 否则不会绑定到当前的组建属性等
    this.initListState=initListState;
    columns.push(
       {
        title:'操作',
        dataIndex: 'operation',
        render:  (text, record, index) => <div><Button onClick={()=>{
            this.addEditParams('/merchantCapitaDetail',1,this.stateArray,record)
        }}>详情</Button>
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
            pageNum:this.state.current,
            numPerPage:this.state.pageSize,
        }
        changeID(objectJson);
        var obj={
          url:api.resourcePath+api.merchantCapital,
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
  resetBtn=()=>{
    this.setState({
      merchantNo:'',
      agencyNo:'',
      status:'0',
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
                <h2 className="deal-title">商户列表</h2>
                <div className="example-input">
                    <Input size="large" placeholder="输入商户编号" value={this.state.merchantNo} name="merchantNo" onChange={this.changeAll} className="mineWidth"/>
                    <Input size="large" placeholder="输入合作商编号" value={this.state.agencyNo} name="agencyNo" onChange={this.changeAll} className="mineWidth" />
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
      title: '商户编号',
      dataIndex: 'merchantNo',
      width: 165,
      fixed: 'left',
      render: text => <p style={{width:165}}>{text}</p>,
    }, {
      title: '合作商编号',
      dataIndex: 'agencyNo',
      width: 125,
      fixed: 'left',
      render: text => <p style={{width:125}}>{text}</p>,
    }, {
      title: '记账日期',
      dataIndex: 'accountingDate',
      width: 140,
      render: text => <p style={{width:140}}>{changeDate(text)}</p>,
    },{
      title:'交易额',
      dataIndex: 'tradeVolume',
      render: text => <p style={{width:80}}>{text}</p>,
    },{
      title:'净收入',
      dataIndex: 'netIncome',
      render: text => <p style={{width:80}}>{text}</p>,
    },{
      title:'d0提现金额',
      dataIndex: 'withdrawD0',
      render: text => <p style={{width:120}}>{text}</p>,
    },{
      title:'t1提现金额',
      dataIndex: 'withdrawT1',
      render: text => <p style={{width:120}}>{text}</p>,
    },{
      title:'支付手续费',
      dataIndex: 'paymentFee',
      render: text => <p style={{width:120}}>{text}</p>,
    },{
      title:'d0结算手续费',
      dataIndex: 'settFeeD0;',
      render: text => <p style={{width:120}}>{text}</p>,
    },{
      title:'t1结算手续费',
      dataIndex: 'settFeeT1',
      render: text => <p style={{width:120}}>{text}</p>,
    },{
      title:'余额',
      dataIndex: 'balance',
      render: text => <p style={{width:80}}>{text}</p>,
    },{
      title:'在途资金',
      dataIndex: 'inTransit',
      render: text => <p style={{width:100}}>{text}</p>,
    },{
      title:'退款',
      dataIndex: 'refund',
      render: text => <p style={{width:80}}>{text}</p>,
    },{
      title:'冻结',
      dataIndex: 'freeze',
      render: text => <p style={{width:80}}>{text}</p>,
    }]

export default MerchantCapital;

