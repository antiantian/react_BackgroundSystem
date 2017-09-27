// import React from 'react';
 import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {hashHistory} from 'react-router';
import RouteMap from './RouteMap';
import Mock from './mock';
Mock.bootstrap();
class App extends React.Component {
  render() {
    return (
      <div>{this.props.children}</div>
    )
  }
}
ReactDOM.render(
  <RouteMap history={hashHistory}/>,
  document.getElementById('qc')
);

 