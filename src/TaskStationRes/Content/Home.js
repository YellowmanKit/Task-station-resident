import React, { Component } from 'react';
import axios from 'axios';

import titleBar from '../Images/titleBar.png';
import startMission from '../Images/startMission.png';
import nextMission from '../Images/nextMission.png';
import logout from '../Images/logout.png';
import howToLvUp from '../Images/howToLvUp.png';
import scoreRecord from '../Images/scoreRecord.png';
import lastAndThisSeasonScore from '../Images/lastAndThisSeasonScore.png';
import box from '../Images/box2.png';
import scoreYellow from '../Images/scoreYellow.png';
import circleTick from '../Images/circleTick.png';
import continueTask from '../Images/continue.png'

import LvImage from '../Items/LvImage';
import HomeTask from './HomeTask';

class Home extends Component {

  constructor(props){
    super(props);
    this.state = {
      currentStatus: '',
      currentSeasonProfile:{},
      lastSeasonProfile:{},
      loaded: false
    }
    //console.log(props.profile)
  }

  componentDidMount(){
    this.initHome();
  }

  initHome(){
    this.fetchPreformance();
    this.setCurrentStatus(this.props);
  }

  setCurrentStatus(props){
    var _currentStatus = '';
    var audioToPlay='';
    var status='';

    console.log(props.assignments);

    for(var i=0;i<3;i++){
      /*status= 'lastTaskCompleted'
      _currentStatus = status;
      audioToPlay= status;
      break;*/
      if(!props.assignments[i].played){
        _currentStatus = 'taskToBeAccept';
        this.playAudioOfCurrentTask();
        break;
      }
      if(props.assignments[i].played && !this.props.assignments[i].complete){
        _currentStatus = 'taskOnGoing';
        this.playAudioOfCurrentTask();
        break;
      }
      if(i === 2){
        status= 'stampEarned'
        _currentStatus = status;
        audioToPlay= status;
        break;
      }
      if(props.assignments[i].complete && !this.props.assignments[i + 1].played){
        status= 'lastTaskCompleted'
        _currentStatus = status;
        audioToPlay= status;
        break;
      }
    }
    props.contentFunctions.playAudio(audioToPlay);
    this.setState({
      currentStatus: _currentStatus
    });
    console.log(_currentStatus);
  }

  playAudioOfCurrentTask(){
    console.log( this.props.currentAssignment)
    this.props.contentFunctions.playAudioByUrl(
      this.props.currentAssignment.selectTask.task.taskSoundPath
    )
  }

  async fetchPreformance(){
    const resId = this.props.profile.MemID;
    //const resId = 'TT2000001';
    var api =
    this.props.mainFunctions.getApi() +
    'resident/all/quarter/performance/' +
    resId;

    var seasonProfiles = await axios.get(api);
    var _seasonProfiles = seasonProfiles.data;
    //console.log(_seasonProfiles);

    const now = new Date();

    var _currentSeasonProfile = {};
    var _lastSeasonProfile = {};

    for(var i=0;i<_seasonProfiles.length;i++){
      const quarterFrom = new Date(_seasonProfiles[i].quarterFrom);
      const quarterTo = new Date(_seasonProfiles[i].quarterTo);

      if(now > quarterFrom && now < quarterTo){
        _currentSeasonProfile = _seasonProfiles[i];
        if(i > 0){
          _lastSeasonProfile = _seasonProfiles[i - 1];
        }
      }
    }

    this.setState({
      currentSeasonProfile: _currentSeasonProfile,
      lastSeasonProfile: _lastSeasonProfile,
      loaded: true
    });

    //console.log(this.state)
  }

  midButtonPressed(){
    console.log('midButtonPressed: ' + this.state.currentStatus);
    if(this.state.currentStatus === 'allTasksCompleted'){
      window.location.reload();
    }else if(this.state.currentStatus === 'lastTaskCompleted'){
      this.setState({
        currentStatus: 'taskToBeAccept'
      });
      this.playAudioOfCurrentTask();
    }else if(this.state.currentStatus === 'taskToBeAccept'){
      this.props.contentFunctions.taskAccepted();
    }else if(this.state.currentStatus === 'taskOnGoing'){
      this.props.contentFunctions.afterAcceptedTask();
    }
  }

  getTodayCompletedCount(){
    var count = 0;
    for(var i=0;i<3;i++){
      if(this.props.assignments[i].played){
        count++;
      }
    }
    return count;
  }

