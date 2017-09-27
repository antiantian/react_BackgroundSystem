import React,{Component} from 'react';
import {Link,hashHistory, IndexRedirect,Route  } from 'react-router';
import { Layout, Menu, Breadcrumb,Dropdown, Icon, Button, message, Popconfirm } from 'antd';
import newfetch from './common/fetch.js';
import {api} from './config.js';
import layoutlist from './layoutlist';
import SiderMenu from './common/CreateMenu';
import Fail from './404';
const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;

const text = '确定要退出吗?';
function confirm() {
  message.info('已经退出');
  localStorage.removeItem('cok');
  localStorage.removeItem('loginId');
  localStorage.removeItem('systemtypes');//删除用户类型
  localStorage.removeItem('whiteBlackList');
  global.systemtypes=1;
  hashHistory.push('/login');
}
 //如果黑白名单存在
   // modeFake();

class LayoutSlider extends React.Component {
  state = {
    mode: 'inline',
    current: '1',
    openkey:'sub1',
    systemtypes:localStorage.systemtypes,
    initkey:1,
    initlist:localStorage.whiteBlackList&&JSON.parse(localStorage.whiteBlackList).layoutlist?JSON.parse(localStorage.whiteBlackList).layoutlist:layoutlist,
  }
  handleClick = (e) => {
    this.setState({
      current: e.key,
    });
  }
  componentWillMount(){
        let pathARR=[];
        for(let i=0;i<this.state.initlist.length;i++){
           const par=this.state.initlist[i].children;
           for(let j=0;j<par.length;j++){
              pathARR.push({
                  path:par[j].path,
                  par:this.state.initlist[i].parent,
                  child:par[j].details,
              });
           }
        }
        pathARR.push({
          path:'/Pwdchange',
          par:'sub1',
        })
        this.setState({
           indexArray:pathARR
        },()=>{
           console.log(this.state.indexArray)
        })
  }
   componentDidMount() {
   
    
    if(localStorage.whiteBlackList&&JSON.parse(localStorage.whiteBlackList).authoritylist){
        const authority=JSON.parse(localStorage.whiteBlackList).authoritylist;
        for(let i=0;i<authority.length;i++){
             const listArr=authority[i].split("/");
             const parentName=listArr[0]+"/"+listArr[1];
             const childs=listArr[2];
             const defaultList=this.state.initlist;
             let next=true;
             for(let j=0;j<defaultList.length;j++){
                  let listPar=defaultList[j].sidebar;
                  let listChild= defaultList[j].children;  
                  for(let m=0;m<listChild.length;m++){
                      let childPar=listChild[m].sidebar;
                      let name=listPar+"/"+childPar;
                     
                      if(parentName===name){
                           console.log(11+"name"+name)
                           listChild[m].buttonState=childs;
                           next=false;
                           break;
                      }
                  } 
                  if(!next){
                        break;
                  }
             }
        }
        console.log("默认黑白名单列表")
        console.log(layoutlist) 

    }

    // console.log(1)
    // console.log(this.state.initlist);
    // console.log(localStorage.layoutlist?JSON.parse(localStorage.layoutlist):"")
    // console.log(this.props)
    // console.log(this.props.children)
    hostShow(); 
    var j = 60;
    var timer2 = null;
     clearInterval(timer2);
      timer2 = setInterval(function () {
      j--;
      //console.log(j);
      if (j <= 0) {
        //每60秒请求一次
        hostShow();
        j=60;
      } 
    }, 1000);
  }
 menu(){
  return <Menu onClick={this.handleClick}>
    <Menu.Item key="Pwdchange">
      <Link to="/Pwdchange">修改密码</Link>
    </Menu.Item>
    <Menu.Item key="quit">
     <Popconfirm placement="bottom" title={text} onConfirm={confirm} okText="Yes" cancelText="No" style={{marginTop:'-50px'}}>
      <span style={{width:'100%',display:'inline-block'}}>安全退出</span>
    </Popconfirm>
   </Menu.Item> 
  </Menu>
}
hadINDEX=(pathname)=>{
    const nesArray=this.state.indexArray;
    let had=false;
    for(let i=0;i<nesArray.length;i++){
       //child的作用 显示详情页  否则会被拦截
       if(nesArray[i].path===pathname||nesArray[i].child===pathname){
          had=true;
          break
       }
    }
    return had
}
getCurrent=(pathname)=>{
   
   let parent=null;
   const nesArray=this.state.indexArray;
   let mount=0;
    for(let i=0;i<nesArray.length;i++){
       mount++;
       if(nesArray[i].path===pathname||nesArray[i].child===pathname){
          parent=nesArray[i].par;
          break
       }
    }
    return {
      mount:mount,
      parent:parent
    }
}
  render() {
    const nextpathname="/"+this.props.location.pathname.split("/")[1];
    const hadpathname=this.hadINDEX(nextpathname);//拦截路由
    //hadpathname=true;
    //当前选中的link
    const current=this.getCurrent(nextpathname).mount?this.getCurrent(nextpathname).mount.toString():this.state.current;
    //被打开的父级
    const openkey=this.getCurrent(nextpathname).parent?this.getCurrent(nextpathname).parent:this.state.openkey;
    return (
       <Layout>
            <Header style={{ background: '#368CBD', padding: 0 ,position: 'fixed', width: '100%'}}>
              <div className="logo">后台系统{hadpathname?"1":"0"}</div>
              <div className="qc-header-name">
                <div style={{ float: 'right', height: 64, marginLeft: 50 }}>
                    <Dropdown overlay={this.menu()}>
                      <a className="ant-dropdown-link" >
                        <em>您好{nextpathname}，{localStorage.systemtypes}admin：{localStorage.loginId} </em> <Icon type="down" style={{color:'#ffffff'}} />
                      </a>
                    </Dropdown>
                </div>
              </div>
            </Header>
             <Layout  style={{ margin: '64px 0 0 0' }}>
               <Sider
                 trigger={null}
                  breakpoint="lg"
                  collapsedWidth="0"
                  style={{ overflow: 'auto',width:'180px'}}
               >

                     <SiderMenu
                        theme="dark" 
                        onClick={this.handleClick}
                        defaultOpenKeys={[openkey]}
                        selectedKeys={[current]}
                        mode="inline"
                        initlist={this.state.initlist}
                     />
                      {/*
                        layoutlist.map((menu, index) =>
                         <CreateMenu
                            changeLen={this.changeKeyInit}
                            beginIndex={this.state.initkey}
                            menu={menu}
                            key={index}
                            index={index}
                            ref="navBar"
                         />
                        )*/
                      }
               </Sider>
                <Layout style={{ margin: '0 0 15px 0' }}>
                  <Content style={{ margin: '16px 16px 0',position:'relative'}}>
                      <div style={{ padding: 16, background: '#fff', minHeight: 360 }}>
                            {this.props.children}    
                      </div>
                  </Content>
                </Layout>
            </Layout>
          </Layout>
      );
  }
}

