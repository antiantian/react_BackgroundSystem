## 说明
 > 根据后台返回字段的内容改变导航列表的数组

## 后台返回的参数形式

 type              |  name,Description
 ----------------- |  -----------
 String            |  role       用户角色
 Array             |  url         显示的导航数组
 Object            |  authority   黑白名单
 
 
 ```javascript
 
    role:"admin",      // admin/super
    url:[
      "交易/*",        //url:[*]当值为*的时候代表全部展示
      "合作商/*",
      "设置/支付方式，支付类型，支付配置"
    ]

 ```
##  参数说明
    1. 一级以”/”区分  二级以“,”区分
    2. 实现：根据返回的url数组改变导航展示列表的数组值，当url返回的值为[“*”]时，使用默认的导航展示列表，否则根据返回的数组重新生成导航展示数组（根据返回值匹配默认数组里的相应值）

## 默认展示数组
 
  
 ```bash
    Slidebar:展示的导航文字
    path:导航路径 
    details:详情页路径 
    buttonState:黑白名单（后追加）
 ```
 
### code

  ```javascript
   
    const Slider=null;
    const Index=null;
    const Repos=null;
    const About=null;
    //details 详情页路径 必填
    //buttonState 黑白名单列表 登录后才会追加 
    const layoutList = [
      { path: null,
        exact: true,
        sidebar:'交易',
        type:"pay-circle-o",
        main:null,
        parent:'sub1',
        children: [
                { path: '/layout',details:'/dealDetals', main: Slider, sidebar:'交易记录'},
                { path: '/settleList',details:'/flowDetails', main: Repos, sidebar:'代付记录'},
                { path: '/merchantCapitalFlow',details:'/merchantCapitalFlowDetail', main: Index, sidebar:'商户资金流水列表' }, 
                { path: '/officialCapitalFlow',details:'/officialCapitalFlowDetail', main: Slider, sidebar:'合作商资金流水列表'},
                { path: '/merchantDaily',details:'', main: Repos, sidebar:'商户日报表' },
                { path: '/officialDaily',details:'', main: Index, sidebar:'合作商日报表' },   
        ]  
      },
      { path:null,
        sidebar:'合作商',
        type:"team",
        main:null,
        parent:'sub2',
        children: [
               { path: '/offcialList',details:'/addOffcial', main: Slider, sidebar: '合作商列表'},
               { path: '/groupList',details:'/addGroup', main: Repos, sidebar: '合作商组列表' },
        ]
      },
      { path:null,
        sidebar:'商户',
        type:"user",
        main:null,
        parent:'sub3',
        children: [
               { path: '/merchantList',details:'/addMerchant', main: Slider, sidebar: '商户列表'},
               { path: '/merchantCapital',details:'/merchantCapitaDetail', main: Repos, sidebar: '商户资金列表' },
        ]
      },
      { path:null,
        sidebar:'设置',
        type:"setting",
        parent:'sub4',
        main:null,
        children: [
                { path: '/paymentWay',details:'/addPaymentWay', main: About, sidebar: '支付方式'},
                { path: '/paymentType',details:'/addPaymentType', main: Repos, sidebar: '支付类型' },
                { path: '/paymentConfiguration',details:'/addPaymentConfiguration', main: Index, sidebar: '支付配置' },
                { path: '/paymentChannel',details:'/addPaymentChannel', main: Repos, sidebar: '支付通道' },
                { path: '/settlementList',details:'/EditSettlement', main: Index, sidebar: '结算通道列表' },   
            ]
      }
    ]
    export default  layoutList;


  ```
### 代码实现思路

   返回的url每个值 用“/”分割为数组
   例如 var  arr= “设置/支付方式，支付类型，支付配置”.split(“/”)
   arr[0]=” 设置”;  arr[1]=” 支付方式，支付类型，支付配置”
   arr[0]匹配默认数组layoutlIst里的 slidebar为“设置的”子集
   arr[1]匹配slidebar为“设置的”里的childern数组 重新生成一个新的子集数组

### 获取显示url列表以及黑白名单

### code

  ```javascript
   // src/login.js
   if(global.systemtypes==2){
                var arr=[
                  '交易/交易记录,代付记录,商户资金流水列表,合作商资金流水列表',
                  '合作商/*',
                  '商户/*'
                ];
                var authority={
                      type:'black',  //black 不显示 white只显示
                      list:[
                        "交易/交易列表/导出",
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
                    const list_url={
                      list_url:list
                    }
                    //localStorage.layoutlist=JSON.stringify(list_url);
                    global.layoutlist=JSON.stringify(list_url);
                    //console.log(localStorage.layoutlist)
                }
                //黑白名单
                 if(authority&&authority.type){
                    //localStorage.authorityType=authority.type;//黑白名单类型
                    global.authorityType=authority.type;//黑白名单类型
                 }
                //黑白名单列表
                if(authority&&authority.list){
                    const list_layoutlist={
                      list_layoutlist:authority.list
                    }
                    //localStorage.authoritylist=JSON.stringify(list_layoutlist);
                    global.authoritylist=JSON.stringify(list_layoutlist);
                }
              }
              
    }              
   
  ```

