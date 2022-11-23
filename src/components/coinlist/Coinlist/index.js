import { connect } from 'react-redux';

import * as actionTypes from 'redux/project/actionTypes';

import Coinlist from './Coinlist';

const mapStateToProps = (state) => ({
  project: state.project.project,
});

const mapDispatchToProps = (dispatch) => ({
  onGetProject: (id) => dispatch({
    type: actionTypes.GET_PROJECT,
    payload: id,
  }),
  onGetProjectPrice: () => dispatch({ type: actionTypes.GET_PROJECT_PRICE }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Coinlist);
