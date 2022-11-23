import PropTypes from 'prop-types';

export const mePropTypes = {
  _id: PropTypes.string,
  name: PropTypes.string,
  googleId: PropTypes.string,
  telegramId: PropTypes.string,
  email: PropTypes.string,
  avatar: PropTypes.string,
  createdAt: PropTypes.string,
  updatedAt: PropTypes.string,
  token: PropTypes.string,
  loginType: PropTypes.string,
};

export const meDefaultProps = {
  _id: '',
  name: '',
  googleId: '',
  telegramId: '',
  email: '',
  avatar: '',
  createdAt: '',
  updatedAt: '',
  token: '',
  loginType: '',
};
