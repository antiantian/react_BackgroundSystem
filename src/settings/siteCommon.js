import React, { Component } from 'react';
import {  Row, Col,Input,Button, } from 'antd';

class SiteCommon extends Component {
  // constructor(props){
  //   super(props)
  //   this.state={
  //    chinaese: '';
  //    English: " ";
  //   }
  // }
  render() {
    return (
     <div className="siteCommon">
        <Row gutter={20}>
      <Col style={{textAlign:'right'}} span={4}>
        <div>{this.props.chinaese} <p>{this.props.English}</p></div>
      </Col>  
       <Col className="gutter-row" span={16}>
                <div className="gutter-box"><Input placeholder="large size"  size="large" /></div>
        </Col>
      <Col className="gutter-row" span={4}>
        <div className="gutter-box"><Button type="primary">保存</Button></div>
      </Col> 
      </Row>
  </div>
    );
    }
 }   
 
export default SiteCommon;