class SiderMenuLI extends Component {
  constructor(props) {
    super(props)
  }

  recursion(dataSource,beginIdex) {
    return (
      dataSource.map((item, index) => {
        let beginIndex;
        if(!beginIdex){
            const parent=dataSource;
           var init=0;
           for(let i=0;i<index;i++){
              init+=parent[i].children.length;
           }
           init=index==0?1:init+index;
           beginIndex=init;
        }
       
        if (item.children) {
          return (
            <li key={"sub"+(index+1)} title={"sub"+(index+1)}>
              <span><Icon type={item.type} /><span className="nav-text">{item.sidebar}</span></span>
              {this.recursion(item.children,beginIndex)}
            </li>
          )
        } else {
          return (<p title={beginIdex+index} key={beginIdex+index}><Link to={item.path}>{item.sidebar}</Link></p>)
        }
      })
    )
  }

  render() {
    return (
      <ul {...this.props}>
      {
        this.recursion(layoutlist)
      }
      </ul>
    );
  }
}


//标签页响应判断
var i = 900;
var timer = null;

var hiddenProperty = 'hidden' in document ? 'hidden' : 'webkitHidden' in document ? 
'webkitHidden' : 'mozHidden' in document ? 'mozHidden' : null;
var visibilityChangeEvent = hiddenProperty.replace(/hidden/i, 'visibilitychange');

