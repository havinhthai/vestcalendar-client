import { combineReducers } from 'redux';

import auth from './auth/reducer';
import project from './project/reducer';

const rootReducer = combineReducers({
  auth,
  project,
});

export default rootReducer;
