import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { A11y, Navigation, Scrollbar } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import PropTypes from 'prop-types';

import Button from 'components/button';

import img1 from 'assets/images/layout/banner-01.png';

import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';

function Banner01(props) {
  const { data } = props;

  const [dataBlock] = useState(
    {
      title: 'Buy & Sell Digital Assets In The VestCalendar',
      desc: 'Coin rockie is the easiest, safest, and fastest way to buy & sell crypto asset exchange.',
      title2: 'Our Partners',
    },
  );

  return (
    <section className="banner">
      <div className="container">
        <div className="row">
          <div className="col-xl-6 col-md-12">
            <div className="banner__content">
              <h2 className="title">{dataBlock.title}</h2>
              <p className="fs-20 desc">
                {dataBlock.desc}
              </p>
              <Button title="Get started now" path="#" />
              <div className="partner">
                <h6>{dataBlock.title2}</h6>
                <div className="partner__list">

                  <Swiper
                    modules={[Navigation, Scrollbar, A11y]}
                    spaceBetween={65}
                    slidesPerView={4}
                    className="swiper-partner"
                  >
                    {
                      data.map((idx) => (
                        <SwiperSlide key={idx.id}>
                          <Link to="##">
                            <img src={idx.img} alt="VestCalendars" />
                          </Link>
                        </SwiperSlide>

                      ))
                    }
                  </Swiper>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xl-6 col-md-12">
            <div className="banner__image">
              <img src={img1} alt="VestCalendar" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

Banner01.propTypes = {
  data: PropTypes.instanceOf(Array),
};

Banner01.defaultProps = {
  data: [],
};

export default Banner01;