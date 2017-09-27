import React from 'react';
import { DatePicker, Table, Button, Row, Col, message, Spin, Select, Input, Pagination, Message, Steps, } from 'antd';
import { hashHistory } from 'react-router';
import moment from 'moment';
import {api} from '../config.js';
import newfetch from './../common/fetch';
import changeID from './../common/commonID';
import FlowDetails from './flowDetails';
import {finishDate,dai_payType,dai_paystatus,data_settleType,data_settleStatus,changeCodeName,addEditParams,initListState} from './../common/util';
import {NewDatePicker,TableCommon,NewSelect}  from '../common/resetAntd.js';
const Option = Select.Option;
let channelCodeName=[];
function onChange1(pagination, filters, sorter) {
  console.log('params', pagination, filters, sorter);
}
class SettleList extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      startTime: "",
      endTime: "",
      loading: true,
      size: 'large',
      current: 1,
      pageSize: 10,
      total:"",
      selected1: '-1',
      settleStatus: '-1',
      mineOrder:"",
      express:'express_t1',
      merchantNo:"",
      agencyNo:"",
      settlementCode:'',
      arrs:[],
    }
    this.stateArray=[
      'selected1','settleStatus','startTime','endTime','mineOrder',
      'agencyNo','merchantNo','settlementCode','current','pageSize'],
    this.addEditParams=addEditParams; //一定要使用this 否则不会绑定到当前的组建属性等
    this.initListState=initListState;
    columns.push({
         title: '详情',
         dataIndex: 'sumNum',
         width: 80,
         fixed: 'right',
         render: (text, record, index) => <Button onClick={()=>{
           this.addEditParams('/flowDetails/'+record.orderNo,null,this.stateArray)
        }}>详情</Button>
      })
  }
  componentWillUnmount(){
    //移除最后一个  因为会重新添加
    columns.pop();
  }
  componentDidMount() {
    console.log(this.props)
    this.initListState(this.BalancePost,this.stateArray)
    this.getchannelCode()
  }
  getchannelCode=()=>{
   const obj={
      url:api.resourcePath+api.getSettChanList,
      jsonp:{
        token:localStorage.cok,
        isPage:1,
        adminId:localStorage.loginId,
      },
     func200:(json)=>{
         var str=[];
         if(json.data&&json.data.length>0){
          channelCodeName=json.data;
           str.push(<Option key={-1} value={''}>请选择</Option> )
            for(var i=0;i<json.data.length;i++){
              // console.log(json.data[i].settlementCode)
                str.push(<Option key={i} value={json.data[i].settlementCode}>{json.data[i].name}</Option> )
            }
         }
          this.setState({
              arrs:str,
          })          
     }   
    }
     newfetch(obj)   
  }
  queryPost = (e) => {
    this.BalancePost();
  }
  BalancePost = () => {
    const obj={
      url:api.resourcePath+api.settOrderList,
      jsonp:{
        token:localStorage.cok,
        adminId:localStorage.loginId,
        payType:this.state.selected1,
        status:this.state.settleStatus,
        createStartDate:this.state.startTime,
        createEndDate:this.state.endTime,
        orderNo:this.state.mineOrder,    
        agencyNo:this.state.agencyNo,
        merchantNo:this.state.merchantNo,
        channelCode:this.state.settlementCode,
        numPerPage:this.state.pageSize,
        pageNum:this.state.current
      },
      func200:(json)=>{
          global.token = json.token;
          this.setState({
            loading: false,
            data: json.data,
            total: json.data[0].sumNum,
            totalAmount: json.data[0].sumAmount,
          })
      },
      func201:(json)=>{
         global.token = json.token;
          this.setState({
            loading: false,
            data:[],
            total:0,
            totalAmount:0
          })
      }
    }
    newfetch(obj)
  }
  getTime(dates, dateString) {
    this.setState({
      startTime: dateString,
    })
  }
  getTime2(dates, dateString) {
    this.setState({
      endTime: dateString,
    })
  }
  render() {
    const size = this.state.size;
    return (
      <div>
        <h2 className="deal-title">代付记录</h2>
         <Row>
      <Col span={24}>      
                 <div className="example-input">
                     <Input 
                       size="large" 
                       placeholder="输入代付订单号" 
                       style={{ width: '150px'}}
                       name="mineOrder"
                       value={this.state.mineOrder} 
                       onChange={this.ChangeAll}
                      />
                      <Input 
                       size="large" 
                       placeholder="输入商户编号"  
                       style={{ width: 150 }} 
                       name="merchantNo"
                       value={this.state.merchantNo} 
                       onChange={this.ChangeAll}
                     />
                     <Input 
                       size="large" 
                       placeholder="输入合作商编号" 
                       style={{ width: 120}} 
                       name="agencyNo"
                       value={this.state.agencyNo}  
                       onChange={this.ChangeAll}
                      />
                      <Select 
                       size={size}
                       placeholder="通道名称" 
                       value={this.state.settlementCode} 
                      style={{ width: 110,verticalAlign:'middle',marginRight:10,color:this.state.settlementCode==''?'#d9d9d9':'rgba(0, 0, 0, 0.65)'}} 
                      onChange={this.handleChangeSettlementCode}
                       >
                       {this.state.arrs}
                      </Select>
                      <NewSelect 
                       size={size}
                         name="settleStatus" 
                         value={this.state.settleStatus}
                         datas={data_settleStatus} 
                         style={{  width: 110, verticalAlign: 'middle', marginRight: 10  }} 
                         onselChange={this.onselChange}
                       />
                      <NewSelect 
                       size={size}
                         name="selected1" 
                         value={this.state.selected1}
                         datas={data_settleType} 
                         style={{  width: 110, verticalAlign: 'middle', marginRight: 10  }} 
                         onselChange={this.onselChange}
                       /> 
                      <NewDatePicker 
                            size="large"
                            name={'startTime'} 
                            time={this.state.startTime}  
                            changeDatePicker={this.changeDatePicker} 
                            title={'请输入开始时间'}
                         />
                      <NewDatePicker 
                            name={'endTime'} 
                            style={{ marginRight: 10 ,verticalAlign:"middle"}}
                            time={this.state.endTime}  
                            changeDatePicker={this.changeDatePicker} 
                            isend={true}
                            title={'请输入结束时间'}
                         />
                        <Button type="primary" icon="search" size="large" style={{marginRight:10,width: '40px'}} onClick={this.queryPost} ></Button>
                        <Button icon="reload" size="large" onClick={this.resetBtn} style={{ width: '40px'}}></Button>
                        <form action={api.resourcePath+api.exportSettOrder} method="post" target="_blank"  className="exportForm">
                        <input type='hidden' name="token" value={localStorage.cok} />
                        <input type='hidden' name="adminId" value={localStorage.loginId} />
                        <input type='hidden' name="createStartDate" value={this.state.startTime} />
                        <input type='hidden' name="createEndDate" value={this.state.endTime} />
                        <input type='hidden' name="payType" value={this.state.selected1} />
                        <input type='hidden' name="status" value={this.state.settleStatus} />
                        <input type='hidden' name="orderNo" value={this.state.mineOrder} />
                        <input type='hidden' name="merchantNo" value={this.state.merchantNo} />
                        <input type='hidden' name="agencyNo" value={this.state.agencyNo} />
                        <input type='hidden' name="numPerPage" value={this.state.pageSize} />
                         <input type='hidden' name="pageNum" value={this.state.current} />
                        <button id='daochu' type="submit" style={{ width: '40px'}}>导出</button>
                    </form>
               </div>      
            </Col>
           </Row>
           <TableCommon 
             onShowSizeChange={this.onShowSizeChange}  
             onChangePage={this.onChangePage}
             columns={columns}
             currentpage={this.state.current}
             currentpageSize={this.state.pageSize}
             data={this.state.data}
             total={this.state.total}
             totalAmount={this.state.totalAmount}
             load={this.state.loading}
             scroll={{ x: 1700 }}
             style={{marginTop:"20px"}}
          />
      </div>
    )
  }
  onselChange=(val,name)=>{
      this.setState({
        [name]:val
      })
    } 
  ChangeAll = (e) => {
    this.setState({ [e.target.name]:e.target.value });
  }
 changeDatePicker=(date,dateString,name)=>{
    this.setState({[name]:dateString})
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
  resetBtn = () => {
    this.setState({
      current: 1,
      pageSize: 10,
      selected1: '-1',
      settleStatus: '-1',
      mineOrder: '',
      merchantNo:"",
      agencyNo:"",
      settlementCode:'',
      startTime:'',
      endTime:'',
    },()=>{
      this.BalancePost(10, 1);
    });
  }
  handleChangeSettlementCode=(event)=>{
    this.setState({
      settlementCode:event
    })
  }
}

