import React from 'react';
import { Form, Icon, Input, Button, Checkbox,message } from 'antd';
import {hashHistory,Link} from 'react-router';
class Fail extends React.Component {
   constructor(props) {
    super(props);
  }
  render() {
    return (
       <p style={{...style}}>您访问的页面不存在,
       <Button style={{color:'#108ee9',marginLeft:'10px'}} onClick={()=>{
          hashHistory.goBack();
       }}>返回之前页面</Button>
       </p>

    );
  }
}
export default Fail;
const style = {
  textAlign:'center',
  padding:"50px 0",
};