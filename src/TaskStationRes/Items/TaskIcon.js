import React, { Component } from 'react';

import icon1 from '../Images/peopleIcon2.png';
import icon2 from '../Images/slideShow.png';
import icon3 from '../Images/goldenFish.png';
import icon4 from '../Images/photo.png';
import icon5 from '../Images/personRaisingHand.png';
import icon6 from '../Images/nurse.png';
import icon7 from '../Images/nurse.png';
import icon8 from '../Images/tShirt.png';
import icon9 from '../Images/coins.png';
import icon10 from '../Images/closet.png';
import icon11 from '../Images/weather.png';
import icon12 from '../Images/personExesicing.png';
import icon13 from '../Images/music.png';
import icon14 from '../Images/alert.png';
import icon15 from '../Images/pinnedNote.png';
import icon16 from '../Images/scorePurple.png';
import icon17 from '../Images/shapes.png';
import icon18 from '../Images/peopleTalking.png';
import icon19 from '../Images/dimsum.png';
import icon20 from '../Images/fruit.png';
import icon21 from '../Images/peopleIcon1.png';
import icon22 from '../Images/gameController.png';
import icon23 from '../Images/heartFace.png';
import icon24 from '../Images/personUsingSkype.png';
import icon25 from '../Images/peopleTalkAboutWeather.png';
import icon26 from '../Images/personTakingSelfie.png';
import icon27 from '../Images/peopleIcon3.png';
import icon28 from '../Images/peopleIcon4.png';
import icon29 from '../Images/peopleTalking2.png';
import icon30 from '../Images/peoplePlayingSolitaire.png';
import icon31 from '../Images/peopleTalking2.png';

import arrowAndTarget from '../Images/arrowAndTarget.png';


class TaskIcon extends Component {

  getImageByCode(code){

    if(this.props.currentStatus === 'lastTaskCompleted'){
      return arrowAndTarget;
    }

    var img =
    code === 0? icon1:
    code === 1? icon2:
    code === 2? icon3:
    code === 3? icon4:
    code === 4? icon5:
    code === 5? icon6:
    code === 6? icon7:
    code === 7? icon8:
    code === 8? icon9:
    code === 9? icon10:
    code === 10? icon11:
    code === 11? icon12:
    code === 12? icon13:
    code === 13? icon14:
    code === 14? icon15:
    code === 15? icon16:
    code === 16? icon17:
    code === 17? icon18:
    code === 18? icon19:
    code === 19? icon20:
    code === 20? icon21:
    code === 21? icon22:
    code === 22? icon23:
    code === 23? icon24:
    code === 24? icon25:
    code === 25? icon26:
    code === 26? icon27:
    code === 27? icon28:
    code === 28? icon29:
    code === 29? icon30:
    code === 30? icon31:
    icon31;

    return img;
  }

  render(){

    var icon =
    this.props.currentStatus === 'lastTaskCompleted'? arrowAndTarget:
    this.props.currentStatus === 'allTasksCompleted'? arrowAndTarget:
    this.props.icon;

    let imgStyle = {
      height: this.props.height * 0.3,
      width: this.props.height * 0.35,
      backgroundImage: 'url(' + icon + ')',
      backgroundSize: '100% 100%'
    }

    return(
      <div style={imgStyle} />
    )
  }
}

export default TaskIcon;