const columns = [{
  title: '代付订单号',
  dataIndex: 'orderNo',
  width: 160,
  fixed: 'left',
  render: text => <p style={{width:'160px'}}>{text}</p>,
},
 {
  title: '商户号',
  dataIndex: 'merchantNo',
  width: 150,
  render: text => <p style={{width:'150px'}}>{text}</p>,
},
 {
  title: '商户代付订单号',
  dataIndex: 'merchantSettlementNo',
  render: text => <p className="noWrap" style={{width:'150px'}}>{text}</p>,
}, {
  title: '合作商编号',
  dataIndex: 'agencyNo',
   render: text => <p style={{width:'100px'}}>{text}</p>,
},
{
  title:'关联订单号',
  dataIndex:'relatedOrderNo',
  render: text => <p style={{width:'150px'}}>{text}</p>,
},
{
   title: '通道代付订单号',
  dataIndex: 'channelSettlementNo',
  render: text => <p className="noWrap" style={{width:'150px'}}>{text}</p>,
},{
   title: '通道名称',
  dataIndex: 'settlementCode',
  render: text => <p  style={{width:'90px'}}>{ changeCodeName(text,channelCodeName,'settlementCode')}</p>,
},{
  title: '创建时间',
  dataIndex: 'createDate',
  render: text => <p style={{width:'140px'}}>{moment(text).format('YYYY-MM-DD HH:mm:ss')}</p>,
}, {
  title: '更新时间',
  dataIndex: 'updateDate',  
  render: text => <p style={{width:'140px'}}>{finishDate(text)}</p>,
}, {
  title: '收款方名称',
  dataIndex: 'accountName',
  render: text => <p style={{width:'120px'}}>{text}</p>,
}, {
  title: '银行信息',
  dataIndex: 'bankInfo',
  render: text => <p className="noWrap" style={{width:'100px'}}>{text}</p>,
}, {
  title: '代付类型',
  dataIndex: 'payType',
  render: text => <p style={{width:'90px'}}>{dai_payType(text)}</p>
}, {
  title: '代付金额',
  dataIndex: 'amount',
  render: text => <p style={{width:'90px'}}>{text}</p>
}, {
  title: '状态',
  dataIndex: 'status',
  render: text => <p style={{width:'80px'}}>{dai_paystatus(text)}</p>
}, {
  title: '手续费',
  dataIndex: 'fee',
  render: text => <p style={{width:'70px'}}>{text}</p>
}];

export default SettleList;
