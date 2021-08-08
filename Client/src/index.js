import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux'
import Store from './store/Store'
import Routes from './routes/Routes'


ReactDOM.render(
  <Provider store={Store}>
    <Routes />
  </Provider>,
  document.getElementById('root')
);

