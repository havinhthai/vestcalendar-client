import { connect } from 'react-redux';

import * as actionTypesAuth from 'redux/auth/actionTypes';

import SignIn from './SignIn';

const mapStateToProps = (state) => ({
  me: state.auth.me,
});

const mapDispatchToProps = (dispatch) => ({
  onLoginByTwitter: () => dispatch({ type: actionTypesAuth.ON_LOGIN_BY_TWITTER }),
  onLoginByGoogle: (payload) => dispatch({ type: actionTypesAuth.ON_LOGIN_BY_GOOGLE, payload }),
  onLoginByTelegram: (payload) => dispatch({ type: actionTypesAuth.ON_LOGIN_BY_TELEGRAM, payload }),
  onLogout: () => dispatch({ type: actionTypesAuth.LOG_OUT }),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
