import React, { Component } from 'react';
import axios from 'axios';
import background from '../Images/background.jpg';
import background2 from '../Images/background2.jpg';
import background3 from '../Images/background3.jpg';
import everydayMissionCircle from '../Images/everydayMission.png';
import contactNurseCircle from '../Images/hint_contactNurse.png';
import howToEarnScoreCircle from '../Images/hint_score.png';
import hint_missionAccepted from '../Images/hint_missionAccepted.png';

//import restCircle from '../Images/hint_rest.png';
import nfcEntryHint from '../Images/nfcEntryHint.png';

import Home from './Home';
import HowToUpgrade from './HowToUpgrade';
import ScoreRecord from './ScoreRecord';

const minHeight = 500;

class Content extends Component {

  constructor(props) {
    super(props);
    this.state = {
      height: 0,
      onPage: 'entry',
      profile:{},
      assignments: {},
      currentAssignment: {},
      contentFunctions:{
        setPage: this.setPage.bind(this),
        taskAccepted: this.taskAccepted.bind(this)
      }
    };
  }

  async taskAccepted(){
    var playTaskApi = this.props.mainFunctions.getApi() + 'resident/task/playing/' + this.state.currentAssignment.id;
    console.log(playTaskApi);
    var playTask = await axios.get(playTaskApi);
    console.log(playTask.data);
    this.setPage('taskAccepted');
    setTimeout(()=>{this.setPage('entry')},5000);
  }

  setPage(page){
    //console.log('setPage ' + page);
    this.setState({
      onPage: page
    })
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions.bind(this));
  }

  updateWindowDimensions() {
    this.setState({ height: window.innerHeight });
  }

  getHeight(){
    if(this.state.onPage === 'scoreRecord'){
      return window.innerWidth * 1.75;
    }
    return this.state.height > minHeight? this.state.height: minHeight;
  }

  entryButtonPressed(){
    this.setPage('entryNfc');
    setTimeout(()=>{this.switchPageOnSituation('entryNfc','entry')},5000);
  }

  switchPageOnSituation(situation,destination){
    if(this.state.onPage === situation){
      this.setPage(destination);
    }
  }

  async onNfcInputChange(event){
    var nfcId = event.target.value;
    nfcId = nfcId.replace(/\s/g, '');
    if(nfcId.length < 14){
      return;
    }
    console.log(nfcId)
    document.getElementById('nfcInput').value = '';
    //nfcId = '53B5804D00F680';
    const ernestapi = "http://10.0.48.22/EHMS/api/getResBedPrfl/";
    var prfl = await axios.get(ernestapi + nfcId);
    var _profile = prfl.data.ResBedPrfl[0];
    console.log(_profile);

    const resId = _profile.MemID;
    //const resId = 'JCH2018033';
    const profileApi = this.props.mainFunctions.getApi() + 'resident/' + resId;
    //console.log(profileApi)
    var residentProfile = await axios.get(profileApi);
    //console.log(residentProfile.data);
    var typeId = residentProfile.data.residentType.id;
    if(typeId === 0 || typeId === 4){
      this.setPage('pleaseContactNurse');
      setTimeout(()=>{this.switchPageOnSituation('pleaseContactNurse','entry')},5000);
      return;
    }


    const assignmentApi = this.props.mainFunctions.getApi() + 'resident/task/assignment/' + resId;
    let _assignments = await axios.get(assignmentApi);
    if(_assignments.data.error){
      //document.getElementById('nfcInput').value = ''
      return;
    }
    var _currentAssignment = {};
    for(var i=0;i<3;i++){
      if(!_assignments.data[i].played){
        _currentAssignment = _assignments.data[i];
        break;
      }
    }
    this.setState({
      profile: _profile,
      assignments: _assignments.data,
      currentAssignment: _currentAssignment
    });
    console.log(this.state.assignments);
    //console.log(this.state.currentAssignment);

    this.setPage('howToEarnScore');
    setTimeout(()=>{this.switchPageOnSituation('howToEarnScore','home')},5000);
  }

  render() {

    window.oncontextmenu = function(event) {
      event.preventDefault();
      event.stopPropagation();
      return false;
    };

    let backgroundImage =
    this.state.onPage === 'home'? background2:
    this.state.onPage === 'scoreRecord'? background3:
    background;

    let containerStyle = {
      width: '100%',
      height: '' + this.getHeight() + 'px',
      display: 'flex',
      flexFlow: 'column nowrap',
      justifyContent: 'center',
      alignItems: 'center',

      backgroundImage: 'url(' + backgroundImage + ')',
      backgroundSize: 'cover',
      backgroundRepeat: 'repeat-y'
    };

    let subcontent =
    this.state.onPage === 'entry'?
    <button style={{
      height: this.getHeight() * 0.6,
      width: this.getHeight() * 0.6,
      border: 'none',
      backgroundImage: 'url(' + everydayMissionCircle + ')',
      backgroundSize: 'contain',
      backgroundColor: 'transparent',
      cursor: 'pointer'
    }} onClick={this.entryButtonPressed.bind(this)}/>:
    this.state.onPage === 'entryNfc'?
    <input style={{
      height: this.getHeight() * 0.6,
      width: this.getHeight() * 0.75,
      border: 'none',
      backgroundImage: 'url(' + nfcEntryHint + ')',
      backgroundSize: 'contain',
      backgroundColor: 'transparent',
      backgroundRepeat: 'no-repeat',
      cursor: 'pointer',
      color: 'transparent',
      fontColor: 'transparent'
    }}type='text' autoFocus onChange={this.onNfcInputChange.bind(this)} id='nfcInput' spellcheck="false"/>:
    this.state.onPage === 'pleaseContactNurse'?
    <div style={{
      height: this.getHeight() * 0.6,
      width: this.getHeight() * 0.6,
      backgroundImage: 'url(' + contactNurseCircle + ')',
      backgroundSize: 'contain',
      backgroundColor: 'transparent',
      cursor: 'pointer'
    }}/>:
    this.state.onPage === 'taskAccepted'?
    <div style={{
      height: this.getHeight() * 0.6,
      width: this.getHeight() * 0.6,
      backgroundImage: 'url(' + hint_missionAccepted + ')',
      backgroundSize: 'contain',
      backgroundColor: 'transparent',
      cursor: 'pointer'
    }}/>:
    this.state.onPage === 'howToEarnScore'?
    <button style={{
      height: this.getHeight() * 0.6,
      width: this.getHeight() * 0.6,
      border: 'none',
      backgroundImage: 'url(' + howToEarnScoreCircle + ')',
      backgroundSize: 'contain',
      backgroundColor: 'transparent',
      cursor: 'pointer'
    }} onClick={()=>{this.setPage('home')}}/>:
    this.state.onPage === 'home'?
    <Home
    height={this.getHeight()}
    profile={this.state.profile}
    assignments={this.state.assignments}
    currentAssignment={this.state.currentAssignment}
    contentFunctions={this.state.contentFunctions}
    mainFunctions={this.props.mainFunctions}/>:
    this.state.onPage === 'howToUpgrade'?
    <HowToUpgrade
    height={this.getHeight()}
    contentFunctions={this.state.contentFunctions}/>:
    this.state.onPage === 'scoreRecord'?
    <ScoreRecord
    score={50}
    profile={this.state.profile}
    height={this.getHeight()}
    contentFunctions={this.state.contentFunctions}
    mainFunctions={this.props.mainFunctions}/>:
    <div/>;

    return (
      <div style={containerStyle}>
        {subcontent}
      </div>
    );
  }
}

export default Content;
