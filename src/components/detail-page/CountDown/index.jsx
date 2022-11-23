import React, {
  useEffect, useMemo, useState, memo,
} from 'react';
import PropTypes from 'prop-types';

import { convertTZ } from 'utils';

import styles from './CountDown.module.scss';

function CountDown({
  date,
  isOutOfDate,
  timezone,
  isDisplayTime,
}) {
  const dateToMint = useMemo(() => date, [date]);
  const oneSecond = useMemo(() => 1000, []);
  const oneMinute = useMemo(() => 60 * 1000, [oneSecond]);
  const oneHour = useMemo(() => oneMinute * 60, [oneMinute]);
  const oneDay = useMemo(() => oneMinute * 60 * 24, [oneHour]);

  const [time, setTime] = useState(null);
  const [timeItem, setTimeItem] = useState(null);

  useEffect(() => {
    if (date) {
      const countdownWatcher = setInterval(async () => {
        const timeNow = Number(convertTZ(new Date(), timezone));
        const secondTotalLeft = timeNow <= dateToMint ? dateToMint - timeNow : timeNow - dateToMint;

        const newDayLeft = Math.floor(secondTotalLeft / (oneDay));
        const newMonthLeft = Math.floor(newDayLeft / 30);
        const newHoursLeft = Math.floor(
          secondTotalLeft / (oneHour) - (newDayLeft * 24),
        );
        const newMinutesLeft = Math.floor(
          (secondTotalLeft - (newHoursLeft + (newDayLeft * 24)) * oneHour) / oneMinute,
        );
        const newSecondsLeft = Math.floor((secondTotalLeft % oneMinute) / oneSecond);

        const dayLeftLabel = Math.floor(newDayLeft - (newMonthLeft * 30));

        if (timeNow <= dateToMint) {
          setTimeItem({
            months: newMonthLeft,
            days: dayLeftLabel,
            hours: newHoursLeft,
            second: newSecondsLeft,
            minutes: newMinutesLeft,
          });
        } else if (newMonthLeft <= 0) {
          if (dayLeftLabel <= 0) {
            if (newHoursLeft <= 0) {
              if (newMinutesLeft <= 0) {
                setTime('a few second ago');
              } else {
                setTime(`${newMinutesLeft} minutes ago`);
              }
            } else {
              setTime(`${newHoursLeft} hours ago`);
            }
          } else {
            setTime(`${dayLeftLabel} days ago`);
          }
        } else {
          setTime(`${newMonthLeft} months ago`);
        }

        return () => {
          clearInterval(countdownWatcher);
        };
      }, 1000);

      return () => {
        clearInterval(countdownWatcher);
      };
    }

    return () => {
      clearImmediate();
    };
  }, []);

  if ((!time && isOutOfDate) || (!timeItem && !isOutOfDate)) {
    return (
      <div className="pb-3" />
    );
  }

  return (
    <div>
      {isOutOfDate ? (
        <strong>
          {time}
        </strong>
      ) : (
        <div className="d-flex justify-content-start justify-content-md-end gap-2">
          <span
            className={[
              'text-center',
              styles.time,
              timeItem.months ? '' : 'd-none',
            ].join(' ')}
            title="months"
          >
            {timeItem.months}
          </span>

          <span
            className={[
              'text-center',
              styles.time,
            ].join(' ')}
            title="days"
          >
            {timeItem.days}
          </span>

          {isDisplayTime ? (
            <>
              <span
                className={[
                  'text-center',
                  styles.time,
                ].join(' ')}
                title="hours"
              >
                {timeItem.hours}
              </span>

              <span
                className={[
                  'text-center',
                  styles.time,
                ].join(' ')}
                title="minutes"
              >
                {timeItem.minutes}
              </span>

              <span
                className={[
                  'text-center',
                  styles.time,
                ].join(' ')}
                title="secs"
              >
                {timeItem.second}
              </span>
            </>
          ) : (
            <>
              <span
                className={[
                  'text-center',
                  styles.time,
                ].join(' ')}
                title="hours"
              >
                --
              </span>

              <span
                className={[
                  'text-center',
                  styles.time,
                ].join(' ')}
                title="minutes"
              >
                --
              </span>

              <span
                className={[
                  'text-center',
                  styles.time,
                ].join(' ')}
                title="secs"
              >
                --
              </span>
            </>
          )}
        </div>
      )}
    </div>
  );
}

CountDown.propTypes = {
  date: PropTypes.instanceOf(Date).isRequired,
  isOutOfDate: PropTypes.bool.isRequired,
  timezone: PropTypes.string.isRequired,
  isDisplayTime: PropTypes.bool,
};

CountDown.defaultProps = {
  isDisplayTime: false,
};

export default memo(CountDown);
