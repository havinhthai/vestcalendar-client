/* eslint-disable no-plusplus */
import React, { memo, useMemo } from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import formatNumber from 'utils/formatNumber';
import {
  getLastEvent,
  getNextEvent,
  sortListEvent,
} from 'utils/getRecentEvent';

import styles from './VestingCoinRow.module.scss';

dayjs.extend(relativeTime);

function VestingCoinRow(props) {
  const { data, handleDataCoinClick } = props;

  const { distributionTimeline, allocations } = data;

  const sortedListEvent = sortListEvent(distributionTimeline);
  const nextEvent = getNextEvent(distributionTimeline);

  const totalVestingPercent = useMemo(() => {
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
        if (item && data.allocations[item]) {
          return total + data.allocations[item].percent;
        }

        return total;
      }, 0) || 0;
  }, [data]);

  const eventObject = useMemo(() => {
    const lastEvent = getLastEvent(distributionTimeline);
    const lastEventIndex = sortedListEvent?.reverse()
      .findIndex((event) => event?._id === lastEvent?._id);
    const isLastEventNotTheLast = lastEvent?._id
      !== distributionTimeline[distributionTimeline.length - 1]._id;

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
      lastEvent,
      lastEventIndex,
      isLastEventNotTheLast,
      currentProgress: currentProgress ? (currentProgress / totalVestingPercent) * 100 : 0,
      nextProgress: nextProgress ? ((nextProgress / totalVestingPercent) * 100) : 0,
    };
  }, [distributionTimeline, sortedListEvent]);

  const onClickRow = () => {
    handleDataCoinClick(data);
  };

  const RenderStage = useMemo(() => {
    if (nextEvent) {
      return (
        <div className={styles.StageWrapper}>
          <div className={`${styles.StageBadge} ${styles.StageUnlock}`}>
            Upcoming Unlock
          </div>

          {/* <div className={`${styles.StageBadge} ${styles.StageListing}`}>
            Upcoming Listing
          </div> */}

          {nextEvent.isDisplayTime && <div className="mt-1">exact time</div>}
        </div>
      );
    }

    return <div className={styles.StageWrapper}>Ended</div>;
  }, [nextEvent]);

  return (
    <tr
      onClick={onClickRow}
      onKeyUp={() => {}}
      tabIndex={0}
      role="button"
      className={styles.component}
    >
      <td>
        <span className="icon-star" />
      </td>

      <td>
        {/* name */}
        <div className="d-flex flex-column">
          <b className={styles.TextUppercase}>{data.ticker}</b>

          <small className={styles.TextCapitalize}>
            {data.name.toLowerCase()}
          </small>
        </div>
      </td>

      <td className="text-center">
        {/* markets */}
        <img src={data.logo} alt={data.name} width={24} height={24} />
        {/* <span>{data.name}</span> */}
        <span className="unit">{data.unit}</span>
      </td>

      <td className="text-center">
        {/* ico roi */}
        {data.vestingRoiMaxPrice || 0}
        x
      </td>

      <td className="text-center">
        {/* price */}
        {data.price && (
          <div className="d-flex">
            <span>{`$${data.price.usd}`}</span>

            <sup className={`color-${data.price.usd_24h_change >= 0 ? 'success' : 'critical'}`}>
              {data.price.usd_24h_change >= 0 ? '▲' : '▼'}
              {formatNumber.format(Math.abs(data.price.usd_24h_change))}
              %
            </sup>
          </div>
        )}
      </td>

      <td className="text-center">
        {/* token supply */}
        {/* {data.totalSupply} */}
        <div className="d-flex justify-content-center">
          <div className="d-flex flex-column align-item-center justify-content-center text-center flex-1">
            <i className="fa-solid fa-lock-open" />

            <span>
              {data.circulatingSupply
                ? formatNumber.format((data.circulatingSupply / data.totalSupply) * 100) : 0}
              %
            </span>
          </div>

          <div className={styles.SupplyProcess}>
            {/* <div className={styles.SupplyProcessPlus}>
              <span>+0.06571%</span>

              <sup>24H</sup>
            </div> */}

            <div className={`${styles.SupplyProcessBar} ${data.circulatingSupply ? styles.Processing : ''}`}>
              <div
                className={styles.Current}
                style={{ width: `${(data.circulatingSupply / data.totalSupply) * 100}%` }}
              />
            </div>

            {/* <div className={styles.SupplyProcessPlus}>
              <span>+74M tokens</span>
            </div> */}
          </div>

          <div className="d-flex flex-column align-item-center justify-content-center text-center flex-1">
            <i className="fa-solid fa-lock" />

            <span>
              {data.circulatingSupply
                ? formatNumber.format((1 - (data.circulatingSupply / data.totalSupply)) * 100)
                : 100}
              %
            </span>
          </div>
        </div>
      </td>

      <td className="text-center">
        {/* public vesting */}
        <div className="d-flex justify-content-center">
          <div className="d-flex flex-column align-item-center justify-content-center text-center flex-1">
            <i className="fa-solid fa-lock-open" />

            <span>
              {eventObject.currentProgress ? formatNumber.format(eventObject.currentProgress) : 0}
              %
            </span>
          </div>

          <div className={styles.SupplyProcess}>
            <div className={styles.SupplyProcessPlus}>
              {!!eventObject.isLastEventNotTheLast
                && dayjs().to(sortedListEvent[sortedListEvent.length - 1].time)}
            </div>

            <div
              className={`${styles.SupplyProcessBar} ${
                eventObject.nextProgress ? styles.Processing : ''
              }`}
            >
              {!!eventObject.nextProgress && (
                <>
                  <div
                    className={styles.CurrentVesting}
                    style={{ width: `${eventObject.currentProgress}%` }}
                  />
                  <div
                    className={styles.NextVesting}
                    style={{
                      width: `${eventObject.nextProgress}%`,
                    }}
                  />
                </>
              )}
            </div>

            {!!eventObject.nextProgress && (
            <div className={styles.SupplyProcessPlus}>
              next unlock&nbsp;
              {formatNumber.format(eventObject.nextProgress || 0)}
              %
            </div>
            )}
          </div>

          <div className="d-flex flex-column align-item-center justify-content-center text-center flex-1">
            <i className="fa-solid fa-lock" />

            <span>
              {formatNumber.format(100 - eventObject.currentProgress)}
              %
            </span>
          </div>
        </div>
      </td>

      <td className="text-center">
        {/* stage */}
        {/* {data.stage} */}
        {RenderStage}
      </td>

      <td className="text-center">
        {/* upcoming events */}
        {nextEvent && dayjs().to(nextEvent.time)}
      </td>

      <td className="text-center">
        {/* last events */}
        {eventObject.lastEvent && dayjs(eventObject.lastEvent.time).fromNow()}
        {/* {lastEvent && getLastEvent()} */}
      </td>

      {/* <td>
        <Link to="#" className="btn">Trade</Link>
      </td> */}

      {/* <td >
        {data.cap}
      </td> */}
    </tr>
  );
}

VestingCoinRow.propTypes = {
  data: PropTypes.instanceOf(Object),
  handleDataCoinClick: PropTypes.func,
};

VestingCoinRow.defaultProps = {
  data: {},
  handleDataCoinClick: () => {},
};

export default memo(VestingCoinRow);
