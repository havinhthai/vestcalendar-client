import React, { useState } from 'react';

import Button from 'components/button';

import img from 'assets/images/layout/banner-03.png';

function Banner03() {
  const [dataBlock] = useState(
    {
      title: 'Learn, buy & sell crypto easily',
      desc: 'VestCalendar is the easiest place to buy and sell cryptocurrency. Sign up and get started today.',
    },
  );

  return (
    <section className="banner">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="banner__content">
              <h2 className="title">{dataBlock.title}</h2>

              <p className="fs-20 desc">
                {dataBlock.desc}
              </p>

              <Button title="Start trading" path="#" />
            </div>

            <div className="banner__image">
              <img src={img} alt="VestCalendar" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Banner03;
