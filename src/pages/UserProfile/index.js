import { connect } from 'react-redux';

import * as actionTypesAuth from 'redux/auth/actionTypes';

import UserProfile from './UserProfile';

const mapStateToProps = (state) => ({
  me: state.auth.me,
});

const mapDispatchToProps = (dispatch) => ({
  onLogout: () => dispatch({ type: actionTypesAuth.LOG_OUT }),
  updateNotificationSetting: (payload) => dispatch({
    type: actionTypesAuth.UPDATE_ME,
    payload,
  }),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
