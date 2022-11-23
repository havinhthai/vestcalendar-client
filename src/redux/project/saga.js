import { put, takeLeading, select } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import projectApi from 'api/project';
import { apiErrorHandler } from 'utils';
import {
  getLastEvent,
  getNextEvent,
  getNextEventHasAllocations,
  sortListEvent,
} from 'utils/getRecentEvent';
import * as actionTypes from './actionTypes';
import { getProject, getProjects } from './reducer';

const totalVestingPercent = (distributionTimeline, allocations) => {
  const arrayVesting = distributionTimeline.map((timeline) => {
    const mapAllocation = timeline.allocations.reduce((list, item) => {
      if (item.ref !== -1) {
        return [...list, item.ref];
      }

      return list;
    }, []);

    return mapAllocation.join(',');
  }).join(',').split(',');

  return [...new Set(arrayVesting)]
    .reduce((total, item) => {
      if (item && allocations[item]) {
        return total + allocations[item].percent;
      }

      return total;
    }, 0) || 0;
};

function* onGetProjects({ payload }) {
  const { params, callback, watchList } = payload;

  try {
    let response;

    if (watchList) {
      response = yield projectApi.getWatchListProjects(params);
    } else {
      response = yield projectApi.getProjects(params);
    }

    const projects = response.payload.data.map((project) => {
      const data = { ...project };
      const { distributionTimeline, allocations } = data;
      const sortedEvents = sortListEvent(distributionTimeline);
      const lastEvent = getLastEvent(sortedEvents);
      const nextEvent = getNextEvent(sortedEvents);
      const nextEventHasAllocations = getNextEventHasAllocations(sortedEvents);
      const lastEventIndex = sortedEvents.findIndex((event) => event._id === lastEvent?._id);
      const totalProgress = totalVestingPercent(distributionTimeline, allocations);
      let currentProgress = 0;

      for (let index = 0; index <= lastEventIndex; index += 1) {
        const element = sortedEvents[index];
        const totalEndEvent = element?.allocations?.reduce(
          (total, allocation) => {
            if (allocation?.ref !== -1 && allocation?.percent) {
              return total + (allocation.percent * allocations[allocation.ref].percent) / 100;
            }

            return total;
          },
          0,
        );

        currentProgress += totalEndEvent;
      }

      const nextProgress = nextEventHasAllocations?.allocations?.reduce(
        (total, allocation) => {
          if (allocation.ref !== -1 && allocation.percent) {
            return total + (allocation.percent * allocations[allocation.ref].percent) / 100;
          }

          return total;
        },
        0,
      );

      // const publicedEvent = data.distributionTimeline.slice(0, lastEventIndex + 1);
      // const publicedToken =

      return {
        ...project,
        // formatted: {
        lastEvent,
        nextEvent,
        nextEventHasAllocations,
        lastEventIndex,
        currentProgress: currentProgress ? (currentProgress / totalProgress) * 100 : 0,
        nextProgress: nextProgress ? ((nextProgress / totalProgress) * 100) : 0,
        // },
      };
    }).sort((a, b) => {
      switch (true) {
        case !a.nextEvent: {
          return 1;
        }

        case !b.nextEvent: {
          return -1;
        }

        case !a.nextEvent && !b.nextEvent: {
          return -1;
        }

        case Number(new Date(a.nextEvent.time)) - Number(new Date(b.nextEvent.time)) > 0: {
          return 1;
        }

        default: {
          return -1;
        }
      }
    });

    yield put({
      type: actionTypes.GET_PROJECTS_SUCCESS,
      payload: { projects, watchList },
    });
  } catch (error) {
    apiErrorHandler(error);

    yield put({
      type: actionTypes.GET_PROJECTS_FAILED,
    });
  }
  callback?.();
}

function* onGetProjectsPrice() {
  try {
    const projects = yield select(getProjects);
    const listCoinId = projects.filter((project) => !!project.coingeckoId).map((project) => project.coingeckoId).join(',');
    const projectsPrice = yield projectApi.getProjectsPrice(listCoinId);
    const finalData = projects.map((project) => ({
      ...project,
      price: projectsPrice[project.coingeckoId?.toLowerCase()],
    }));

    yield put({
      type: actionTypes.GET_PROJECTS_PRICE_SUCCESS,
      payload: finalData,
    });
  } catch (error) {
    apiErrorHandler(error);

    yield put({ type: actionTypes.GET_PROJECTS_PRICE_FAILED });
  }
}

function* onGetProject({ payload }) {
  let result = null;

  const { id, callback } = payload;

  try {
    const project = yield projectApi.getProject(id);

    yield put({
      type: actionTypes.GET_PROJECT_SUCCESS,
      payload: project.payload,
    });

    result = project.payload;
  } catch (error) {
    apiErrorHandler(error);

    yield put({
      type: actionTypes.GET_PROJECT_FAILED,
    });
  }

  callback?.(result);
}

function* onGetProjectPrice() {
  try {
    const project = yield select(getProject);
    const projectPrice = yield projectApi.getProjectsPrice(project.coingeckoId);

    yield put({
      type: actionTypes.GET_PROJECT_PRICE_SUCCESS,
      payload: {
        ...project,
        price: projectPrice[project.coingeckoId?.toLowerCase()],
      },
    });
  } catch (error) {
    apiErrorHandler(error);

    yield put({ type: actionTypes.GET_PROJECT_PRICE_FAILED });
  }
}

function* onToggleProjectToWatchList({ payload }) {
  try {
    let data;

    let message = '';
    let toastType = '';

    if (payload.watch) {
      toastType = 'success';

      message = 'Project was added to watch list.';

      data = yield projectApi.addProjectToWatchList(payload);
    } else {
      toastType = 'success';

      message = 'Project was removed from watch list.';

      data = yield projectApi.removeProjectFromWatchList(payload);
    }

    toast(message, { type: toastType });

    yield put({
      type: actionTypes.TOGGLE_PROJECT_TO_WATCHLIST_SUCCESS,
      payload: {
        ...payload,
        project: data.payload,
      },
    });
  } catch (error) {
    apiErrorHandler(error);

    yield put({ type: actionTypes.TOGGLE_PROJECT_TO_WATCHLIST_FAILED });
  }
}

export default function* sagas() {
  yield takeLeading(actionTypes.GET_PROJECTS, onGetProjects);
  yield takeLeading(actionTypes.GET_PROJECTS_PRICE, onGetProjectsPrice);
  yield takeLeading(actionTypes.GET_PROJECT, onGetProject);
  yield takeLeading(actionTypes.GET_PROJECT_PRICE, onGetProjectPrice);
  yield takeLeading(actionTypes.TOGGLE_PROJECT_TO_WATCHLIST, onToggleProjectToWatchList);
}
