import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Table from 'react-bootstrap/Table';

import { MONTHS } from 'utils';

import './index.scss';

const TIMES_LINE_DEFAULT = [1, 2, 3, 4, 5, 6, 9, 12];

function VestingSchedule({
  vestingSchedule: data,
  startTime,
  vestingRoiMaxPrice,
}) {
  const [timesline] = useState([...TIMES_LINE_DEFAULT]);

  const getIndex = (timesLineData, find) => timesLineData.findIndex((
    time,
  ) => Number(time) === Number(find));

  data.forEach((vestingSchedule) => {
    const { cliffMonths, vestingMonths } = vestingSchedule;

    // handle cliff
    const nextCliffMonths = cliffMonths + 1;
    const indexCliffMonths = getIndex(timesline, cliffMonths);
    const nextCliffMonthsIndex = getIndex(timesline, nextCliffMonths);

    if (indexCliffMonths === -1 && cliffMonths !== 0) {
      const idx = timesline.findIndex((time, index) => timesline[index + 1]
        && time < cliffMonths
        && timesline[index + 1] > cliffMonths);

      if (idx === -1) {
        timesline.push(cliffMonths);
      } else {
        timesline.splice((idx + 1), 0, cliffMonths);
      }
    }

    if (nextCliffMonthsIndex === -1) {
      const idxNext = timesline.findIndex((time, index) => timesline[index + 1]
        && time < nextCliffMonths
        && timesline[index + 1] > nextCliffMonths);

      if (cliffMonths === 0) return;

      if (idxNext === -1) {
        timesline.push(nextCliffMonths);
      } else {
        timesline.splice((idxNext + 1), 0, nextCliffMonths);
      }
    }

    // handle total
    const totalCliffAndVesting = cliffMonths + vestingMonths;
    const indexCliffAndVesting = getIndex(timesline, totalCliffAndVesting);

    if (totalCliffAndVesting === 0) return;

    if (indexCliffAndVesting === -1) {
      const idx = timesline.findIndex((time, index) => timesline[index + 1]
        && time < totalCliffAndVesting
        && timesline[index + 1] > totalCliffAndVesting);

      if (idx === -1) {
        timesline.push(totalCliffAndVesting);
      } else {
        timesline.splice((idx + 1), 0, totalCliffAndVesting);
      }
    }
  });

  const renderBodyContent = data.map((vestingSchedule, idx) => {
    const {
      backgroundColor,
      cliffMonths,
      vestingMonths,
      title,
      tokenPrice,
      tgeUnlock,
      description,
    } = vestingSchedule;

    const tokenPriceIsNumber = tokenPrice && !Number.isNaN(Number(tokenPrice));
    const totalCliffAndVesting = cliffMonths + vestingMonths;

    const ndexCliffMonths = getIndex(timesline, cliffMonths);
    const indexCliffAndVesting = getIndex(timesline, totalCliffAndVesting);

    const colSpanCliff = ndexCliffMonths + 1;
    const colSpanCliffAndVesting = indexCliffAndVesting - ndexCliffMonths;
    const colSpanLeft = timesline.length - (ndexCliffMonths + 1) - colSpanCliffAndVesting;

    return (
      <tr
        key={`${new Date().toLocaleString() + idx}`}
        style={{ '--currentColor': backgroundColor }}
      >
        <td className="tbody-title">
          <span className="d-block m-auto">{title}</span>
        </td>

        <td className="white-space-nowrap">
          {tokenPrice ? `${tokenPriceIsNumber ? '$' : ''}${tokenPrice}` : '-'}
        </td>

        <td>
          {tokenPrice && tokenPriceIsNumber ? `${Math.round(vestingRoiMaxPrice / tokenPrice)}x` : '-'}
        </td>

        <td>
          {tgeUnlock ? `${tgeUnlock}%` : '-'}
        </td>

        {colSpanCliff !== 0 ? (
          <td className="tbody-cliff" colSpan={colSpanCliff}>
            <span>
              CLIFF
            </span>
          </td>
        ) : null}

        <td className="tbody-description" colSpan={colSpanCliffAndVesting}>
          <span>
            {description}
          </span>
        </td>

        {colSpanLeft ? (
          <td className="tbody-empty" colSpan={colSpanLeft}>
            &nbsp;
          </td>
        ) : null}
      </tr>
    );
  });

  const renderTimeLineItem = timesline.map((th, idx) => {
    let renderDate = null;

    if (startTime) {
      const start = new Date(startTime);
      // minus one because default th is 1
      start.setMonth(start.getMonth() - 1 + Number(th));
      const month = MONTHS[start.getMonth()].slice(0, 3);
      const year = start.getFullYear();

      renderDate = (
        <div className="thead-years m-auto">
          {month}
          &nbsp;
          {year}
        </div>
      );
    }

    return (
      <th key={`${new Date().toLocaleString() + idx}`} className="align-middle">
        <span className="fw-bold">
          {th}
        </span>

        <br />

        {renderDate}
      </th>
    );
  });

  const renderTableHead = (
    <thead className="thead" style={{ '--currentColor': data[0]?.backgroundColor }}>
      <tr>
        <th className="align-middle">
          &nbsp;
        </th>

        <th className="align-middle">
          TOKEN
          <br />
          PRICE
        </th>

        <th className="align-middle">
          ROI $
        </th>

        <th className="align-middle">
          TGE
          <br />
          UNLOCK
        </th>

        {renderTimeLineItem}
      </tr>
    </thead>
  );

  return (
    <div className="vesting-schedule p-3 background h-100">
      <p className="text-center font-section__title fs-18">
        Vesting Schedule
      </p>

      <Table responsive>
        {renderTableHead}

        <tbody className="tbody">
          {renderBodyContent}
        </tbody>
      </Table>

      <div className="text-center fs-12 mt-4">
        {process.env.REACT_APP_HOSTING}
      </div>
    </div>
  );
}

VestingSchedule.propTypes = {
  vestingSchedule: PropTypes.instanceOf(Array),
  startTime: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(Date),
  ]),
  vestingRoiMaxPrice: PropTypes.number,
};

VestingSchedule.defaultProps = {
  vestingSchedule: [],
  startTime: '',
  vestingRoiMaxPrice: null,
};

export default VestingSchedule;
