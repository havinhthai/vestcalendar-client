import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import logo from 'assets/images/logo/logo-vesting.png';
// import img1 from 'assets/images/logo/logo-footer-dark.png';

import './styles.scss';
import styles from './Footer.module.scss';

const productLink = [
  {
    title: 'Spot',
    path: '/spot',
  },
  {
    title: 'Inverse Perpetual',
    path: '#',
  },
  {
    title: 'USDT Perpetual',
    path: '#',
  },
  {
    title: 'Exchange',
    path: '#',
  },
  {
    title: 'Launchpad',
    path: '#',
  },
  {
    title: 'Binance Pay',
    path: '#',
  },
];
const servicesLink = [
  {
    title: 'Buy Crypto',
    path: '#',
  },
  {
    title: 'Markets',
    path: '#',
  },
  {
    title: 'Tranding Fee',
    path: '#',
  },
  {
    title: 'Affiliate Program',
    path: '#',
  },
  {
    title: 'Referral Program',
    path: '#',
  },
  {
    title: 'API',
    path: '#',
  },
];

const listSocial = [
  {
    icon: 'icon-facebook-f',
    path: '#',
  },
  {
    icon: 'icon-instagram',
    path: '#',
  },
  {
    icon: 'icon-youtube',
    path: '#',
  },
  {
    icon: 'icon-twitter',
    path: '#',
  },
];

function Footer() {
  const [isVisible, setIsVisible] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <footer className="footer style-2">
      <div className="container">
        <div className="footer__main d-none">
          <div className="row">
            <div className="col-xl-4 col-md-6">
              <div className="info">
                <Link to="/" className="logo light">
                  <img
                    className={styles.footerLogo}
                    src={logo}
                    alt="logo"
                  />
                </Link>

                <Link to="/" className="logo dark">
                  <img
                    className={styles.footerLogo}
                    src={logo}
                    alt="logo"
                  />
                </Link>

                <h6>{'Let\'s talk! 🤙'}</h6>

                <ul className="list">
                  <li><p>+12 345 678 9101</p></li>
                  <li><p>Info.Avitex@Gmail.Com</p></li>
                  <li>
                    <p>
                      Cecilia Chapman 711-2880 Nulla St. Mankato Mississippi
                      96522
                    </p>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-xl-4 col-md-6">
              <div className="widget">
                <div className="widget-link">
                  <h6 className="title">PRODUCTS</h6>
                  <ul>
                    {
                      productLink.map((data, idx) => (
                        <li key={`${new Date().toLocaleString() + idx}`}><Link to={data.path}>{data.title}</Link></li>
                      ))
                    }
                  </ul>
                </div>
                <div className="widget-link s2">
                  <h6 className="title">SERVICES</h6>
                  <ul>
                    {
                      servicesLink.map((data, idx) => (
                        <li key={`${new Date().toLocaleString() + idx}`}><Link to={data.path}>{data.title}</Link></li>
                      ))
                    }
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-md-12">
              <div className="footer-contact">
                <h5>Newletters</h5>
                <p>
                  Subscribe our newsletter to get more free design course and
                  resource.
                </p>
                <form action="#">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    required=""
                  />
                  <button type="submit" className="btn-action">Submit</button>
                </form>
                <ul className="list-social">
                  {
                    listSocial.map((data, idx) => (
                      <li key={`${new Date().toLocaleString() + idx}`}>
                        <Link to={data.path}><span className={data.icon} /></Link>
                      </li>
                    ))
                  }
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <div className="footer__bottom">
          <p>
            ©2022 VestCalendar.com. All Rights Reserved.
          </p>
        </div>
      </div>

      {
        isVisible
        && <Link onClick={scrollToTop} to="##" id="scroll-top" />
      }
    </footer>
  );
}

export default Footer;
