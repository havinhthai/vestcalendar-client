import { connect } from 'react-redux';

import * as actionTypes from 'redux/project/actionTypes';

import WatchList from './WatchList';

const mapStateToProps = (state) => ({
  me: state.auth.me,
  project: state.project.project,
  watchListProjects: state.project.watchListProjects,
});

const mapDispatchToProps = (dispatch) => ({
  getWatchListProjects: () => dispatch({
    type: actionTypes.GET_PROJECTS,
    payload: { watchList: true },
  }),
  getProjectDetail: (id) => new Promise((resolve) => {
    dispatch({
      type: actionTypes.GET_PROJECT,
      payload: { id, callback: resolve },
    });
  }),
});

export default connect(mapStateToProps, mapDispatchToProps)(WatchList);
