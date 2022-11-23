import { connect } from 'react-redux';

import * as actionTypes from 'redux/project/actionTypes';

import HomeOne from './HomeOne';

const mapStateToProps = (state) => ({
  projects: state.project.projects,
  isLoadingProjects: state.project.isLoadingProjects,
  isProjectsReady: state.project.isProjectsReady,
});

const mapDispatchToProps = (dispatch) => ({
  onGetProjects: (payload) => dispatch({ type: actionTypes.GET_PROJECTS, payload }),
  onGetProjectsPrice: () => dispatch({ type: actionTypes.GET_PROJECTS_PRICE }),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeOne);
