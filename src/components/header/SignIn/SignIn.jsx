import React, {
  useState,
  memo,
  useCallback,
} from 'react';
import { Link } from 'react-router-dom';
import { Button, Dropdown, Modal } from 'react-bootstrap';
import { useGoogleLogin } from '@react-oauth/google';
import TelegramLoginButton from 'react-telegram-login';
import PropTypes from 'prop-types';

// import avt from 'assets/images/avt/avt-01.jpg';

import { ENVIRONMENT } from 'constants';

import { meDefaultProps, mePropTypes } from 'redux/auth/types';

// import { onClickComingSoon } from 'utils';

import styles from './SignIn.module.scss';

function SignIn({
  me,
  onLoginByGoogle,
  onLoginByTelegram,
  onLoginByTwitter,
  onLogout,
}) {
  const [state, setState] = useState({
    isOpenModalLogin: false,
  });

  const handleClose = () => setState((prevS) => ({ ...prevS, isOpenModalLogin: false }));
  const handleShow = () => setState((prevS) => ({ ...prevS, isOpenModalLogin: true }));

  const googleLogin = useGoogleLogin({
    onSuccess: (tokenResponse) => onLoginByGoogle({
      tokenResponse,
      callback: () => (state.isOpenModalLogin ? handleClose() : null),
    }),
    onError: (errorResponse) => (
      process.env.REACT_APP_ENVIRONMENT === ENVIRONMENT.DEVELOPMENT
        ? console.log(errorResponse)
        : null
    ),
  });

  const handleGoogleLogin = () => googleLogin();

  const handleTelegramResponse = useCallback((userInfo) => {
    onLoginByTelegram({
      userInfo,
      callback: handleClose,
    });
  }, []);

  return (
    <div>
      {me.token ? (
        <Dropdown className="user">
          <Dropdown.Toggle>
            <img src={me.avatar || '/favicon.png'} alt="avt" />
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item href="#">
              <Link className="dropdown-item" to="/user-profile">
                <i className="bx bx-user font-size-16 align-middle me-1" />
                <span>Profile</span>
              </Link>
            </Dropdown.Item>

            {/* <Dropdown.Item href="#">
              <Link className="dropdown-item" to="##">
                <i className="bx bx-wallet font-size-16 align-middle me-1" />
                <span>My Wallet</span>
              </Link>
            </Dropdown.Item> */}

            {/* <Dropdown.Item href="#">
              <Link
                className="dropdown-item d-block"
                to="##"
              >
                <i className="bx bx-wrench font-size-16 align-middle me-1" />
                <span>Settings</span>
              </Link>
            </Dropdown.Item> */}

            <Dropdown.Item href="#">
              <Link
                className="dropdown-item d-block"
                to="/watch-list"
              >
                <i className="bx bx-star font-size-16 align-middle me-1" />
                <span>Watchlist</span>
              </Link>
            </Dropdown.Item>

            <Dropdown.Item>
              <button
                type="button"
                className={[
                  'dropdown-item text-danger',
                  styles.signinDropdownBtn,
                ].join(' ')}
                to="/login"
                onClick={onLogout}
              >
                <i className="bx bx-power-off font-size-16 align-middle me-1 text-danger" />
                <span>Logout</span>
              </button>
            </Dropdown.Item>

          </Dropdown.Menu>
        </Dropdown>
      ) : (
        <div className="wallet">
          {/* <Link to="/wallet"> Sign in / Sign up </Link> */}
          <button
            type="button"
            onClick={handleShow}
            className={[
              'reset-button fw-bold',
              styles.signinBtnLogin,
            ].join(' ')}
          >
            Sign in
          </button>
        </div>
      )}

      <Modal
        show={state.isOpenModalLogin}
        onHide={handleClose}
        centered
      >

        <Modal.Body
          className={[
            'p-4',
            styles.signinModalBody,
          ].join(' ')}
        >
          <TelegramLoginButton
            className={styles.BtnTelegram}
            dataOnauth={handleTelegramResponse}
            botName={process.env.REACT_APP_BOT_TELEGRAM_NAME}
          />

          <div>
            <Button
              className={styles.BtnGoogle}
              onClick={handleGoogleLogin}
            >
              <div className="d-flex align-item-center justify-content-center">
                <span>
                  <i className="fa-brands fa-google" />
                </span>

                <span>Log in with Google</span>
              </div>
            </Button>
          </div>

          <div>
            <Button
              className={styles.BtnTwitter}
              onClick={onLoginByTwitter}
            >
              <div className="d-flex align-item-center justify-content-center">
                <span>
                  <i className="fa-brands fa-twitter" />
                </span>

                <span>Log in with Twitter</span>
              </div>
            </Button>
          </div>

          <Button
            className={[
              'd-block ',
              styles.btnClose,
            ].join(' ')}
            variant="secondary"
            onClick={handleClose}
          >
            Close
          </Button>
        </Modal.Body>
      </Modal>
    </div>
  );
}

SignIn.propTypes = {
  me: PropTypes.shape(mePropTypes),
  onLoginByGoogle: PropTypes.func.isRequired,
  onLoginByTwitter: PropTypes.func.isRequired,
  onLoginByTelegram: PropTypes.func.isRequired,
  onLogout: PropTypes.func.isRequired,
};

SignIn.defaultProps = {
  me: meDefaultProps,
};

export default memo(SignIn);
