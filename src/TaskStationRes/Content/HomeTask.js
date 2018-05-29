import React, { Component } from 'react';

import box from '../Images/box2.png';
import TaskIcon from '../Items/TaskIcon';

class HomeTask extends Component {

  constructor(props){
    super(props);
    this.state = {

    }
    //console.log(this.props.assignment)
    //console.log(this.props.currentStatus)
  }

  render(){

    let boxImgStyle = {
      backgroundImage: 'url(' + box + ')',
      backgroundSize: '100% 100%',
      margin: '0.5%'
    }

    //return(
    //  <div style={Object.assign({},boxImgStyle,{flex: 2,display:'flex', flexFlow: 'column nowrap'})}>
    //  </div>
    //)

    let taskTextStyle = {
      fontFamily: 'adobestdb',
      textAlign: 'center',
      lineHeight: 1.25,
      color: '#424242'
    }

    var status = this.props.currentStatus;

    let title =
    status === 'taskOnGoing' || status === 'taskToBeAccept'? '你的任務':
    status === 'lastTaskCompleted'? '任務完成':
    status === 'allTasksCompleted'? '全部任務完成':
    '';

    let desc =
    status === 'taskOnGoing' || status === 'taskToBeAccept'? this.props.assignment.selectTask.task.taskContent:
    status === 'lastTaskCompleted'? '你已完成上一個任務!\n可以進行下一個任務啦!':
    status === 'allTasksCompleted'? '你今天已完成三個任務了!\n先休息一下，明天再來吧!':
    '';

    return(
      <div style={Object.assign({},boxImgStyle,{flex: 2,display:'flex', flexFlow: 'column nowrap'})}>
        <div style={Object.assign({},taskTextStyle,{flex: 3,marginTop: '3%',fontSize: this.props.height * 0.07})}>
          {title}
        </div>
        <div style={Object.assign({},{flex: 9,display: 'flex',justifyContent: 'center',alignItems: 'flex-start'})}>
          <TaskIcon
          currentStatus={this.props.currentStatus}
          icon={this.props.assignment.selectTask && this.props.assignment.selectTask.task.taskIconPath}
          height={this.props.height}/>
        </div>
        <div style={Object.assign({},taskTextStyle,{flex: 5,fontSize: this.props.height * 0.06})}>
          {desc.split('\n').map((item, key) => {
          return <span key={key}>{item}<br/></span>
          })}
        </div>
      </div>
    )
  }
}

export default HomeTask;
