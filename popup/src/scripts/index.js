import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {Store} from 'react-chrome-redux';

import {style} from './css/App.style'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import App from './components/app/App';


const proxyStore =  new Store({
  portName: 'gift'
});

const unsubscribe = proxyStore.subscribe(() => {
   unsubscribe(); // make sure to only fire once
   render(
    <Provider store={proxyStore}>
      <MuiThemeProvider>
        <div style={style}>
          <App/>
        </div>
      </MuiThemeProvider>
    </Provider>
    , document.getElementById('app'));
});
