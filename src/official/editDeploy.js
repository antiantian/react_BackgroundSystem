import React from 'react';
import {Row, Col, Button, Select, Form, Input, Icon, Switch} from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;

function handleChange(value) {
  console.log(`selected ${value}`);
}
class EditDeploy extends React.Component {
    render(){
        return (
            <div>
                <Button className="qc-add-list">返回</Button>
                <h2 className="deal-title">合作商-业务配置</h2>
                <Row className="addOffcial-Border">
                    <Col span={6} style={{fontWeight:700}}>合作商名称</Col>
                    <Col span={6}>京东商城</Col>
                    <Col span={6} style={{fontWeight:700}}>合作商编号</Col>
                    <Col span={6}>GB00001</Col>
                </Row>
                <Row style={{marginTop:30}}>
                    <Col span={6} style={{fontWeight:700,textAlign:'right'}}><span style={{marginRight:10}}>合作商组</span></Col>
                    <Col span={12}>
                        <Select defaultValue="0" onChange={handleChange} span={24} style={{width:80}}>
                            <Option value="0">组1</Option>
                            <Option value="1">Lucy</Option>
                            <Option value="2">yiminghe</Option>
                        </Select>
                    </Col>
                </Row>
                <Row style={{marginTop:10}}>
                    <Col span={6} style={{fontWeight:700,textAlign:'right'}}><span style={{marginRight:10}}>支付通道</span></Col>
                    <Col span={12}>
                        <Button type="primary" size="small" style={{marginRight:10}}>支付宝</Button>
                        <Button type="primary" size="small" style={{marginRight:10}}>银联支付</Button>
                        <Button type="primary" size="small" style={{marginRight:10}}>微信支付</Button>
                    </Col>
                </Row>

                <Row style={{marginTop:10}}>
                    <Col span={6} style={{fontWeight:700,textAlign:'right'}}><span style={{marginRight:10}}>结算通道</span></Col>
                    <Col span={12}>
                        <Select defaultValue="0" onChange={handleChange} style={{width:80}}>
                            <Option value="0">支付宝</Option>
                            <Option value="1">Lucy</Option>
                            <Option value="2">yiminghe</Option>
                        </Select>
                    </Col>
                </Row>

                <Row style={{marginTop:10}}>
                    <Col span={6} style={{fontWeight:700,textAlign:'right'}}><span style={{marginRight:10}}>结算扣率-垫资代付</span></Col>
                    <Col span={12}>
                        <Input value="0.0387"/>
                    </Col>
                    <Col span={6}>例0.0038</Col>
                </Row>

                <Row style={{marginTop:10}}>
                    <Col span={6} style={{fontWeight:700,textAlign:'right'}}><span style={{marginRight:10}}>结算固定扣率-垫资代付</span></Col>
                    <Col span={12}>
                        <Input value="0.0387"/>
                    </Col>
                    <Col span={6}>单位元</Col>
                </Row>

                <Row style={{marginTop:10}}>
                    <Col span={6} style={{fontWeight:700,textAlign:'right'}}><span style={{marginRight:10}}>结算提现比例-垫资代付</span></Col>
                    <Col span={12}>
                        <Input value="0.0387"/>
                    </Col>
                    <Col span={6}>例0.80</Col>
                </Row>

                <Row style={{marginTop:10}}>
                    <Col span={6} style={{fontWeight:700,textAlign:'right'}}><span style={{marginRight:10}}>结算扣率-余额代付</span></Col>
                    <Col span={12}>
                        <Input value="0.0387"/>
                    </Col>
                    <Col span={6}>例0.0038</Col>
                </Row>

                <Row style={{marginTop:10}}>
                    <Col span={6} style={{fontWeight:700,textAlign:'right'}}><span style={{marginRight:10}}>结算固定扣率-余额代付</span></Col>
                    <Col span={12}>
                        <Input value="0.0387"/>
                    </Col>
                    <Col span={6}>单位元</Col>
                </Row>

                <Row style={{marginTop:10}}>
                    <Col span={6} style={{fontWeight:700,textAlign:'right'}}><span style={{marginRight:10}}>结算提现比例-余额代付</span></Col>
                    <Col span={12}>
                        <Input value="0.0387"/>
                    </Col>
                    <Col span={6}>例0.38</Col>
                </Row>

                <Row style={{marginTop:10}}>
                    <Col span={6} style={{fontWeight:700,textAlign:'right'}}><span style={{marginRight:10}}>开始时间</span></Col>
                    <Col span={12}>
                        <Input value="0.0387"/>
                    </Col>
                    <Col span={6}>例：09:00:00</Col>
                </Row>

                <Row style={{marginTop:10}}>
                    <Col span={6} style={{fontWeight:700,textAlign:'right'}}><span style={{marginRight:10}}>结束时间</span></Col>
                    <Col span={12}>
                        <Input value="0.0387"/>
                    </Col>
                    <Col span={6}>例：21:00:00</Col>
                </Row>

                <Row style={{marginTop:10}}>
                    <Col span={6} style={{fontWeight:700,textAlign:'right'}}><span style={{marginRight:10}}>全部商户当日结算限额-垫资代付</span></Col>
                    <Col span={12}>
                        <Input value="0.0387"/>
                    </Col>
                    <Col span={6}>单位元</Col>
                </Row>

                <Row style={{marginTop:10}}>
                    <Col span={6} style={{fontWeight:700,textAlign:'right'}}><span style={{marginRight:10}}>全部商户当日结算限额-余额代付</span></Col>
                    <Col span={12}>
                        <Input value="0.0387"/>
                    </Col>
                    <Col span={6}>单位元</Col>
                </Row>

                <Row style={{marginTop:10}}>
                    <Col span={6} style={{fontWeight:700,textAlign:'right'}}><span style={{marginRight:10}}>单商户单日结算限额-垫资代付</span></Col>
                    <Col span={12}>
                        <Input value="0.0387"/>
                    </Col>
                    <Col span={6}>单位元</Col>
                </Row>

                <Row style={{marginTop:10}}>
                    <Col span={6} style={{fontWeight:700,textAlign:'right'}}><span style={{marginRight:10}}>单商户单日结算限额-余额代付</span></Col>
                    <Col span={12}>
                        <Input value="0.0387"/>
                    </Col>
                    <Col span={6}>单位元</Col>
                </Row>

                <Row style={{marginTop:10}}>
                    <Col span={6} style={{fontWeight:700,textAlign:'right'}}><span style={{marginRight:10}}>开启</span></Col>
                    <Col span={12}>
                        <Switch checkedChildren={'开'} unCheckedChildren={'关'} defaultChecked={true}/>
                    </Col>
                </Row>
                
                <div className="qc-save">
                    <Button type="primary">保存</Button>
                </div>
            </div>

           
        );
    }
}

export default EditDeploy;