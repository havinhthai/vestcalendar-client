import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import './styles.scss';

function PageTitle(props) {
  const { title, heading } = props;

  return (
    <section className="page-title">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <h3 className="heading">{heading}</h3>
          </div>

          <div className="col-md-6">
            <ul className="breadcrumb">
              <li><Link to="/">Home</Link></li>
              <li><p className="fs-18">/</p></li>
              <li><p className="fs-18">{title}</p></li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

PageTitle.propTypes = {
  title: PropTypes.string,
  heading: PropTypes.string,
};

PageTitle.defaultProps = {
  title: '',
  heading: '',
};

export default PageTitle;
