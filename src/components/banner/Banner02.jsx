import React, { useState } from 'react';

import Button from 'components/button';

import img from 'assets/images/layout/banner-02.png';

function Banner02() {
  const [dataBlock] = useState(
    {
      heading: 'A trusted and secure cryptocurrency exchange.',
      desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    },
  );

  return (
    <section className="banner">
      <div className="container">
        <div className="row">
          <div className="col-xl-6 col-md-12">
            <div className="banner__content">
              <h2 className="title">
                {dataBlock.heading}
              </h2>

              <p className="fs-20 desc">
                {dataBlock.desc}
              </p>

              <Button title="Trading Now" path="#" />
            </div>
          </div>

          <div className="col-xl-6 col-md-12">
            <div className="banner__image">
              <img src={img} alt="VestCalendar" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Banner02;
