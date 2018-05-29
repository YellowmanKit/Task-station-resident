import React, { Component } from 'react';
import axios from 'axios';

import backButton from '../Images/backBtn.png';
import scoreIcon from '../Images/scoreIcon.png';
import scoreBlue from '../Images/scoreBlue.png';
import scoreOrange from '../Images/scoreOrange.png';
import scorePink from '../Images/scorePink.png';
import scorePurple from '../Images/scorePurple.png';
import scoreSky from '../Images/scoreSky.png';
import scoreYellow from '../Images/scoreYellow.png';

class ScoreRecord extends Component {

  constructor(props){
    super(props);
    this.state = {
      currentSeasonProfile:{},
      loaded: false
    }
    //console.log(props.profile)
  }

  componentDidMount(){
    this.fetchPreformance();
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

    for(var i=0;i<_seasonProfiles.length;i++){
      const quarterFrom = new Date(_seasonProfiles[i].quarterFrom);
      const quarterTo = new Date(_seasonProfiles[i].quarterTo);

      if(now > quarterFrom && now < quarterTo){
        _currentSeasonProfile = _seasonProfiles[i];
      }
    }

    this.setState({
      currentSeasonProfile: _currentSeasonProfile,
      loaded: true
    });

    console.log(this.state)
  }

  renderScorePrint(){
    const icons = [scoreBlue,scoreOrange,scorePink,scorePurple,scoreSky,scoreYellow];
    const seq = '23165432135316513124153612313542313653241561453216541312315645133215231354652313542653435516';
    //console.log(seq.length);
    const seqArray = Array.from(seq)
    return seqArray.map((char,i) =>{
      let printContainerStyle = {
        height: window.innerWidth * 0.116,
        width: window.innerWidth * 0.116,
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex'
      }
      let printIconStyle = {
        width: '85%',
        height: '85%',
        backgroundImage:
        this.state.currentSeasonProfile.stamp > i?
        'url(' + icons[char - 1] + ')':  'url(' + scoreIcon + ')',
        backgroundSize: '100% 100%',
        backgroundColor: 'transparent'
      }
      return(
        <div key={i} style={printContainerStyle}>
          <div key={i} style={printIconStyle}/>
        </div>
      )
    });
  }

  render(){

    if(!this.state.loaded){
      return(
        <div/>
      )
    }

    let containerStyle = {
      flex: 1,
      width: '100%',
      display: 'flex',
      flexFlow: 'column nowrap',
      justifyContent: 'center',
      alignItems: 'center'
    }

    let backButtonStyle = {
      backgroundImage: 'url(' + backButton + ')',
      backgroundSize: '100% 100%',
      height: window.innerWidth * 0.08,
      width: window.innerWidth * 0.14,
      position: 'absolute',
      top: window.innerWidth * 0.02,
      left: window.innerWidth * 0.02,
      border: 'none',
      cursor: 'pointer',
      backgroundColor: 'transparent'
    }

    let textStyle = {
      fontFamily: 'adobestdb',
      fontWeight: 'bold',
      textAlign: 'center',
      lineHeight: 1,
      color: '#424242'
    }

    let titleContainerStyle = {
      height: window.innerWidth * 0.1,
      width: window.innerWidth * 0.25,
      position: 'absolute',
      top: window.innerWidth * 0.05,
      left: window.innerWidth * 0.4
    }

    let scoreContainerStyle = {
      height: window.innerWidth * 0.125,
      width: window.innerWidth * 0.1,
      position: 'absolute',
      top: window.innerWidth * 0.05,
      right: window.innerWidth * 0.05,
      display: 'flex',
      flexFlow: 'column nowrap'
    }

    let scorePrintContainerStyle = {
      flex: 1,
      width: '95%',
      height: '' + (window.innerWidth * 0.85) + 'px',
      margin: '20% 0% 0% 0%',
      display: 'flex',
      flexFlow: 'row wrap'
    }

    return(
      <div style={containerStyle}>
        <button onClick={()=>{this.props.contentFunctions.setPage('home')}} style={backButtonStyle} />
        <div style={Object.assign({},titleContainerStyle,textStyle,{fontSize: window.innerWidth * 0.035})}>
          印花簿
        </div>
        <div style={scoreContainerStyle}>
          <div style={Object.assign({},textStyle,{flex: 3,fontSize: window.innerWidth * 0.06})}>
            {this.state.currentSeasonProfile && this.state.currentSeasonProfile.stamp}
          </div>
          <div style={Object.assign({},textStyle,{flex: 2,fontSize: window.innerWidth * 0.03})}>
            印花
          </div>
        </div>
        <div style={scorePrintContainerStyle}>
          {this.renderScorePrint()}
        </div>
      </div>
    )
  }

}

export default ScoreRecord;
