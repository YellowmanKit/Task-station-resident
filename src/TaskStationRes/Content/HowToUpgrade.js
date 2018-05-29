import React, { Component } from 'react';

import backButton from '../Images/backBtn.png'
import howToEarnScoreCircle from '../Images/hint_score.png';
import rightArrowCircle from '../Images/rightArrowCircle.png';
import leftArrowCircle from '../Images/leftArrowCircle.png';
import scoreMissionScale1 from '../Images/scoreMissionScale1.png';
import scoreMissionScale2 from '../Images/scoreMissionScale2.png';

class HowToUpgrade extends Component {

  constructor(props){
    super(props);
    this.state = {
      page: 0
    }
  }

  switchPage(step){
    if((this.state.page === 0 && step === -1) || (this.state.page === 2 && step === 1)){
      return;
    }
    this.setState({
      page: this.state.page + step
    })
  }

  render(){

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

    let switchButtonStyle = {
      backgroundSize: '100% 100%',
      height: this.props.height * 0.15,
      width: this.props.height * 0.15,
      position: 'absolute',
      top: this.props.height * 0.45,
      border: 'none',
      cursor: 'pointer',
      backgroundColor: 'transparent'
    }

    let scaleStyle = {
      height: this.props.height * 0.9,
      width: this.props.height * 1.1,
      backgroundSize: 'contain',
      backgroundColor: 'transparent',
      cursor: 'pointer',
      backgroundRepeat: 'no-repeat'
    }

    let hintStyle = {
      height: this.props.height * 0.1,
      width: this.props.height * 1.1,
      fontFamily: 'adobestdb',
      textAlign: 'left',
      lineHeight: 1.25,
      fontSize: this.props.height * 0.04,
      color: 'white',
      fontWeight: 'bold'
    }

    let hint =
    <div style={hintStyle}>
    *每三個月重新計算一次
    </div>

    let content =
    this.state.page === 0?
    <div style={{
      height: this.props.height * 0.6,
      width: this.props.height * 0.6,
      backgroundImage: 'url(' + howToEarnScoreCircle + ')',
      backgroundSize: 'contain',
      backgroundColor: 'transparent',
      cursor: 'pointer'
    }}/>:
    this.state.page === 1?
    <div style={Object.assign({},scaleStyle,{backgroundImage: 'url(' + scoreMissionScale1 + ')'})}/>:
    this.state.page === 2?
    <div style={Object.assign({},scaleStyle,{backgroundImage: 'url(' + scoreMissionScale2 + ')'})}/>:
    <div/>;

    return(
      <div style={containerStyle}>
        <button onClick={()=>{this.props.contentFunctions.setPage('home')}} style={backButtonStyle} />
        {this.state.page !== 0 &&
          <button
          onClick={()=>{this.switchPage(-1)}}
          style={Object.assign({},switchButtonStyle,{left: this.props.height * 0.05,backgroundImage: 'url(' + leftArrowCircle + ')'})} />}
        {content}
        {this.state.page !== 0 && hint}
        {this.state.page !== 2 &&
          <button
          onClick={()=>{this.switchPage(1)}}
          style={Object.assign({},switchButtonStyle,{right: this.props.height * 0.05,backgroundImage: 'url(' + rightArrowCircle + ')'})} />
        }

      </div>
    )
  }
}

export default HowToUpgrade;
