import { connect } from 'react-redux';

import { GET_ME, ON_LOGIN_BY_TWITTER } from 'redux/auth/actionTypes';

import App from './App';

const mapDispatchToProps = (dispatch) => ({
  onGetMe: () => dispatch({ type: GET_ME }),
  onLoginByTwitter: (payload) => dispatch({ type: ON_LOGIN_BY_TWITTER, payload }),
});

export default connect(null, mapDispatchToProps)(App);
