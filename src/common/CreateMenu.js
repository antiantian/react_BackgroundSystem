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