import React, { Component } from 'react';
import {  Row, Col,Input,Button, } from 'antd';
import SiteCommon from './siteCommon';

class SiteSettings extends Component {
  render() {
    return (
     <div className="siteSettings">
         <h2>站点设置</h2>
         <ul>
             <li><SiteCommon chinaese="域名"  English="domain" /></li>
             <li> <Row gutter={20}>
                    <Col style={{textAlign:'right'}} span={4}>
                        <div>结算 <p>settle</p></div>
                    </Col>  
                    <Col className="gutter-row" span={16}>
                                <div className="gutter-box"><Input type="textarea" placeholder="Autosize height with minimum and maximum number of lines" autosize={{ minRows: 2, maxRows: 6 }} />
                                </div>
                        </Col>
                    <Col className="gutter-row" span={4}>
                        <div className="gutter-box"><Button type="primary">保存</Button></div>
                    </Col>
                </Row> 
            </li>
             <li><SiteCommon chinaese="交易回调地址"  English="trans_notify_url" /></li>
             <li><SiteCommon chinaese="交易返回地址"  English="trans_return_url" /></li>
             <li><SiteCommon chinaese="服务协议端口"  English="workerman-socket" /></li>
         </ul>
  </div>
    );
  }
}

export default SiteSettings;