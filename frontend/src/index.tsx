import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Store, { history } from './store';
import App from './App';
import { BrowserRouter } from 'react-router'
import { ConnectedRouter } from 'connected-react-router'

import './assets/css/normalize.css';

ReactDOM.render(
  <Provider store={Store}>
    <ConnectedRouter history={history}>
        <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('app'),
);
