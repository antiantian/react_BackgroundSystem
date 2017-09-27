## 技术应用 ##

- react.js
- react-router
- react-router-dom
- fetch.js
- antd组建
- mock.js
- node+express构建假数据
- react-dnd-html5-backend拖拽

  
## 安装步骤 ##
	npm install							  // 安装项目依赖，等待安装完成之后

## 本地开发 ##

	// 开启服务器，浏览器访问 http://localhost:3000
	npm start

## 构建生产 ##

	// 执行构建命令，生成的dist文件夹放在服务器下即可访问
	npm run build
	
## 目录结构介绍 ##

- [目录结构](#directory)

	
## 权限管理 ##	
  
- [权限管理文档](anthority_manage.md)


## resetantd使用##

- [日期选择](#newtimepicker)
- [时间选择](#newdatepicker)
- [公共表格列表](#tablecommon)
- [下拉列表](#newselect)
- [自动文本框](#newautocomplete)
- [单选按钮组](#newradiogroup)

## 编辑与添加列表 公共组件的使用 ##

- [费率生成组件](#addpaymentchannel_createconfig)  
- [配置生成组件](#addpaymentchannel_createpay)
- [多选拖拽](#drag)

## 公共函数的使用 ##

- [列表页面初始化state](#initliststate)  
- [编辑添加按钮传递state](#addeditparams)
- [详情页返回按钮传递state](#returnaddedit)
- [newfetch数据请求](#newfetch)
- [提交验证事件](#submitvalidate)

### `directory` 


	|-- build                            // webpack配置文件
	|-- config                           // 项目打包路径
	|-- src                              // 源码目录
	|   |--config                        // 后台api配置文件
	|   |--index.js                      // 程序入口文件，加载各种公共组件
	|   |--layout.js                     // 页面入口文件
	|   |--layoutlist.js                 // 默认展示导航列表
	|   |--RouteMap.js                   // 路由配置文件
	|   |--404.js                        // 404页面
	|   |--login.js                      // 登录
	|   |--common                        // 公共组件
	|      |-- cardValidate              // 银行卡，手机号，身份证验证函数
	|	   |-- fetch                     // 请求函数封装
	|      |-- formJson                  // 账户状态共享
	|      |-- util                      // 公共函数与信息（各种列表状态与公共事件）
	|      |-- resetAntd                 // 根据项目需要重新组装的antd组建（基于antd）
	|      |-- commonID                  // 为各自的系统配置adminId
	|      |-- changePWD                 // 修改密码公共部分
	|      |-- windowAnimate             // requestAnimationFrame函数
	|      |-- CreateMenu                // 导航生成组建
	|   |--css                           // 样式文件
	|   |--deal                          // 交易模块
	|      |-- dealList                  // 交易记录 
	|      |-- dealDetals                //
	|      |-- settleList                // 代付记录
	|      |-- flowDetails               //
	|      |-- merchantCapitalFlow       // 商户资金流水列表  
	|      |-- merchantCapitalFlowDetail //
	|      |-- officialCapitalFlow       // 合作商资金流水列表  
	|      |-- officialCapitalFlowDetail //
	|      |-- merchantDaily             // 商户日报表
	|      |-- officialDaily             // 合作商日报表   
	|   |--EditAddCommon                 // 编辑添加公共模块（费率与配置）
	|      |-- addPaymentChannel_CreateConfig  // 费率组件
	|      |-- addPaymentChannel_CreatePay     // 配置组件
	|      |-- DragSelect                      // 多选拖拽
	|      |-- EAcommon                        // 提交验证
	|      |-- FormParamsCommon                // 参数列表
	|   |--merchant                      // 商户模块
	|      |-- merchantList              // 商户列表
	|      |-- addMerchant               // 添加编辑商户
	|      |-- MerchantCapital           // 商户资金列表
	|      |-- MerchantCapitaDetail      // 商户资金列表详情
	|   |--official                      // 合作商模块
	|      |-- offcialList               // 合作商列表
	|      |-- addOffcial                // 添加编辑合作商
	|      |-- groupList                 // 合作商组列表
	|      |-- addGroup                  // 添加编辑合作商组
	|   |--settings                      // 设置模块
	|      |-- paymentWay                // 支付方式
	|      |-- addPaymentWay             // 添加编辑支付方式
	|      |-- paymentType               // 支付类型
	|      |-- addPaymentType            // 添加编辑支付类型
	|      |-- paymentConfiguration      // 支付配置
	|      |-- addPaymentConfiguration   // 添加编辑支付配置
	|      |-- paymentChannel            // 支付通道
	|      |-- addPaymentChannel         // 添加编辑支付通道
	|      |-- settlementList            // 结算通道列表
	|      |-- editSettlement            // 添加编辑结算通道列表
	|   |--user                          // 用户
	|      |-- pwdchange                 // 修改密码
	|-- public                           // 静态资料
	    |-- index.html					 // 入口html文件
	|-- .babelrc                         // ES6语法编译配置
	|-- .editorconfig                    // 代码编写规格
	|-- .gitignore                       // 忽略的文件
	|-- package.json                     // 项目及工具的依赖配置文件
	|-- README.md                        // 说明



## resetantd说明 ##

根据项目需要重新封装相关的组件，减少函数编写，方便使用

## 使用方法 ##

```bash
   
   import {NewTimePicker,NewDatePicker,TableCommon,NewSelect,NewRadioGroup,NewAutoComplete}  from '../common/resetAntd.js';
  

```

### `NewTimePicker`

```bash
  
   <NewTimePicker 
     newStart={this.state.start}  //初始化值
     name="start"                 //state名称
     changeTime={this.onChangeTime} //改变时间事件
   />
   
   onChangeTime=(name,timeString)=> {
        this.setState({
          [name]:timeString
        })
   }
```

aaa 

# `NewDatePicker`

```bash
  
   <NewDatePicker 
        name={'endTime'}    //state名称
        style={{ marginRight: 10 ,verticalAlign:"middle"}}
        time={this.state.endTime}  //初始化值
        changeDatePicker={this.changeDatePicker}  //改变时间事件
        isend={true}                              //是否是结束时间 showTime=> this.props.isend? moment('23:59:59', 'HH:mm:ss'):moment('00:00:00', 'HH:mm:ss')
        title={'请输入结束时间'}                  //placeholder提示文字
     />
    changeDatePicker=(date,dateString,name)=>{
        this.setState({[name]:dateString})
     }

```

# `TableCommon`

```bash
  
   <TableCommon 
     onShowSizeChange={this.onShowSizeChange}  //改变每页显示多少条事件
     onChangePage={this.onChangePage}          //改变当前页事件
     columns={columns}                         //表格显示内容的配置
     currentpage={this.state.current}          //当前页
     currentpageSize={this.state.pageSize}     //每页条数
     data={this.state.data}                    //要现实的内容数组
     total={this.state.total}                  //总条数
     totalAmount={this.state.totalAmount}      //总金额  不填则不显示
     load={this.state.loading}                 //loading状态
     scroll={{ x: 1300 }}                      //固定滚动条限制宽度  自动可写 ｛｛x:true｝｝
     style={{marginTop:"20px"}}
  />
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
```

# `NewSelect`

```bash
  
   <NewSelect 
     size={size}  //size ‘large..’
     name="paymentStatus"             //state名称
     value={this.state.paymentStatus} //初始化值
     datas={data_gender}              //展示列表
     valMess={'key'}                  //对应val  如果datas是根据后台请求的值 修改valMess 与 textMess的名称
     textMess={'name'}                //对应text
     placeholder="合作商组" 
     style={{  width: 110, verticalAlign: 'middle', marginRight: 10  }} 
     onselChange={this.onselChange}   //事件改变
   />
   
   const data_gender=[
     {
        val:'-1',
        text:'全部'
      },
      {
        val:'express_t1',
        text:'快捷支付T1'
      },
      {
        val:'express_d0',
        text:'快捷支付D0'
      },
      {
        val:'gateway',
        text:'网关'
      }
    ]
       
```


#  `NewAutoComplete`

```bash

    <NewAutoComplete
        changeVal2={this.changeVal2}  //改变事件
        placeholder="填写收款方名称"
        value={this.state.accountName_value} //初始值
        names="accountName"                  //state name
        text="收款方名称:"                   //左侧文字
        check={this.state.accountName_Checked} //勾选图标状态
    />
    
    changeVal2=(value,name)=>{
       //返回的name名称 和 值
        var names=name+"_value";
        var checks=name+"_Checked";
        this.forms.setForm(names,value)
         this.setState({
            [names]:value
         })  
         
         if(value!==''){
           this.setState({
            [checks]:true
            }) 
           if(name==='bankName'&&value!==this.state.bankName_value){
                this.setState({
                  bankNo:[],
                  zbankName_value:'',
                  zbankNo_value:'',
                  run:false,
                  bank_nameChecked:false
                })  
           }
         }else{
            this.setState({
            [checks]:false
            }) 
            if(name==='bankName'){
              this.setState({
                bankNo:[],
                zbankName_value:'',
                zbankNo_value:'',
                run:false,
                bank_nameChecked:false
              })  
            }
         }
    }

```   

#  `NewRadioGroup`

```bash

    <NewRadioGroup
      RadioGroupVal={this.RadioGroupVal}
      value={this.state.settlementType_value}
      names={"settlementType"}
      text={"付款类型:"}
      datas={[{val:0,text:'余额代付'},{val:1,text:'垫资代付'}]}
    />
    
    RadioGroupVal=(e,name)=>{
        var names=name+"_value";
         this.setState({
            [names]:e.target.value
         })  
    }
    
```

### 公共状态的使用
## 作用##

列表与详情页之间的状态传递

## 使用方法 ##

```bash
   
   import {messParams,messChildParams,addEditParams,initListState,returnAddEdit} from './../common/util';

```

# `initliststate` 

```bash
  
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
      'agencyNo','merchantNo','channelCode'],                               //要传递的状态数组名称
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
     
    this.initListState(this.BalancePost,this.stateArray)  //初始化状态 以及列表请求事件
    this.getchannelCode()
  }
  ...
}

 ////

 
```

# `addeditparams` 

```bash
     //添加或编辑时的事件
     function addEditParams(pathname,isAdd,stateArray,record)
     pathname:路径
     isAdd：0添加  1 保存  没有的时候填null
     stateArray:传递的状态数组
     record;记录的值 可不填
   
```

# `returnaddedit` 

```bash
  //返回按钮的事件
  <Button onClick={
   ()=>this.returnAddEdit('/layout')  //填写路径
  } style={{float:'right'}}>
 返回
</Button>
  
```

```bash

//详情页面接受列表传来的值
   constructor(props){
      super(props);
      this.blurValidate=blurValidate;
      this.keyUpInner=keyUpInner;
      this.returnAddEdit=returnAddEdit;
      this.state = {
      merchantNo:messParams(this.props.location.state.mess,'merchantNo'),
      agencyNo:messParams(this.props.location.state.mess,'agencyNo'),
      name:messParams(this.props.location.state.mess,'name'),
      idCard:messParams(this.props.location.state.mess,'idCard'),
      initIdCard:messParams(this.props.location.state.mess,'idCard','null'), 
      phone:messParams(this.props.location.state.mess,'phone'),
      agencyGroupId:messParams(this.props.location.state.mess,'agencyGroupNo','null')?parseInt(this.props.location.state.mess.agencyGroupNo):'',
      contract:messChildParams(this.props.location.state.mess,'accountExs','contract'),
      bankCard:messChildParams(this.props.location.state.mess,'accountExs','bankCard'),
      bankName:messChildParams(this.props.location.state.mess,'accountExs','bankName'),
      cardMobile:messChildParams(this.props.location.state.mess,'accountExs','cardMobile'),
      email:messChildParams(this.props.location.state.mess,'accountExs','email'),
      password:messChildParams(this.props.location.state.mess,'accountExs','password'),
      accountType:messChildParams(this.props.location.state.mess,'accountExs','accountType','0').toString(),
      status:messParams(this.props.location.state.mess,'status','0').toString(),
      isAdd:this.props.location.state.isAdd, //0 add 1 edit
      notifyUrl:messChildParams(this.props.location.state.mess,'config','notifyUrl'),
      PayConfigList:[],
      PayConfigList_check:false,
      rateJson:[],
      open:false,
      ratenames:[],
      rateNecsssary:['minTransaction','maxTransaction','rate'],
      agencyGroupIdLists:[],
      idCard_class:'',//inputErrors
      }
      
   }
   
   
  messParams(mess,params,defauleVal)
  //传递的 record;记录的值 
  //params 参数名称 
  //defauleVal 没有返回值的初始值   'arr'==》 []  'null'==> {}  否则为 ‘’空
  messChildParams(mess,child,params,defauleVal)
  //child  代表两级参数 child 父级名称
  //params  父级下面的子集名称
  

```

# `newfetch`

## 使用方法 ##

```bash
   
   import {api} from '../config.js';
   import newfetch from './../common/fetch';
   import changeID from './../common/commonID';

```


```bash
   getchannelCode = () => {
        var objectJson={
            token:localStorage.cok,
            name:this.state.name,
            numPerPage:this.state.pageSize,
            pageNum:this.state.current
        }
        changeID(objectJson);                      //根据global添加id 没有则不写
        var obj={
          url:api.resourcePath+api.getPayChanList, //路径
          jsonp:objectJson,                        //传递的参数
          func200:(json)=>{                        //请求成功的事件
              global.token = json.token;
              this.setState({
                loading: false,
                data: json.data,
                total: json.data[0].sumNum,
              })
          },
          func201:(json)=>{                       //没有数据时的事件
             this.setState({
                total: 0,
                data: [],
                loading: false,
              })
          }
        }
        newfetch(obj)
  }


```

## 费率生成组件 
### `addPaymentchannel_createconfig`

```bash

 import CreatePay from './../EditAddCommon/addPaymentChannel_CreatePay';
 import CreateConfig from './../EditAddCommon/addPaymentChannel_CreateConfig';
 import {ValidateEA,postObject,rateJson_Change} from '../EditAddCommon/EAcommon';
 import {paymentChannelRate,paymentChannelConfigs} from '../EditAddCommon/FormParamsCommon';
 
```

```bash

<Row gutter={20}>
      <Col style={{textAlign:'right',fontWeight:900,lineHeight:'32px'}} span={4}>
           <div>费率信息:</div>
      </Col>
      <Col  span={16} style={{marginBottom:'20px'}}>
           {this.state.PayConfigList_check&&
              <div>
                  {this.state.PayConfigList.map((item,index)=>
                     <CreatePay  
                       datasVal={this.state.datasVal}
                       datasValidate={this.state.datasValidate}  //是否验证通过
                       codename={this.state.codename}            //未通过的state名称
                       ref="FormGroup" 
                       changeParrateJson={this.changerateJson}   //文本改变事件
                       key={index} 
                       index={index} 
                       item={item} 
                       necessaryMess={this.state.rateNecsssary}  //要验证的state名称数组
                       changeValidate={this.repayvalidate}       //验证结束事件
                       chanRates={this.state.chanRates}          //接收的默认信息对象 用来初始化值
                       default_OBJ={paymentChannelRate}          //默认显示的信息对象 补全不全的信息 请求的可能不全
                     />
                  )}
              </div>
            }
      </Col>
</Row>        

changerateJson=(obj)=>{  //每个改变时 要改变整体对象组的值
    var arr=this.state.rateJson;
    var names=this.state.ratenames;
    rateJson_Change(obj,arr,names,()=>{
           this.setState({
             rateJson:arr,
             ratenames:names
           })  
    })
    // console.log(JSON.stringify( arr ))
  }
 repayvalidate=()=>{
       this.setState({
          datasValidate:'true'
        }) 
  }          

```

## 配置生成组件 
### `addPaymentchannel_createpay` 

```bash
  <Row gutter={20}>
      <Col style={{textAlign:'right',fontWeight:900,lineHeight:'32px'}} span={4}>
            <div>配置信息:</div> 
      </Col>
      <Col  span={16} style={{marginBottom:'20px'}}>
           {this.state.ConfigList_check&&
                <CreateConfig 
                   datasValidate={this.state.configValidate}    //是否验证通过
                   changeValidate={this.revalidate}             //验证结束事件
                   ref="FormGroup2" 
                   necessaryMess={this.state.configNecsssary}   //要验证的state名称数组
                   changeParrateJson={this.changeConfigJson}    //文本改变事件
                   chanConfigs={this.state.config}              //接收的默认信息对象 用来初始化值
                   default_OBJ={paymentChannelConfigs}          //默认显示的信息对象 补全不全的信息 请求的可能不全
                 />
            }
      </Col>
  </Row> 
  
  changeConfigJson=(obj)=>{
     this.setState({
         configJson:obj.datas
     })
  }
  revalidate=()=>{
       this.setState({
          configValidate:'true'
        }) 
  }
 
```

## 多选拖拽

### 参考链接(https://github.com/antiantian/react.js-drag-react-dnd/blob/master/README.md)

### `drag`

```bash

import HTML5Backend from 'react-dnd-html5-backend';
import DragSelect from '../EditAddCommon/DragSelect';


```


```bash
  <Col span={12}>
   {channelConfigArr&&channelConfigArr.map((card, i) => (
      <DragSelect
        key={card.id}
        index={i} 
        id={card.id}                   //select拖拽组建的id 
        text={card.text}               //select拖拽组建的text
        parentData="channelConfig"     //要改变的state
        moveCard={this.moveCard}       //拖拽改变事件
        identfy="channelConfigselect"  //拖拽唯一的命名
      />
    ))}
  </Col>

```

 
### `submitvalidate`

## 使用方法 ##

```bash
   
   import {ValidateEA,postObject} from '../EditAddCommon/EAcommon';

```

```bash
  conserve=()=>{
    const saveList=[{   //要验证的state数组  只需要填必填的 
      index:'payCode',           //state名称
      mess:'通道编号不能为空',   //提示文字
      arr:this.state.payCode     //state相应的值
    },{
      index:'name',
      mess:'通道名称不能为空',
      arr:this.state.name
    },{
      index:'phone',
      mess:'手机号不能为空',
      arr:this.state.phone,
      type:'phone',           //type  为phone时代表手机号
    },{
      index:'bankCard',
      mess:'收款账户号不能为空',
      arr:this.state.bankCard,
      type:'banknum',         //type  为banknum时代表银行卡
    },{
      index:'rateJson',
      type:'datasValidate', //数组验证    //type  为datasValidate时代表数组验证
      necessary:this.state.rateNecsssary, //必填项
      arr:this.state.rateJson,
      mess:'费率信息不能为空',            //为空时的错误提示     
      messAll:'请补全费率必填信息',       //不全时的错误提示      
    },{
      index:'configJson',
      type:'objValidate', //对象验证   //type  为objValidate时代表对象验证
      necessary:this.state.configNecsssary,
      arr:this.state.configJson,
      mess:'配置信息不能为空',
      messAll:'请补全配置必填信息',
    }]
  var ValidateReturn=ValidateEA(saveList);  //ValidateEA 验证函数  return {nextDo:nextDo,indexVal:indexVal,codename:codename}
   if(ValidateReturn.nextDo){               //nextDo:true 验证通过  false 不通过
      const objectJson={                    
        token:localStorage.cok,
        isAdd:this.state.isAdd,
      }
      postObject(saveList,objectJson)
      changeID(objectJson);
      var obj={
        url:api.resourcePath+api.savePayChan,
        jsonp:objectJson,
        func200:()=>{
            message.info('请求成功');
            hashHistory.push('/paymentChannel')
        }
      }
        newfetch(obj) 
    }else{
       if(ValidateReturn.indexVal=='rateJson'){ //indexVal 返回对应的state
                  this.setState({
                    datasValidate:'false',             //通知相关的组件 验证未通过 
                    codename:ValidateReturn.codename,  //未填的state名称  codename
                  })
       }else if(ValidateReturn.indexVal=='configJson'){
                 this.setState({
                    configValidate:'false'
                  })
       }
    }  
 }
 
```
