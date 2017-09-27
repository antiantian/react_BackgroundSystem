import React,{Component} from 'react';
import { Select, Input, Button, Table, message, DatePicker, Row, Col, Spin, Pagination } from 'antd';
import { hashHistory } from 'react-router';
import moment from 'moment';
import {api} from '../config.js';
import newfetch from './../common/fetch';
import changeID from './../common/commonID';
import {payType_Common} from '../common/commonType.js';
import {finishDate,payType,statusText,data_gender,data_express_deal,changeCodeName,addEditParams,initListState} from './../common/util';
import {NewDatePicker,TableCommon,NewSelect}  from '../common/resetAntd.js';
const Option = Select.Option;
let channelCodeName = [];
let columns={};
class DealList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      startTime: '',
      endTime: '',
      startTime3:'',
      order_startTime: '',
      order_endTime: '',
      loading: true,
      size: 'large',
      current: 1,
      pageSize: 10,
      total: 0,
      totalAmount: 0,
      orderNo: '',
      merchantOrderNo: '',
      paymentStatus: '-1',
      channelCode: '',
      express: '-1',
      agencyNo: '',
      merchantNo: '',
      channelCodeName: "",
      arrs: [],
    };
    this.stateArray=[
      'orderNo','startTime','endTime','order_startTime','order_endTime',
      'express','current','pageSize','paymentStatus','merchantOrderNo',
      'agencyNo','merchantNo','channelCode'],
    this.addEditParams=addEditParams; //一定要使用this 否则不会绑定到当前的组建属性等
    this.initListState=initListState;
    columns.push({
         title: '详情',
         dataIndex: 'sumNum',
         render: (text, record, index) => <Button onClick={()=>{
           this.addEditParams('/dealDetals/'+record.orderNo,null,this.stateArray)
        }}>详情</Button>
      })
  }
 componentWillUnmount(){
    //移除最后一个  因为会重新添加
    columns.pop();
  }
  componentDidMount() {
    this.initListState(this.BalancePost,this.stateArray)
    this.getchannelCode()
  }
  getchannelCode = () => {
    const obj = {
      url: api.resourcePath + api.getPayChanList,
      jsonp: {
        token: localStorage.cok,
        isPage: 1,
        adminId: localStorage.loginId,
      },
      func200: (json) => {
       
        var str = [];
        if (json.data && json.data.length > 0) {
          channelCodeName=json.data;
           str.push(<Option key={'-1'} value={''}>请选择</Option> )
          for (var i = 0; i < json.data.length; i++) {
            str.push(<Option key={i} value={json.data[i].channelCode}>{json.data[i].name}</Option>)
          }
        }
        this.setState({
          arrs: str
        })
      }
    }
    newfetch(obj)
  }
  queryButton = (event) => {
    this.BalancePost();
  }
  handleChangeChannelCode = (event) => {
    this.setState({
      channelCode: event
    })
  }
  BalancePost = () => {
    const obj = {
      url: api.resourcePath + api.paymentOrderList,
      jsonp: {
        token: localStorage.cok,
        orderNo: this.state.orderNo,
        createStartDate: this.state.startTime,
        createEndDate: this.state.endTime,
        payType: this.state.express,
        payStartDate: this.state.order_startTime,
        payEndDate: this.state.order_endTime,
        status: this.state.paymentStatus,
        merchantOrderNo: this.state.merchantOrderNo, 
        agencyNo: this.state.agencyNo,
        merchantNo: this.state.merchantNo,
        numPerPage: this.state.pageSize,
        pageNum: this.state.current,
        adminId: localStorage.loginId,
        channelCode: this.state.channelCode,
      },
      func200: (json) => {
        this.setState({
          loading: false,
          data: json.data,
          totalAmount: json.data[0].sumAmount,
          total: json.data[0].sumNum,
        })
      },
      func201: (json) => {
        this.setState({
          loading: false,
          data: [],
          totalAmount:0,
          total:0,

        })
      }
    }
    newfetch(obj)
  }
  resetBtn = () => {
    this.setState({
      startTime: '',
      endTime: '',
      order_startTime: '',
      order_endTime: '',
      current: 1,
      pageSize: 10,
      orderNo: '',
      merchantOrderNo: '',
      paymentStatus: '-1',
      channelCode: '',
      express: '-1',
      agencyNo: '',
      merchantNo: '',
      channelOrderNo: '',
    }, () => {
      this.BalancePost();
    });
  }

  render() {
    const size = this.state.size;
    return (
      <div>
        <h2 className="deal-title">交易记录{this.state.children}</h2>
        <div className="example-input">
          <Input size="large" 
             placeholder="请输入平台订单号" 
             style={{ width: 150 }} 
             name="orderNo" 
             value={this.state.orderNo} 
             onChange={this.ChangeAll} 
          />
          <Input 
             size="large" 
             placeholder="请输入商户订单号" 
             style={{ width: 150 }} 
             name="merchantOrderNo"
             value={this.state.merchantOrderNo} 
             onChange={this.ChangeAll} 
          />
          <Input size="large" 
             placeholder="请输入合作商编号" 
             style={{ width: 120 }} 
             name="agencyNo"
             value={this.state.agencyNo} 
             onChange={this.ChangeAll} 
          />
          <Input size="large" 
              placeholder="请输入商户编号" 
              style={{ width: 150 }} 
              name="merchantNo"
              value={this.state.merchantNo} 
              onChange={this.ChangeAll} 
          />
          <Select
            size={size}
            placeholder="通道名称"
            style={{ width: 110, verticalAlign: 'middle', marginRight: 10, color: this.state.channelCode == '' ? '#d9d9d9' : 'rgba(0, 0, 0, 0.65)' }}
            value={this.state.channelCode}
            onChange={this.handleChangeChannelCode}
          >
            {this.state.arrs}
          </Select>
          <NewSelect 
           size={size}
             name="express" 
             value={this.state.express}
             datas={data_express_deal} 
             style={{  width: 110, verticalAlign: 'middle', marginRight: 10  }} 
             onselChange={this.onselChange}
           />
          <NewSelect 
           size={size}
             name="paymentStatus" 
             value={this.state.paymentStatus}
             datas={data_gender} 
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
          <NewDatePicker 
                size="large"
                name={'order_startTime'} 
                time={this.state.order_startTime}  
                changeDatePicker={this.changeDatePicker} 
                title={'订单支付开始时间'}
             />
          <NewDatePicker 
                name={'order_endTime'} 
                style={{ marginRight: 10 ,verticalAlign:"middle"}}
                time={this.state.order_endTime}  
                changeDatePicker={this.changeDatePicker} 
                isend={true}
                title={'订单支付结束时间'}
             />
          <Button type="primary" icon="search" style={{ marginRight: 10, width: '40px' }} onClick={this.queryButton} size="large"></Button>
          <Button icon="reload" onClick={this.resetBtn} size="large" style={{ width: '40px' }}></Button>
          {/*
             <CreateExportButton
              action={api.resourcePath+api.exportPaymentOrder} 
              method="post" 
              target="_blank" 
              className="exportForm"
              arrList={[
                {val:"token",text:localStorage.cok},
                {val:"adminId",text:localStorage.loginId},
                {val:"status",text:this.state.paymentStatus},
                {val:"createStartDate",text:this.state.startTime},
                {val:"createEndDate",text:this.state.endTime},
                {val:"payStartDate",text:this.state.order_startTime},
                {val:"payEndDate",text:this.state.order_endTime},
                {val:"orderNo",text:this.state.orderNo},
                {val:"merchantOrderNo",text:this.state.merchantOrderNo},
                {val:"merchantNo",text:this.state.merchantNo},
                {val:"agencyNo",text:this.state.agencyNo},
                {val:"pageNum",text:this.state.current},
                {val:"numPerPage",text:this.state.pageSize},
                {val:"payType",text:this.state.express}
                ]}
            />
          */}
          {!this.state.hideExportButton&&

            <form action={api.resourcePath + api.exportPaymentOrder} method="post" target="_blank" className="exportForm">
              <input type='hidden' name="token" value={localStorage.cok} />
              <input type='hidden' name="adminId" value={localStorage.loginId} />
              <input type='hidden' name="status" value={this.state.paymentStatus} />
              <input type='hidden' name="createStartDate" value={this.state.startTime} />
              <input type='hidden' name="createEndDate" value={this.state.endTime} />
              <input type='hidden' name="payStartDate" value={this.state.order_startTime} />
              <input type='hidden' name="payEndDate" value={this.state.order_endTime} />
              <input type='hidden' name="orderNo" value={this.state.orderNo} />
              <input type='hidden' name="merchantOrderNo" value={this.state.merchantOrderNo} />
              <input type='hidden' name=" merchantNo" value={this.state.merchantNo} />
              <input type='hidden' name="agencyNo" value={this.state.agencyNo} />
              <input type='hidden' name="pageNum" value={this.state.current} />
              <input type='hidden' name="numPerPage" value={this.state.pageSize} />
              <input type='hidden' name="payType" value={this.state.express} />
              <button id='orderDaochu' type="submit" style={{ width: '40px' }}>导出</button>
            </form>
          }
        </div>
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
             scroll={{ x: 1300 }}
             style={{marginTop:"20px"}}
          />
      </div>
    );
  }
  exportBtn=()=>{
        const obj = {
        url: api.resourcePath+api.exportPaymentOrder,
        jsonp: {
          token: localStorage.cok,
          orderNo: this.state.orderNo,
          createStartDate: this.state.startTime,
          createEndDate: this.state.endTime,
          payType: this.state.express,
          payStartDate: this.state.order_startTime,
          payEndDate: this.state.order_endTime,
          status: this.state.paymentStatus,
          merchantOrderNo: this.state.merchantOrderNo, 
          agencyNo: this.state.agencyNo,
          merchantNo: this.state.merchantNo,
          numPerPage: this.state.pageSize,
          pageNum: this.state.current,
          adminId: localStorage.loginId
        },
        func200: (json) => {
          console.log(json)
        }
      }
      newfetch(obj)
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
}
class CreateExportButton extends Component{
   constructor(props){
     super(props);
   }
   render(){
     const {arrList,action,method,target,className}=this.props;
     const Inputs=this.props.arrList.map((item,index)=>{
         return <input key={index} type='hidden' name={item.val} value={item.text} />
    })

     return(
          <form 
            action={action} method={method} target={target} className={className}
          >
              {Inputs}
              <button id='orderDaochu' type="submit" style={{ width: '40px' }}>导出</button>
            </form> 
     )
   }
}
columns = [{
  title: '平台订单号',
  dataIndex: 'orderNo',
  width: 150,
  fixed: 'left',
  render: text => <p style={{width:'150px'}}>{text}</p>,
}, {
  title: '商户订单号',
  dataIndex: 'merchantOrderNo',
  width: 150,
  render: text => <p style={{width:'150px'}}>{text}</p>,
}, {
  title: '合作商编号',
  dataIndex: 'agencyNo',
  render: text => <p style={{width:'90px'}}>{text}</p>,
}, {
  title: '商户号',
  width: 130,
  dataIndex: 'merchantNo',
  render: text => <p style={{width:'130px'}}>{text}</p>,
},
{
  title: '通道订单号',
  width: 100,
  dataIndex: 'channelOrderNo',
  render: text => <p style={{width:'100px'}}>{text}</p>,
}, {
  title: '通道名称',
  dataIndex: 'channelCode',
  width: 100,
  render: text => <p style={{width:'90px'}}>{changeCodeName(text,channelCodeName)}</p>,
}, {
  title: '创建时间',
  dataIndex: 'createDate',
  render: text => <p style={{width:'140px'}}>{moment(text).format('YYYY-MM-DD HH:mm:ss')}</p>,
}, {
  title: '支付时间',
  dataIndex: 'finishDate',
  render: text => <p style={{width:'140px'}}>{finishDate(text)}</p>,
}, {
  title: '交易类型',
  dataIndex: 'payType',
  render: text => <p style={{width:'90px'}}>{payType(text)}</p>,
}, {
  title: '交易金额',
  dataIndex: 'amount',
  render: text => <p style={{width:'90px'}}>{text}</p>,
},
{
  title: '手续费',
  dataIndex: 'fee',
  render: text => <p style={{width:'70px'}}>{text}</p>,
},
{
  title: '状态',
  dataIndex: 'status',
  width: 80,
  render: text => <p style={{width:'80px'}}>{statusText(text)}</p>,
}];



export default DealList;

