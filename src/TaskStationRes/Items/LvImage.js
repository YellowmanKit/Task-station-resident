import React, { Component } from 'react';

import lv14 from '../Images/lvPurpleDiamond.png';
import lv13 from '../Images/lvBlueDiamond.png';
import lv12 from '../Images/lvRedDiamond.png';
import lv11 from '../Images/lvOrangeDiamond.png';
import lv10 from '../Images/lvWhiteDiamond.png';
import lv9 from '../Images/lvRedJade.png';
import lv8 from '../Images/lvYellowJade.png';
import lv7 from '../Images/lvGreenJade.png';
import lv6 from '../Images/lvPurpleCrystal.png';
import lv5 from '../Images/lvPinkCrystal.png';
import lv4 from '../Images/lvGreenCrystal.png';
import lv3 from '../Images/lvGold.png';
import lv2 from '../Images/lvSilver.png';
import lv1 from '../Images/lvCopper.png';
import lv0 from '../Images/lvIron.png';

class LvImage extends Component {

  getImageByScore(score){
    var img =
    score >= 79? lv14:
    score >= 71? lv13:
    score >= 63? lv12:
    score >= 55? lv11:
    score >= 47? lv10:
    score >= 39? lv9:
    score >= 31? lv8:
    score >= 23? lv7:
    score >= 17? lv6:
    score >= 13? lv5:
    score >= 9? lv4:
    score >= 6? lv3:
    score >= 4? lv2:
    score >= 2? lv1:
    lv0;

    return img;
  }

  render(){

    let imgStyle = {
      flex: 1,
      backgroundImage: 'url(' + this.props.icon + ')',
      backgroundSize: '100% 100%',
      margin: '0% 25% 0% 20%'
    }

    return(
      <div style={imgStyle} />
    )
  }
}

export default LvImage;