  render(){

    if(!this.state.loaded){
      return <div/>
    }

    let containerStyle = {
      height: this.props.height,
      width: '' + (this.props.height * 1.7) + 'px',

      display: 'flex',
      flexFlow: 'row nowrap',

    }

    let subcontainerStyle = {
      display: 'flex',
      flexFlow: 'column nowrap'
    }

    let leftBarImgStyle = {
      backgroundImage: 'url(' + titleBar + ')',
      backgroundSize: '100% 100%'
    }

    let buttonStyle = {
      backgroundSize: '100% 100%',
      backgroundColor: 'transparent',
      cursor: 'pointer',
      border: 'none',
      margin: '0.5%'
    }

    let profileImageStyle = {
      backgroundImage: 'url(' + this.props.profile.CltPro + ')',
      backgroundSize: '100% 100%',
      margin: '2% 17.5% 6% 13%',
      borderRadius: "50%"
    }

    let nameTextStyle = {
      fontFamily: 'adobestdb',
      fontSize: this.props.height * 0.055,
      color: 'white',
      textAlign: 'center',
      marginRight: '3%'
    }

    let scoreStatusStyle = {
      backgroundImage: 'url(' + lastAndThisSeasonScore + ')',
      backgroundSize: '100% 100%',
      margin: '5% 15% 0% 10%',
      display: 'flex',
      flexFlow: 'row nowrap'
    }

    let scoreTextStyle = {
      margin: '25% 0% 5% 0%',
      fontFamily: 'adobestdb',
      textAlign: 'center',
      lineHeight: 1
    }

    let lastSeasonScore = this.state.lastSeasonProfile.stamp;
    let thisSeasonScore = this.state.currentSeasonProfile.stamp;

    let midBtnImg =
    this.state.currentStatus === 'taskToBeAccept'? startMission:
    this.state.currentStatus === 'taskOnGoing'? continueTask:
    this.state.currentStatus === 'lastTaskCompleted'? nextMission:
    this.state.currentStatus === 'allTasksCompleted'? logout:
    logout;

    let profileBar =
    <div style={Object.assign({},subcontainerStyle,leftBarImgStyle,{flex: 5})}>
      <div style={{flex: 5}}>
      </div>
      <div style={Object.assign({},profileImageStyle,{flex: 30})}>
      </div>
      <div style={Object.assign({},nameTextStyle,{flex: 14})}>
        {this.props.profile.ElderName}
      </div>
      <div style={{flex: 6,display: 'flex'}}>
        <LvImage score={thisSeasonScore}
        icon={this.state.currentSeasonProfile.grade.gradeIconPath}/>
      </div>
      <div style={Object.assign({},scoreStatusStyle,{flex: 18})}>
        <div style={Object.assign({},scoreTextStyle,{flex: 2,fontSize: this.props.height * 0.065,color: '#9e9bca'})}>
          {lastSeasonScore}
        </div>
        <div style={Object.assign({},scoreTextStyle,{flex: 3,fontSize: this.props.height * 0.08,color: '#f4b230'})}>
          {thisSeasonScore}
        </div>
      </div>
      <div style={{flex: 18,display: 'flex'}}>
        <div style={Object.assign({},scoreTextStyle,{flex: 1,margin: '12% 3% 0% 0%',fontSize: this.props.height * 0.1,color: 'white'})}>
          {this.state.currentSeasonProfile.completeTask}
        </div>
      </div>
      <div style={{flex: 12}}>
      </div>
    </div>;

    let boxImgStyle = {
      backgroundImage: 'url(' + box + ')',
      backgroundSize: '100% 100%',
      margin: '0.5%'
    }

    let scoreIconStyle = {
      width: this.props.height * 0.3,
      height: this.props.height * 0.3,
      backgroundImage: 'url(' + scoreYellow + ')',
      backgroundSize: '100% 100%'
    }

    let congratMessageStyle = {
      fontFamily: 'adobestdb',
      textAlign: 'center',
      lineHeight: 1.25,
      color: '#424242',
      fontSize: this.props.height * 0.07
    }

    let message = "恭喜你!\n你已獲得一個印花!";

    let confirmBtnStyle = {
      width: this.props.height * 0.2,
      height: this.props.height * 0.2,
      backgroundImage: 'url(' + circleTick + ')',
      backgroundSize: '100% 100%',
      cursor: 'pointer',
      border: 'none',
      backgroundColor: 'transparent'
    }

    let content =
    this.state.currentStatus === 'stampEarned'?
    <div style={Object.assign({},subcontainerStyle,{flex: 18})}>
      <div style={Object.assign({},boxImgStyle,{flex: 1,display:'flex', flexFlow: 'column nowrap'})}>
        <div style={{flex: 3,display:'flex',justifyContent: 'center',alignItems: 'flex-end'}}>
          <div style={scoreIconStyle}/>
        </div>
        <div style={{flex: 2,display:'flex',justifyContent: 'center',alignItems: 'center'}}>
          <div style={congratMessageStyle}>
            {message.split('\n').map((item, key) => {
            return <span key={key}>{item}<br/></span>
            })}
          </div>
        </div>
        <div style={{flex: 2,display:'flex',justifyContent: 'center',alignItems: 'flex-start'}}>
          <button style={confirmBtnStyle} onClick={()=>{this.setState({currentStatus: 'allTasksCompleted'})}}/>
        </div>
      </div>
    </div>:
    <div style={Object.assign({},subcontainerStyle,{flex: 18})}>
      <HomeTask
      currentStatus={this.state.currentStatus}
      assignment={this.props.currentAssignment}
      height={this.props.height}/>
      <div style={{flex: 1,display:'flex', flexFlow: 'row nowrap'}}>
        <button onClick={()=>{this.props.contentFunctions.setPage('howToUpgrade')}} style={Object.assign({},buttonStyle,{flex: 1,backgroundImage: 'url(' + howToLvUp + ')'})} />
        <button onClick={()=>{this.midButtonPressed()}} style={Object.assign({},buttonStyle,{flex: 1,backgroundImage: 'url(' + midBtnImg + ')'})} />
        <button onClick={()=>{this.props.contentFunctions.setPage('scoreRecord')}} style={Object.assign({},buttonStyle,{flex: 1,backgroundImage: 'url(' + scoreRecord + ')'})} />
      </div>
    </div>;

    return(
      <div style={containerStyle}>
        {profileBar}
        {content}
      </div>
    )
  }
}

export default Home;