var onVisibilityChange = function () {
  if (!document[hiddenProperty]) {//响应标签
    clearInterval(timer);
    i=900;
  } else {//不响应标签
    timer = setInterval(function () {
      i--;
      //console.log(i);
      if (i <= 0) {
        localStorage.removeItem('cok');
        localStorage.removeItem('loginId');
        localStorage.removeItem('whiteBlackList');
        localStorage.removeItem('layoutlist'); //导航列表
        localStorage.removeItem('authoritylist'); //黑白名单列表
        localStorage.removeItem('authorityType'); //黑白名单类型
        global.systemtypes=1;
        hashHistory.push('/login');
       // message.warning('自动退出');
        clearInterval(timer);
      }
    }, 1000);
  }
}



//当前页点击响应
function ScreenSaver(settings) {
  this.settings = settings;

  this.nTimeout = this.settings.timeout;

  document.body.screenSaver = this;
  // link in to body events 
  document.body.onmousemove = ScreenSaver.prototype.onevent;
  document.body.onmousedown = ScreenSaver.prototype.onevent;
  document.body.onkeydown = ScreenSaver.prototype.onevent;
  document.body.onkeypress = ScreenSaver.prototype.onevent;

  var pThis = this;
  var f = function () { pThis.timeout(); }
  this.timerID = window.setTimeout(f, this.nTimeout);
}
ScreenSaver.prototype.timeout = function () {
  if (!this.saver) {
    localStorage.clear();
    hashHistory.push('/login');
  }
}
ScreenSaver.prototype.signal = function () {
  if (this.saver) {
    this.saver.stop();
    hostShow();
  }

  window.clearTimeout(this.timerID);

  var pThis = this;
  var f = function () { pThis.timeout(); }
  this.timerID = window.setTimeout(f, this.nTimeout);
}

ScreenSaver.prototype.onevent = function (e) {
  this.screenSaver.signal();
}

var saver;
function initScreenSaver() {
  saver = new ScreenSaver({ timeout:900000});
}

initScreenSaver();

document.addEventListener(visibilityChangeEvent, onVisibilityChange);
//var undeloginId = (localStorage.loginId==undefined ? '' : localStorage.loginId);
function hostShow(){
  fetch(api.resourcePath+api.refresh, {
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      body: "token=" + localStorage.cok + "&adminId=" + localStorage.loginId
    }).then((response) => response.json())
      .then((json) => {

        // api/list正常返回格式{errcode:0,errmsg:'',data:[]}
        if (json.code == '400'){
          localStorage.clear();
          hashHistory.push('/login');
        }
      })
      .catch((err) => {
        // message.warning('数据请求失败');
      });
}

export default LayoutSlider;

function modeFake(){
     if(true){
                var arr=[
                  '交易/交易记录,代付记录,商户资金流水列表,合作商资金流水列表',
                  '合作商/*',
                  '商户/*'
                ];
                var authority={
                      type:'black',  //black 不显示 white只显示
                      list:[
                        "交易/交易记录/导出",
                        "合作商/合作商列表/编辑,导出,添加"
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
                    localStorage.layoutlist=JSON.stringify(list_url);
                    //console.log(localStorage.layoutlist)
                }
                //黑白名单
                 if(authority&&authority.type){
                    localStorage.authorityType=authority.type;//黑白名单类型
                 }
                //黑白名单列表
                if(authority&&authority.list){
                    const list_layoutlist={
                      list_layoutlist:authority.list
                    }
                    localStorage.authoritylist=JSON.stringify(list_layoutlist);
                }  
              }
}