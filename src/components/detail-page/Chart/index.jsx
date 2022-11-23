import React from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import PropTypes from 'prop-types';

import formatNumber from 'utils/formatNumber';

import { allocationsPropTypes } from 'pages/detail/types';

import './Chart.scss';

ChartJS.register(ArcElement, Tooltip, Legend);

function ChartComponent({
  allocations,
  logo,
  labels,
  values,
  backgroundColors,
  totalValues,
}) {
  const data = {
    labels,
    datasets: [
      {
        data: values,
        backgroundColor: backgroundColors,
        borderWidth: 2,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label(tooltipItem) {
            const { dataset, label } = tooltipItem;
            const total = dataset.data.reduce(
              (previousValue, currentValue) => previousValue + currentValue,
              0,
            );
            const currentValue = dataset.data[tooltipItem.dataIndex];
            const percentage = Math.floor(((currentValue / total) * 100) + 0.5);
            return `${label}: ${percentage}%`;
          },
        },
      },
    },
  };

  const renderChartInformation = allocations.map((allocation, index) => (
    <div className="chart-item d-flex gap-2" key={allocation.title}>
      <span
        className="chart-item__color rounded-circle d-inline-block"
        style={{
          backgroundColor: backgroundColors[index],
        }}
      />
      <span className="chart-item__text">
        {`${allocation.title} - ${formatNumber.format((allocation.percent / totalValues) * 100)}%`}
      </span>
    </div>
  ));

  return (
    <div className="p-3 background fs-13">
      <p className="text-center font-section__title fs-18">
        ALLOCATIONS
      </p>

      <div className="position-relative">
        <div className="d-flex align-items-center justify-content-center">
          <div className="chart">
            <Doughnut
              className="chart-canvas"
              data={data}
              options={options}
            />

            <img
              className="chart-logo"
              src={logo}
              alt="logo"
            />
          </div>

          <div className="chart-description d-none d-lg-block">
            {renderChartInformation}
          </div>
        </div>

        <div className="text-center mt-4">
          {process.env.REACT_APP_HOSTING}
        </div>
      </div>
    </div>

  );
}

ChartComponent.propTypes = {
  allocations: allocationsPropTypes,
  logo: PropTypes.string.isRequired,
  labels: PropTypes.arrayOf(PropTypes.string).isRequired,
  values: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string])).isRequired,
  backgroundColors: PropTypes.arrayOf(PropTypes.string).isRequired,
  totalValues: PropTypes.number.isRequired,
};

ChartComponent.defaultProps = {
  allocations: [],
};

export default ChartComponent;
