/* eslint-disable react/no-danger */
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

import { getNextEvent } from 'utils/getRecentEvent';

import formatNumber from 'utils/formatNumber';

import Space from 'components/space';

import { linksPropTypes } from 'pages/detail/types';

import './DetailHeader.scss';

import styles from './DetailHeader.module.scss';

function DetailHeader({
  name,
  ticker,
  price,
  description,
  logo,
  links,
  watchProject,
  distributionTimeline,
  onClickWatchList,
}) {
  const nextEvent = getNextEvent(distributionTimeline);

  const isNotSocialPage = (link) => {
    switch (link.linkType) {
      case 'website': {
        return true;
      }

      case 'twitter':
      case 'telegram':
      case 'discord':
      case 'medium':
      default: {
        return false;
      }
    }
  };

  const renderLinks = (link) => {
    let icon;
    let text;

    switch (link.linkType) {
      case 'twitter':
        icon = <i className="fab fa-twitter" />;
        text = 'Twitter';
        break;
      case 'telegram':
        icon = <i className="fab fa-telegram" />;
        text = 'Telegram';
        break;
      case 'discord':
        icon = <i className="fab fa-discord" />;
        text = 'Discord';
        break;
      case 'medium':
        icon = <i className="fa-brands fa-medium" />;
        text = 'Medium';
        break;
      case 'website':
        icon = <i className="fa-solid fa-globe" />;
        text = link.url;
        break;
      default:
        icon = <i className="fa-solid fa-circle-question" />;
        text = 'Help';
        break;
    }

    return (
      <a
        className={styles.LinkContent}
        key={link._id}
        target="_blank"
        href={link.url}
        rel="noreferrer"
      >
        {icon}

        <span className={styles.LinkName}>
          &nbsp;
          {text}
        </span>
      </a>
    );
  };

  const RenderStage = useMemo(() => {
    if (nextEvent) {
      return (
        <span className="px-2 border rounded">Upcoming unlock</span>
      );
    }

    return <span className="px-2 border rounded">Ended</span>;
  }, [nextEvent]);

  return (
    <div className="detail-header rounded col-12 mb-4 p-3 background">
      <div className="d-flex align-items-center">
        <div>
          <img
            className="logo"
            src={logo}
            alt="logo"
          />
        </div>

        <Space position="left" size={8} />

        <div className="w-100 d-flex justify-content-between align-items-center">
          <div>
            <div className="d-flex gap-2">
              <span className="brand"><strong>{String(ticker).toUpperCase()}</strong></span>

              {!!price.usd
                && (
                  <div>
                    <span className="d-inline-block mt-2 price-main">
                      {`$${price.usd}`}
                    </span>
                    <sup className={`price-${price.usd_24h_change >= 0 ? 'up' : 'down'}`}>
                      {price.usd_24h_change >= 0 ? '▲' : '▼'}
                      {formatNumber.format(Math.abs(price.usd_24h_change))}
                      %
                    </sup>
                    {/* <sup className="price-up">▲2.5%</sup> */}
                  </div>
                )}
            </div>

            <div className={styles.TextCapitalize}>
              {String(name).toLowerCase()}
            </div>
          </div>

          <div className="d-flex gap-2">
            <span>
              <img
                className="logo small"
                src={logo}
                alt="logo"
              />
            </span>

            {RenderStage}
          </div>
        </div>

        <Space position="left" size={8} />

        <button type="button" className={styles.watchListButton} onClick={onClickWatchList}>
          <span className={`pl-1 ${watchProject ? 'icon-star-active' : 'icon-star'}`} />
        </button>
      </div>

      <p className="mt-2" dangerouslySetInnerHTML={{ __html: description }} />

      <div className="line mt-2 mb-2" />

      <div className="d-flex justify-content-between align-items-center">
        <div className="d-flex gap-2">
          {links.map((link) => isNotSocialPage(link) && renderLinks(link))}
        </div>

        <div className="d-flex gap-2 ml-auto">
          {links.map((link) => !isNotSocialPage(link) && renderLinks(link))}
        </div>
      </div>

      <div className="line mt-2 mb-2" />

      <div className="note p-3 rounded">
        <div className="d-flex gap-2">
          <span><i className="fas fa-pencil" /></span>
          <span>Personal note:</span>
        </div>

        <button type="button" className="reset-button">
          Click to leave personal note.
        </button>
      </div>

      <div className="d-flex justify-content-end mt-3">
        <button className="d-inline-block rounded reset-button font-small" type="button">
          <div className="d-flex gap-2 px-2 py-1 alert alert-danger mb-0">
            <span><i className="fas fa-exclamation-triangle" /></span>
            <span>Report a problem</span>
          </div>
        </button>
      </div>
    </div>
  );
}

DetailHeader.propTypes = {
  name: PropTypes.string,
  ticker: PropTypes.string,
  price: PropTypes.instanceOf(Object),
  description: PropTypes.string,
  watchProject: PropTypes.bool,
  logo: PropTypes.string.isRequired,
  links: linksPropTypes,
  distributionTimeline: PropTypes.instanceOf(Array),
  onClickWatchList: PropTypes.func.isRequired,
};

DetailHeader.defaultProps = {
  name: '',
  ticker: '',
  price: {},
  description: '',
  links: [],
  distributionTimeline: [],
  watchProject: false,
};

export default DetailHeader;
