import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import dayjs from 'dayjs';

import { Button } from 'react-bootstrap';

import { convertTZ } from 'utils';

import { distributionTimeLinePropTypes } from 'pages/detail/types';

import CountDown from '../CountDown';

import './index.scss';

const ITEM = 10;
const ITEM_IN_VIEW = 5;
const ITEM_PAST_SHOW = 1;
const ITEM_FUTURE_SHOW = ITEM_IN_VIEW - ITEM_PAST_SHOW;

function PublicSchedule({
  distributionTimeLine,
}) {
  const [state, setState] = useState({
    isPastActive: false,
    isFutureActive: false,
  });

  const scheduleRef = useRef(null);

  const itemOutOfDateLength = useMemo(() => distributionTimeLine.filter((item) => {
    const itemDay = convertTZ(item.time, item.timezone);
    const toDay = convertTZ(new Date(), item.timezone);
    const timeNow = Number(toDay);
    const dateToMint = Number(itemDay);
    const isOutOfDate = dateToMint <= timeNow;

    return isOutOfDate;
  }).length, [distributionTimeLine]);

  const BUTTON_DATA = useMemo(() => ({
    PAST: {
      title: 'Show past events',
      onClick: () => setState((prev) => ({ ...prev, isPastActive: true })),
    },
    FUTURE: {
      title: 'Show future events',
      onClick: () => setState((prev) => ({ ...prev, isFutureActive: true })),
    },
  }), []);

  const renderSchedule = useMemo(() => distributionTimeLine.map((item, index) => {
    const itemDay = convertTZ(item.time, item.timezone);
    const toDay = convertTZ(new Date(), item.timezone);
    const timeNow = Number(toDay);
    const dateToMint = Number(itemDay);
    const isOutOfDate = dateToMint <= timeNow;

    return (
      <div
        className={[
          'schedule-item d-flex flex-column flex-md-row',
          isOutOfDate ? 'past' : 'future',
          isOutOfDate// Past
            && index < itemOutOfDateLength - ITEM_PAST_SHOW
            && distributionTimeLine.length > ITEM ? 'hidden' : '',
          !isOutOfDate // Future
            && index >= itemOutOfDateLength + ITEM_FUTURE_SHOW
            && distributionTimeLine.length > ITEM ? 'hidden' : '',
        ].join(' ')}
        // key={item.id}
        key={`${new Date().toLocaleString() + index}`}
      >
        <div className="timeline position-relative">
          <p className="timeline-time position-relative mb-2 fs-14">
            {/* {formatDateToString(itemDay)} */}
            {dayjs(item.time).format('MMMM DD, YYYY [at] HH:mm')}
          </p>

          <div className="timeline-countdown">
            <CountDown
              date={itemDay}
              timezone={item.timezone}
              isOutOfDate={isOutOfDate}
              isDisplayTime={item.isDisplayTime}
            />
          </div>
        </div>

        <div className="timeline-desc fs-12">
          <p className="timeline-desc__title">
            {item.title}
          </p>

          <p className="timeline-desc__desc">
            {item?.description}
          </p>
        </div>
      </div>
    );
  }), []);

  const renderButton = useCallback((button) => (
    (
      <div className="schedule-item d-flex flex-column flex-md-row">
        <div className="timeline position-relative" />

        <div className="timeline-desc fs-12 mb-4">
          <Button
            size="sm"
            variant="outline-secondary"
            onClick={button.onClick}
          >
            {button.title}
          </Button>
        </div>
      </div>
    )
  ), []);

  useEffect(() => {
    if (scheduleRef.current) {
      const childs = [...scheduleRef.current.childNodes];

      const pastHiddenLength = childs.filter((child) => child.classList.contains('past') && child.classList.contains('hidden')).length;
      const futureHiddenLength = childs.filter((child) => child.classList.contains('future') && child.classList.contains('hidden')).length;

      if (!pastHiddenLength) {
        setState((prev) => ({ ...prev, isPastActive: true }));
      }

      if (!futureHiddenLength) {
        setState((prev) => ({ ...prev, isFutureActive: true }));
      }
    }
  }, []);

  return (
    <div
      className={[
        'schedule mt-37',
        state.isPastActive ? 'past-active' : '',
        state.isFutureActive ? 'future-active' : '',
      ].join(' ')}
      ref={scheduleRef}
    >
      {!state.isPastActive && renderButton(BUTTON_DATA.PAST)}

      {renderSchedule}

      {!state.isFutureActive && renderButton(BUTTON_DATA.FUTURE)}
    </div>
  );
}

PublicSchedule.propTypes = {
  distributionTimeLine: distributionTimeLinePropTypes,
};

PublicSchedule.defaultProps = {
  distributionTimeLine: [],
};

export default PublicSchedule;
