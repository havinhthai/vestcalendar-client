import { toast } from 'react-toastify';

import { TOAST_MESSAGE } from 'constants';

export const apiErrorHandler = (error, showToast = true) => {
  let title = '';
  let message;

  if (error.response) {
    title = error.response.data?.title;
    message = error.response.data?.message;
  } else if (error.request) {
    // eslint-disable-next-line no-underscore-dangle
    message = error.request._response;
  } else {
    message = error.message;
  }

  if (showToast) {
    toast.error(message);
  }

  return { title, message };
};

export const onClickComingSoon = () => toast.warn(TOAST_MESSAGE.FEATURE_COMING_SOON);

export const convertTZ = (date, tzString) => new Date((typeof date === 'string' ? new Date(date) : date).toLocaleString('en-US', { timeZone: tzString }));

export const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
