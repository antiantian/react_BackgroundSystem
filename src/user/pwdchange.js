import React from 'react';
import { Form, Icon, Input, Button, message} from 'antd';
import {hashHistory} from 'react-router';
import ChangePWD from './../common/changePWD';

export default class passwordChange extends React.Component {
  render(){
    return(
        <ChangePWD/>
    )
  }
}
