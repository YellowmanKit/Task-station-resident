import React, { Component } from 'react';
import Sound from 'react-sound';
//import axios from 'axios';

class HintAudio extends Component {

  constructor(props){
    super(props);
    this.state={
      playing:false,
      soundProps:{
        url:'',
        status:Sound.status.STOPPED
      }
    }
  }

  componentWillReceiveProps(newProps){
    if(newProps.audio === '' && newProps.audioUrl === ''){
      return;
    }
    var _url='';
    if(newProps.audioUrl !== ''){
      _url=newProps.audioUrl;
    }else{
      //console.log('playing ' + newProps.audio);
      _url=process.env.REACT_APP_API;

      switch (newProps.audio) {
        case 'entryNfc':
          _url+=process.env.REACT_APP_SOUND_1;
          break;
        case 'lastTaskCompleted':
          _url+=process.env.REACT_APP_SOUND_2;
          break;
        case 'stampEarned':
          _url+=process.env.REACT_APP_SOUND_3;
          break;
        case 'howToEarnScore':
          _url+=process.env.REACT_APP_SOUND_4;
          break;
        default:
          _url='';
        break;
      }

    }

    //console.log(_url)
    if(_url !== ''){
      this.setState({
        playing:true,
        soundProps:{
          url: _url,
          status: Sound.status.PLAYING
        }
      });
    }
  }

  onFinished(){
    //console.log("onFinished");
    if(this.state.playing){
      this.setState({
        playing:false,
        soundProps:{
          audio: '',
          url: '',
          status: Sound.status.STOPPED
        }
      })
      this.props.contentFunctions.audioFinished();
    }
  }

  render(){
    return (
      <Sound
      url={this.state.soundProps.url}
      playStatus={this.state.soundProps.status}
      onFinishedPlaying={()=>{this.onFinished()}}
      volume={100}/>
    )
  }

}

export default HintAudio;
