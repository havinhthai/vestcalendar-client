import { connect } from 'react-redux';

import * as actionTypes from 'redux/project/actionTypes';

import Detail from './Detail';

const mapStateToProps = (state) => ({
  project: state.project.project,
});

const mapDispatchToProps = (dispatch) => ({
  onGetProject: (payload) => dispatch({
    type: actionTypes.GET_PROJECT,
    payload,
  }),
  onGetProjectPrice: () => dispatch({ type: actionTypes.GET_PROJECT_PRICE }),
  onClearProject: () => dispatch({ type: actionTypes.CLEAR_PROJECT }),
  toggleProjectToWatchList: (id, watch) => dispatch({
    type: actionTypes.TOGGLE_PROJECT_TO_WATCHLIST,
    payload: { id, watch },
  }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Detail);
