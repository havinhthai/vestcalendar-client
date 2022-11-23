import React, { memo } from 'react';
import PropTypes from 'prop-types';

function Space({ size, position }) {
  return (
    <div style={{
      [position === 'top' ? 'marginTop' : 'marginLeft']: size,
    }}
    />
  );
}

Space.propTypes = {
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  position: PropTypes.string,
};

Space.defaultProps = {
  size: 100,
  position: 'top',
};

export default memo(Space);
