import React from 'react';
import PropTypes from 'prop-types';

import formatNumber from 'utils/formatNumber';
import formatMoney from 'utils/formatMoney';

import './TokenSupply.scss';

function TokenSupply(props) {
  const {
    isShowProgress,
    data,
    title,
    progressPercent,
  } = props;

  let renderProgress = null;
  let renderContent = null;

  const convertNumberWithSpace = (value) => {
    const isString = typeof value === 'string';
    let val = value;

    if (isString) {
      // remove space
      val = value.replace(/\s/g, '');
    }

    return formatMoney.format(val).replace(/,/g, ' ');
  };

  if (isShowProgress) {
    renderProgress = (
      <div className="d-flex justify-content-between align-items-center gap-2">
        <div className="text-center">
          <p><i className="fas fa-lock-open" /></p>
          <p>{`${formatNumber.format(progressPercent)}%`}</p>
        </div>

        <div className="progress w-100 position-relative">
          <div className="progress-sub rounded" style={{ width: `${progressPercent}%` }} />
        </div>

        <div className="text-center">
          <p><i className="fas fa-lock" /></p>
          <p>{`${formatMoney.format(100 - progressPercent)}%`}</p>
        </div>
      </div>
    );

    renderContent = data.data.map((item) => (
      <div className="token-item d-flex justify-content-between pb-1 mb-2" key={item.title}>
        <div className="token-item__title d-flex gap-1 fw-bold">
          <span className="token-item__icon"><i className={item.icon} /></span>
          <span>{item.title}</span>
        </div>

        <p>{formatNumber.format(item.value).replace(/,/g, ' ')}</p>
      </div>
    ));
  } else {
    renderContent = data.data.map((item) => {
      const { title: itemTitle, value, valueType } = item;

      let label = '';

      switch (valueType) {
        case 'TEXT':
          label = value;
          break;
        case '%':
          label = `${item.value}%`;
          break;
        case 'USD':
          label = `${convertNumberWithSpace(item.value)}`;
          break;
        case 'NUMBER':
          label = `${formatNumber.format(item.value).replace(/,/g, ' ')}`;
          break;
        default:
          break;
      }

      return (
        <div className="token-item d-flex justify-content-between pb-1 mb-2 gap-4" key={item.title}>
          <div className="d-flex gap-1">
            <span className="token-item__title fw-bold">{itemTitle}</span>
          </div>

          <p>{label}</p>
        </div>
      );
    });
  }

  return (
    <div className="token-supply p-3 background h-100">
      <p className="text-center font-section__title fs-18">
        {title}
      </p>

      {renderProgress}

      <div className="mt-4">
        {renderContent}
      </div>

      <div className="text-center fs-12 mt-4">
        {process.env.REACT_APP_HOSTING}
      </div>
    </div>
  );
}

TokenSupply.propTypes = {
  isShowProgress: PropTypes.bool,
  data: PropTypes.instanceOf(Object),
  title: PropTypes.string.isRequired,
  progressPercent: PropTypes.number,
};

TokenSupply.defaultProps = {
  isShowProgress: false,
  data: null,
  progressPercent: 0,
};

export default TokenSupply;
