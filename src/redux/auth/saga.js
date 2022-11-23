import { toast } from 'react-toastify';
import { googleLogout } from '@react-oauth/google';
import { put, takeLeading } from 'redux-saga/effects';

import authApi from 'api/auth';

import {
  TOAST_MESSAGE,
  LOGIN_TYPE,
  LOCALSTORATE_KEYS,
} from 'constants';

import axiosClient from 'utils/axios';
import { apiErrorHandler } from 'utils';

import * as actionTypes from './actionTypes';

function* onLoginByGoogle(action) {
  const {
    tokenResponse,
    callback,
  } = action.payload;

  try {
    if (!tokenResponse?.access_token) {
      throw new Error(TOAST_MESSAGE.SOMETHING_WENT_WRONG);
    }

    const { access_token: accessToken } = tokenResponse;

    const { payload } = yield authApi.loginByGoogle(accessToken);

    yield put({
      type: actionTypes.ON_LOGIN_BY_GOOGLE_SUCCESS,
      payload: {
        ...payload.user,
        token: payload.token,
        loginType: LOGIN_TYPE.GOOGLE,
      },
    });

    callback?.();

    localStorage.setItem(LOCALSTORATE_KEYS.AUTHENTICATION_TOKEN, payload.token);
    localStorage.setItem(LOCALSTORATE_KEYS.LOGIN_TYPE, LOGIN_TYPE.GOOGLE);
  } catch (error) {
    apiErrorHandler(error);

    yield put({ type: actionTypes.ON_LOGIN_BY_GOOGLE_FAILED });
  }
}

function* onLoginByTelegram(action) {
  const { userInfo, callback } = action.payload;

  try {
    const { payload } = yield authApi.loginByTelegram(userInfo);

    yield put({
      type: actionTypes.ON_LOGIN_BY_TELEGRAM_SUCCESS,
      payload: {
        ...payload.user,
        token: payload.token,
        loginType: LOGIN_TYPE.TELEGRAM,
      },
    });

    callback?.();

    localStorage.setItem(LOCALSTORATE_KEYS.AUTHENTICATION_TOKEN, payload.token);
    localStorage.setItem(LOCALSTORATE_KEYS.LOGIN_TYPE, LOGIN_TYPE.TELEGRAM);
  } catch (error) {
    apiErrorHandler(error);

    yield put({
      type: actionTypes.ON_LOGIN_BY_TELEGRAM_FAILED,
    });
  }
}

function* onGetMe({ payload }) {
  try {
    const token = payload || localStorage.getItem(LOCALSTORATE_KEYS.AUTHENTICATION_TOKEN);

    const loginType = localStorage.getItem(LOCALSTORATE_KEYS.LOGIN_TYPE);

    if (token) {
      const response = yield authApi.getMe(token);

      yield put({
        type: actionTypes.GET_ME_SUCCESS,
        payload: {
          ...response.payload,
          token,
          loginType,
        },
      });
    } else {
      yield put({ type: actionTypes.LOG_OUT });
    }
  } catch (error) {
    localStorage.removeItem(LOCALSTORATE_KEYS.AUTHENTICATION_TOKEN);

    yield put({ type: actionTypes.GET_ME_FAILED });
    yield put({ type: actionTypes.LOG_OUT });
  }
}

function* onLogout() {
  googleLogout();

  localStorage.removeItem(LOCALSTORATE_KEYS.AUTHENTICATION_TOKEN);
  localStorage.removeItem(LOCALSTORATE_KEYS.LOGIN_TYPE);

  yield put({ type: actionTypes.LOG_OUT_SUCCESS });
}

function* onUpdateMe({ payload }) {
  try {
    const { data } = yield axiosClient.put('/me', payload);

    yield put({ type: actionTypes.UPDATE_ME_SUCCESS, payload: data.payload });

    toast('Update successfully!', { type: 'success' });
  } catch (error) {
    const { message } = apiErrorHandler(error);

    toast(message, { type: 'error' });
  }

  yield put({ type: actionTypes.UPDATE_ME_FAILED });
}

function* onLoginByTwitter({ payload }) {
  try {
    if (payload) {
      const codeVerifier = localStorage.getItem(LOCALSTORATE_KEYS.TWITTER_CODE_VERIFIER);

      const data = yield authApi.loginByTwitter({
        codeVerifier,
        code: payload.code,
      });

      yield put({
        type: actionTypes.ON_LOGIN_BY_TWITTER_SUCCESS,
        payload: {
          ...data.payload.user,
          token: data.payload.token,
          loginType: LOGIN_TYPE.TWITTER,
        },
      });

      localStorage.setItem(LOCALSTORATE_KEYS.AUTHENTICATION_TOKEN, data.payload.token);
      localStorage.setItem(LOCALSTORATE_KEYS.LOGIN_TYPE, LOGIN_TYPE.TWITTER);

      localStorage.removeItem(LOCALSTORATE_KEYS.TWITTER_CODE_VERIFIER);
    } else {
      const authLinkData = yield authApi.twitterRequestAuthLink();

      localStorage.setItem(
        LOCALSTORATE_KEYS.TWITTER_CODE_VERIFIER,
        authLinkData.payload.codeVerifier,
      );

      window.location.href = authLinkData.payload.url;
    }
  } catch (error) {
    const { message } = apiErrorHandler(error);

    toast(message, { type: 'error' });
  }

  yield put({ type: actionTypes.ON_LOGIN_BY_TWITTER_FAILED });
}

export default function* sagas() {
  yield takeLeading(actionTypes.ON_LOGIN_BY_GOOGLE, onLoginByGoogle);
  yield takeLeading(actionTypes.ON_LOGIN_BY_TWITTER, onLoginByTwitter);
  yield takeLeading(actionTypes.ON_LOGIN_BY_TELEGRAM, onLoginByTelegram);
  yield takeLeading(actionTypes.GET_ME, onGetMe);
  yield takeLeading(actionTypes.LOG_OUT, onLogout);
  yield takeLeading(actionTypes.UPDATE_ME, onUpdateMe);
}
