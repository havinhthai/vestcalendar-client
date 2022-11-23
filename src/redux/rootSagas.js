import { all, fork } from 'redux-saga/effects';

import auth from './auth/saga';
import project from './project/saga';

export default function* rootSagas() {
  yield all([
    fork(auth),
    fork(project),
  ]);
}
