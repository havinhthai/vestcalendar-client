import PropTypes from 'prop-types';

export const distributionTimeLinePropTypes = PropTypes.arrayOf(
  PropTypes.shape({
    timezone: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }),
);

export const allocationsPropTypes = PropTypes.arrayOf(
  PropTypes.shape({
    title: PropTypes.string.isRequired,
    percent: PropTypes.number.isRequired,
  }),
);

export const linksPropTypes = PropTypes.arrayOf(
  PropTypes.shape({
    linkType: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }),
);
