import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import './styles.scss';

function Button(props) {
  const { title, path } = props;

  return (
    <Link to={path} className="btn-action"><span>{title}</span></Link>
  );
}

Button.propTypes = {
  title: PropTypes.string,
  path: PropTypes.string,
};

Button.defaultProps = {
  title: '',
  path: '',
};

export default Button;
