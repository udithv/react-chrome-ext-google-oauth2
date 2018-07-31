import {applyMiddleware, createStore} from 'redux';
import rootReducer from './reducers';

import {alias, wrapStore} from 'react-chrome-redux';


const aliases = {
  'openLoginPage': () => {
    chrome.tabs.create({ url: 'https://www.google.com' });
  }
};


const store = createStore(
  rootReducer, 
  applyMiddleware(
      alias(aliases)
   )
);


wrapStore(store, {
  portName: '[uniqueportname]'
});