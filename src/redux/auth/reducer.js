import * as actionTypes from './actionTypes';
import { meDefaultProps } from './types';

const defaultState = {
  me: {
    ...meDefaultProps,
  },
  isLoading: false,
};

// eslint-disable-next-line default-param-last
const authReducer = (state = defaultState, action) => {
  switch (action.type) {
    // Login
    case actionTypes.ON_LOGIN_BY_TELEGRAM:
    case actionTypes.ON_LOGIN_BY_GOOGLE: {
      return {
        ...state,
        isLoading: true,
      };
    }

    case actionTypes.GET_ME_SUCCESS:
    case actionTypes.ON_LOGIN_BY_TELEGRAM_SUCCESS:
    case actionTypes.ON_LOGIN_BY_TWITTER_SUCCESS:
    case actionTypes.ON_LOGIN_BY_GOOGLE_SUCCESS: {
      return {
        me: action.payload,
        isLoading: false,
      };
    }

    case actionTypes.ON_LOGIN_BY_TELEGRAM_FAILED:
    case actionTypes.ON_LOGIN_BY_GOOGLE_FAILED: {
      return {
        ...state,
        isLoading: false,
      };
    }

    case actionTypes.UPDATE_ME_SUCCESS:
      return {
        ...state,
        me: {
          ...state.me,
          ...action.payload,
        },
      };

    // Log out
    case actionTypes.LOG_OUT: {
      return {
        ...state,
        me: {
          ...meDefaultProps,
        },
      };
    }

    default: {
      return state;
    }
  }
};

export default authReducer;
