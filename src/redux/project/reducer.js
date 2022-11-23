import * as actionTypes from './actionTypes';

const defaultState = {
  projects: [],
  watchListProjects: [],
  watchListProjectsLoading: true,
  isLoadingProjects: false,
  isProjectsReady: false,

  project: {},
  isLoadingProject: false,
  isProjectReady: false,
  toggleWatchListLoading: false,
};

// eslint-disable-next-line default-param-last
const authReducer = (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.GET_PROJECTS: {
      return {
        ...state,
        isLoadingProjects: !action.payload.watchList,
        watchListProjectsLoading: action.payload.watchList,
      };
    }

    case actionTypes.GET_PROJECTS_SUCCESS: {
      const updateStates = {
        isProjectsReady: true,
        isLoadingProjects: false,
        watchListProjectsLoading: false,
      };

      if (action.payload.watchList) {
        updateStates.watchListProjects = action.payload.projects;
      } else {
        updateStates.projects = action.payload.projects;
      }

      return {
        ...state,
        ...updateStates,
      };
    }

    case actionTypes.GET_PROJECTS_FAILED: {
      return {
        ...state,
        isLoadingProjects: false,
        watchListProjectsLoading: false,
      };
    }

    case actionTypes.GET_PROJECTS_PRICE_SUCCESS: {
      return {
        ...state,
        projects: action.payload,
      };
    }

    case actionTypes.GET_PROJECT: {
      return {
        ...state,
        isLoadingProject: true,
      };
    }

    case actionTypes.GET_PROJECT_SUCCESS: {
      return {
        ...state,
        project: action.payload,
        isLoadingProject: false,
        isProjectReady: true,
      };
    }

    case actionTypes.GET_PROJECT_FAILED: {
      return {
        ...state,
        isLoadingProject: false,
      };
    }

    case actionTypes.TOGGLE_PROJECT_TO_WATCHLIST: {
      return {
        ...state,
        toggleWatchListLoading: true,
      };
    }

    case actionTypes.TOGGLE_PROJECT_TO_WATCHLIST_SUCCESS: {
      const updateStates = {
        project: {
          ...state.project,
          watchProject: action.payload.watch,
        },
        toggleWatchListLoading: false,
      };

      const watchListProjectIndex = state.watchListProjects.findIndex((x) => (
        x._id === action.payload.id
      ));

      if (action.payload.watch && watchListProjectIndex === -1) {
        updateStates.watchListProjects = [...state.watchListProjects, action.payload.project];
      } else if (!action.payload.watch && action.payload.watch !== -1) {
        updateStates.watchListProjects = [...state.watchListProjects];

        updateStates.watchListProjects.splice(watchListProjectIndex, 1);
      }

      return {
        ...state,
        ...updateStates,
      };
    }

    case actionTypes.TOGGLE_PROJECT_TO_WATCHLIST_FAILED: {
      return {
        ...state,
        toggleWatchListLoading: false,
      };
    }

    case actionTypes.GET_PROJECT_PRICE_SUCCESS: {
      return {
        ...state,
        project: action.payload,
      };
    }

    case actionTypes.CLEAR_PROJECT: {
      return {
        ...state,
        project: {},
      };
    }

    default:
      return state;
  }
};

export default authReducer;

export const getProjects = (state) => state.project.projects;

export const getProject = (state) => state.project.project;
