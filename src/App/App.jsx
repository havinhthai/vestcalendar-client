/* eslint-disable no-restricted-globals */
import { React, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import AOS from 'aos';
import { Flip, ToastContainer } from 'react-toastify';
import PropTypes from 'prop-types';

import routes from 'pages';
import Page404 from 'pages/404';

import Header from 'components/header';
import Footer from 'components/footer';

import 'assets/font/font-awesome.css';

import './App.scss';

function App({
  onGetMe,
  onLoginByTwitter,
}) {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({
      duration: 2000,
    });

    const params = new Proxy(new URLSearchParams(window.location.search), {
      get: (searchParams, prop) => searchParams.get(prop),
    });

    if (params.code) {
      onLoginByTwitter({ code: params.code });

      navigate('/');
    }
  }, []);

  useEffect(() => {
    onGetMe();
  }, []);

  return (
    <>
      <Header />

      <Routes>
        {
          routes.map((data, idx) => (
            <Route key={`${new Date().toLocaleString() + idx}`} path={data.path} element={data.component} exact />
          ))
        }
        <Route path="*" element={<Page404 />} />
      </Routes>

      <Footer />

      <ToastContainer
        limit={3}
        closeOnClick
        autoClose={2000}
        transition={Flip}
      />
    </>
  );
}

App.propTypes = {
  onGetMe: PropTypes.func.isRequired,
  onLoginByTwitter: PropTypes.func.isRequired,
};

export default App;
