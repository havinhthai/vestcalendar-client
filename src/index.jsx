import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';

import App from 'App';
import ScrollToTop from 'ScrollToTop';

import rootSagas from 'redux/rootSagas';
import store, { sagaMiddleware } from 'redux/store';

import 'react-toastify/dist/ReactToastify.css';
import './Custom.scss';
import './App.scss';

const root = ReactDOM.createRoot(document.getElementById('root'));

sagaMiddleware(rootSagas);

root.render(
  <BrowserRouter>
    <Provider store={store}>
      <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOLE_CLIENT_ID}>
        <ScrollToTop />
        <App />
      </GoogleOAuthProvider>
    </Provider>
  </BrowserRouter>,
);
