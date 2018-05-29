import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import { injectGlobal } from 'styled-components';
import adobestdb from './TaskStationRes/fonts/adobestdb.otf';
injectGlobal`
  @font-face {
    font-family: 'adobestdb';
    src: url(${adobestdb}) format('truetype');
    font-weight: normal;
    font-style: normal;
  }
`;

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
