import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import TradingViewWidget, { Themes } from 'react-tradingview-widget';
import PropTypes from 'prop-types';

import './index.scss';

function TradingView(props) {
  const { symbol } = props;

  const [state, setState] = useState({
    renderTradingView: null,
  });

  const params = useParams();

  useEffect(() => {
    const body = document.querySelector('body');
    const isDarkMode = body.classList.contains('is_dark');
    const theme = isDarkMode ? Themes.DARK : Themes.LIGHT;

    setState((prevState) => ({
      ...prevState,
      renderTradingView: (
        <TradingViewWidget
          symbol={`${symbol.toUpperCase()}USDT`}
          theme={theme}
          show_popup_button
          autosize
        />
      ),
    }));
  }, [symbol, params]);

  return (
    <div className="trading-view p-3 background">
      <p className="text-center font-section__title fs-18">
        {String(symbol).toUpperCase()}
        &nbsp;PRICE CHART
      </p>

      <div className="trading-widget">
        {state.renderTradingView}
      </div>
    </div>
  );
}

TradingView.propTypes = {
  symbol: PropTypes.string,
};

TradingView.defaultProps = {
  symbol: '',
};

export default TradingView;
