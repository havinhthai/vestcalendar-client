import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

// import formatNumber from 'utils/formatNumber';

import Chart from 'components/detail-page/Chart';
import DetailHeader from 'components/detail-page/HeaderDetail';
import DistributionTimeline from 'components/detail-page/DistributionTimeline';
import TokenSupply from 'components/detail-page/TokenSupply';
import TradingView from 'components/detail-page/TradingView';
import VestingSchedule from 'components/detail-page/VestingSchedule';

import './Detail.scss';

const TOKEN_SUPPLY_DATA = {
  unlock: 10,
  total: 100,
  data: [410000000, 5000000, 700000000],
};

const DEFAULT_TOKEN_SUPPLY = {
  data: [
    {
      icon: 'fas fa-lock-open',
      title: 'Circulating supply',
    },
    {
      icon: 'fas fa-lock',
      title: 'Locked supply',
    },
    {
      icon: 'fas fa-lightbulb',
      title: 'Total supply',
    },
  ],
};

const BACKGROUND_CHART_PALETTE_DEFAULT = [
  '#ea5545',
  '#f46a9b',
  '#ef9b20',
  '#edbf33',
  '#ede15b',
  '#bdcf32',
  '#87bc45',
  '#27aeef',
  '#b33dc6',
  '#F3AB9E',
  '#57BABA',
  '#3E5278',
  '#B77073',
  '#EDE9D0',
  '#ea5545',
  '#f46a9b',
  '#ef9b20',
  '#edbf33',
  '#ede15b',
  '#bdcf32',
  '#87bc45',
  '#27aeef',
  '#b33dc6',
  '#F3AB9E',
  '#57BABA',
  '#3E5278',
  '#B77073',
  '#EDE9D0',
];

function Detail({
  detail,
  project,

  onGetProject,
  onGetProjectPrice,
  onClearProject,
  toggleProjectToWatchList,
}) {
  const { id } = useParams();

  const projectDetail = Object.keys(detail).length ? detail : project;

  useEffect(() => {
    let timer;

    const onCallbackGetProjectsPrice = () => {
      onGetProjectPrice();

      timer = setInterval(() => {
        onGetProjectPrice();
      }, 60000);
    };

    if (id) {
      onGetProject({ id, callback: onCallbackGetProjectsPrice });
    }

    return () => {
      onClearProject();

      clearInterval(timer);
    };
  }, []);

  if (!Object.keys(projectDetail).length) {
    return <span>Item not found!</span>;
  }

  const {
    name,
    ticker,
    price,
    description,
    logo,
    links,
    allocations,
    tgeSummary,
    distributionTimeline,
    vestingSchedule,
    vestingMonthStart,
    vestingRoiMaxPrice,
    totalSupply,
    circulatingSupply,
    watchProject,
  } = projectDetail;

  const labels = [];
  const values = [];
  const backgroundColors = [];
  let startTime = '';
  const vestingMonthArray = vestingMonthStart ? String(vestingMonthStart).split('-') : [];

  // const randomHexColor = () => `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  const randomHexColor = () => `hsl(${Math.floor(Math.random() * 359)}, 100%, 50%)`;

  const onClickWatchList = () => {
    toggleProjectToWatchList(projectDetail._id, !projectDetail.watchProject);
  };

  const totalValues = allocations
    .map((allocation, index) => {
      labels.push(allocation.title);
      values.push(allocation.percent);

      const color = BACKGROUND_CHART_PALETTE_DEFAULT[index]
        ? BACKGROUND_CHART_PALETTE_DEFAULT[index]
        : randomHexColor();
      backgroundColors.push(color);

      return allocation.percent;
    })
    .reduce((total, dataset) => total + dataset, 0);

  // const compareVestingSchedule = allocations
  //   .map((allocation, index) => ({ ...allocation, backgroundColor: backgroundColors[index] }))
  //   .filter((allocation) => vestingSchedule.some((vesting) => vesting.id === allocation.id))
  //   .map((allocation) => {
  //     const vestinScheduleFound = vestingSchedule.find((item) => item.id === allocation.id);
  //     return { ...allocation, ...vestinScheduleFound };
  //   });

  const compareVestingSchedule = vestingSchedule
    .map((vesting, index) => {
      const backgroundColor = BACKGROUND_CHART_PALETTE_DEFAULT[index]
        ? BACKGROUND_CHART_PALETTE_DEFAULT[index]
        : randomHexColor();

      return { ...vesting, backgroundColor };
    });

  if (vestingMonthArray.length === 2) {
    const date = new Date();
    date.setMonth(vestingMonthArray[0] - 1);
    date.setFullYear(vestingMonthArray[1]);

    startTime = date;
  }

  const data = [
    circulatingSupply,
    totalSupply - circulatingSupply,
    totalSupply];

  const mergeTokenSupplyData = {
    ...TOKEN_SUPPLY_DATA,
    totalSupply,
    data: DEFAULT_TOKEN_SUPPLY.data.map((item, index) => (
      { ...item, value: data[index] })),
  };

  return (
    <div className="detail">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <DetailHeader
              name={name}
              ticker={ticker}
              price={price}
              description={description}
              logo={logo}
              links={links}
              watchProject={watchProject}
              distributionTimeline={distributionTimeline}
              onClickWatchList={onClickWatchList}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-12 col-lg-8">
            <TradingView symbol={ticker || undefined} />
          </div>

          <div className="col-12 col-lg-4 fs-13">
            <TokenSupply
              isShowProgress
              progressPercent={(circulatingSupply / totalSupply) * 100}
              title="token supply"
              data={mergeTokenSupplyData}
            />
          </div>
        </div>

        <div className="row mt-3">
          <div className="col-12 col-lg-8 fs-13">
            <Chart
              logo={logo}
              allocations={allocations}
              labels={labels}
              values={values}
              backgroundColors={backgroundColors}
              totalValues={totalValues}
            />
          </div>

          <div className="col-12 col-lg-4 fs-13">
            <TokenSupply
              title="tge summary"
              data={{ data: tgeSummary }}
            />
          </div>
        </div>

        <div className="row mt-3">
          <div className="col-12">
            <VestingSchedule
              startTime={startTime}
              vestingSchedule={compareVestingSchedule}
              vestingRoiMaxPrice={vestingRoiMaxPrice ?? 0}
            />
          </div>
        </div>

        <div className="row mt-3">
          <div className="col-12">
            <DistributionTimeline
              distributionTimeLine={distributionTimeline}
              allocations={allocations}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

Detail.propTypes = {
  detail: PropTypes.instanceOf(Object),
  project: PropTypes.instanceOf(Object),

  onGetProject: PropTypes.func.isRequired,
  onGetProjectPrice: PropTypes.func,
  onClearProject: PropTypes.func.isRequired,
  toggleProjectToWatchList: PropTypes.func.isRequired,
};

Detail.defaultProps = {
  detail: {},
  project: {},

  onGetProjectPrice: () => null,
};

export default Detail;
