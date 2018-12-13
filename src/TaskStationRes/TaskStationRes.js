import React, { Component } from 'react';
import Content from './Content/Content';
//const loginServer = 'http://10.0.48.21:8004/api/';
//const apiServer = 'http://10.0.48.21:8009/api/';
//const apiServer = 'http://13.229.71.2:8001/endpoint/';

class TaskStationRes extends Component {

  constructor(props){
    super(props);
    this.state = {
      mainFunctions: {
        getApi: this.getApi.bind(this)
      }
    }
    /*var winFeature =
        'location=no,toolbar=no,menubar=no,scrollbars=yes,resizable=yes';
    window.open('Result.html','null',winFeature);*/
  }

  getApi(){
    return process.env.REACT_APP_API;
  }

  render() {
    return (
      <Content
      mainFunctions={this.state.mainFunctions}/>
    );
  }
}

export default TaskStationRes;