### 生成新的展示列表（根据返回的列表匹配默认列表的值，产生一个新的展示列表）

### code
   
  
  ```javascript
  //代码实现 src/layout.js
   state = {
    initlist:global.layoutlist?JSON.parse(global.layoutlist).list_url:layoutlist, //获取的或者默认的列表
  }
  //产生导航组建
  <SiderMenu
        theme="dark" 
        onClick={this.handleClick}
        defaultOpenKeys={[openkey]}
        selectedKeys={[current]}
        mode="inline"
        initlist={this.state.initlist}
     />
   //代码实现 src/common/CreateMenu.js
    import React,{Component} from 'react';
    import {Link,hashHistory  } from 'react-router';
    import { Layout,Icon, Menu } from 'antd';
    
    const { Header, Content, Footer, Sider } = Layout;
    const SubMenu = Menu.SubMenu;
    export default class SiderMenu extends Component {
      constructor(props) {
        super(props)
        this.state={
            menus:null
        }
      }
      componentDidMount(){
        console.log(this.props.initlist)
         //赋值给state防止反复调用循环 
         this.setState({
            menus:this.recursion(this.props.initlist)
         })
      }
      recursion(dataSource,beginIdex) {
        return (
          dataSource.map((item, index) => {
            let beginIndex;
            if(!beginIdex){
                const parent=dataSource;
               let init=0;
               for(let i=0;i<index;i++){
                  init+=parent[i].children.length;
               }
               init=index==0?1:init+1;
               beginIndex=init;
            }
           
            if (item.children) {
    
              return (
                <SubMenu 
                   key={"sub"+(index+1)} 
                   title={
                     <span>
                        <Icon type={item.type} />
                        <span className="nav-text">{item.sidebar}</span>
                     </span>
                }>
                   {this.recursion(item.children,beginIndex)}
                </SubMenu>
              )
            } else {
              return (<Menu.Item key={beginIdex+index}><Link to={{
                        pathname:item.path,
                        state:{
                          buttonState:item.buttonState,
                        }
              }}>{item.sidebar}{item.buttonState}</Link></Menu.Item>)
            }
          })
        )
      }
    
      render() {
        return (
          <Menu {...this.props}> 
          {
            this.recursion(this.props.initlist)
            /*this.state.menus*/
          }
          </Menu>
        );
      }
    }
  ```
  
### 路由拦截

不在列表展示里的链接跳转到404页面
路由拦截：手动输入链接时 判断动态导航列表中是否存在相同的链接地址，存在则显示，不存在不显示
实现：获取pathname 与动态导航列表里的path,details对比，不存在则跳转到404
Route  onEnter事件用户进入该路由时触发


### code实现

 ```javascript
 
 //src/RouteMap.js
    ...
    class RouteMap extends React.Component { 
      state = {
        initlist:global.layoutlist?JSON.parse(global.layoutlist).list_url:layoutlist,
      }
      updateHandle() { 
          //console.log(this.state.initlist) //不会改变
          // console.log(localStorage.layoutlist?JSON.parse(localStorage.layoutlist).list_url:null)
      } 
      render() { 
        return ( 
           <Router history={this.props.history} onUpdate={this.updateHandle.bind(this)}> 
              <Route path="/login" component={WrappedNormalLoginForm}/>
              <Route path="/layout" component={LayoutSlider} onEnter={requireCredentials}>
                     <IndexRoute component={DealList} onEnter={requireCredentials}/> 
                     ...
                    <Route path="/settlementList" component={SettlementList} onEnter={requireCredentials}/>
                    <Route path="/editSettlement" component={EditSettlement} onEnter={requireCredentials}/>
                    <Route path="/bankleitzahl" component={Bankleitzahl} onEnter={requireCredentials}/>                
              </Route>
              <Route path="/" >
                    <IndexRedirect to="/login" />
              </Route>
              <Route path='/404' component={Fail} />
              <Redirect from='*' to='/404' />  
          </Router> 
        ) 
      } 
    }   
    export default RouteMap;
    
     //权限控制的中间服务
    function requireCredentials(nextState, replace, next) {
      //获取传输过来的数据
      const repathname=nextState.location.pathname;
      if (hadINDEX(repathname)) {
        
        next()
       
      } else {
        replace('/404')
        next()
      }
    }　　
    function hadINDEX(pathnamepara){
       //截取路径 因为有的会带参数
       let pathname="/"+pathnamepara.split("/")[1];
       let initlist=global.layoutlist?JSON.parse(global.layoutlist).list_url:layoutlist;
             let pathARR=[];
            for(let i=0;i<initlist.length;i++){
               const par=initlist[i].children;
               for(let j=0;j<par.length;j++){
                  pathARR.push({
                      path:par[j].path,
                      par:initlist[i].parent,
                      child:par[j].details,
                  });
               }
            }
        let nesArray=pathARR;
        let had=false;
        for(let i=0;i<nesArray.length;i++){
           if(nesArray[i].path===pathname||nesArray[i].child===pathname){
              had=true;
              break
           }
        }
        return had
    }
 ```
