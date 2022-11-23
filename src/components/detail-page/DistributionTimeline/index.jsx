/* eslint-disable no-plusplus */
import React, { useMemo, useState } from 'react';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';

import formatNumber from 'utils/formatNumber';
import { getLastEvent, sortListEvent } from 'utils/getRecentEvent';

import { distributionTimeLinePropTypes } from 'pages/detail/types';

import PublicSchedule from '../PublicSchedule';

import './index.scss';

const VIEW = {
  PUBLIC: 'public',
  PRIVATE: 'private',
};

function DistributionTimeline(props) {
  const {
    distributionTimeLine,
    allocations,
  } = props;

  const totalVestingPercent = useMemo(() => {
    const arrayVesting = distributionTimeLine.map((timeline) => {
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
  }, [distributionTimeLine]);

  const sortedListEvent = sortListEvent(distributionTimeLine);

  const eventObject = useMemo(() => {
    const lastEvent = getLastEvent(distributionTimeLine);
    const lastEventIndex = sortedListEvent?.reverse()
      .findIndex((event) => event?._id === lastEvent?._id);
    const isLastEventNotTheLast = lastEvent?._id
      !== distributionTimeLine[distributionTimeLine.length - 1]._id;

    let currentProgress = 0;

    for (let index = 0; index <= lastEventIndex; index++) {
      const element = sortedListEvent[index];
      const totalEndEvent = element?.allocations?.reduce(
        (total, allocation) => {
          if (allocation.ref !== -1 && allocation.percent) {
            return total + (allocation.percent * allocations[allocation.ref].percent) / 100;
          }

          return total;
        },
        0,
      );

      currentProgress += totalEndEvent;
    }

    const nextProgress = sortedListEvent[lastEventIndex + 1]?.allocations?.reduce(
      (total, allocation) => {
        if (allocation.ref !== -1 && allocation.percent) {
          return total + (allocation.percent * allocations[allocation.ref].percent) / 100;
        }

        return total;
      },
      0,
    );

    return {
      lastEventIndex,
      isLastEventNotTheLast,
      currentProgress: currentProgress ? (currentProgress / totalVestingPercent) * 100 : 0,
      nextProgress: nextProgress ? ((nextProgress / totalVestingPercent) * 100) : 0,
    };
  }, [distributionTimeLine, sortedListEvent]);

  const [state, setState] = useState({
    view: VIEW.PUBLIC,
  });

  const handleClickSetView = (view) => () => {
    setState((prevState) => ({
      ...prevState,
      view,
    }));
  };

  const renderSchedulePrivate = (
    <p className="text-center mt-50 mb-50">This section is under construction. It will be aired soon</p>
  );

  return (
    <div className="distribution p-3 background h-100">
      <p className="text-center font-section__title fs-18">
        Distribution Timeline
      </p>

      {/* Heading button */}
      <div className="d-flex flex-wrap">
        <button
          type="button"
          onClick={handleClickSetView(VIEW.PUBLIC)}
          className={[
            'heading-btn p-2 col-12 col-sm-6 text-uppercase reset-button text-start',
            state.view === VIEW.PUBLIC ? 'active' : '',
          ].join(' ')}
        >
          Public Vesting
        </button>

        <button
          type="button"
          onClick={handleClickSetView(VIEW.PRIVATE)}
          className={[
            'heading-btn p-2 col-12 col-sm-6 text-uppercase reset-button text-start d-flex gap-2 align-items-center',
            state.view === VIEW.PRIVATE ? 'active' : '',
          ].join(' ')}
        >
          <span>
            Seed/Private vesting
          </span>

          <span className="heading-btn__soon rounded px-1 font-small">Soon</span>
        </button>
      </div>

      <div className={state.view === VIEW.PUBLIC ? '' : 'd-none'}>
        {/* Progress */}
        <div className="progress-container d-flex justify-content-between align-items-center gap-2 mt-4 px-3 py-1 rounded">
          <div className="text-center">
            <p><i className="fas fa-lock-open" /></p>
            <p>
              {formatNumber.format(eventObject.currentProgress || 0)}
              %
            </p>
          </div>

          <div className="w-100">
            {eventObject.isLastEventNotTheLast && (
              <div className="text-center">
                {dayjs().to(sortedListEvent[sortedListEvent.length - 1].time)}
              </div>
            )}

            <div className="progress w-100 position-relative">
              <div className="progress-sub" style={{ width: `${eventObject.currentProgress}%` }} />

              {!!eventObject.nextProgress && <div className="progress-sub__next" style={{ width: `${eventObject.nextProgress}%` }} />}
            </div>

            {!!eventObject.nextProgress && (
            <div className="text-center">
              next unlock&nbsp;
              {formatNumber.format(eventObject.nextProgress)}
              %
            </div>
            )}
          </div>

          <div className="text-center">
            <p><i className="fas fa-lock" /></p>
            <p>
              {formatNumber.format(100 - (eventObject.currentProgress || 0))}
              %
            </p>
          </div>
        </div>

        {/* upcoming */}
        <div className="upcoming p-3 rounded time mt-3">
          Time of upcoming events may change.
          {' '}
          <a href="##" className="upcoming-link">
            Add the project
            to watchlist
          </a>
          {' '}
          to receive update notifications in Telegram.
        </div>

        {/* Schedule */}
        <PublicSchedule distributionTimeLine={sortListEvent(distributionTimeLine)} />
      </div>

      <div className={state.view === VIEW.PRIVATE ? '' : 'd-none'}>
        {renderSchedulePrivate}
      </div>

      <div className="text-center fs-12 mt-4">
        {process.env.REACT_APP_HOSTING}
      </div>
      <div />
    </div>
  );
}

DistributionTimeline.propTypes = {
  distributionTimeLine: distributionTimeLinePropTypes,
  allocations: PropTypes.instanceOf(Array),
};

DistributionTimeline.defaultProps = {
  distributionTimeLine: [],
  allocations: [],
};

export default DistributionTimeline;
