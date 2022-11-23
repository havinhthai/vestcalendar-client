import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import line from 'assets/images/icon/connect-line.png';

function Work01(props) {
  const { data } = props;

  const [dataBlock] = useState(
    {
      heading: 'How It Work',
      desc: 'Stacks is a production-ready library of stackable content blocks built in React Native.',
    },
  );

  return (
    <section className="work">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="block-text center">
              <h3 className="heading">{dataBlock.heading}</h3>

              <p className="fs-20 desc">
                {dataBlock.desc}
              </p>
            </div>

            <div className="work__main">
              {
                data.map((idx) => (
                  <div className="work-box" key={idx.id}>
                    <div className="image">
                      <img src={idx.img} alt="VestCalendar" />
                    </div>

                    <div className="content">
                      <p className="step">{idx.step}</p>
                      <Link to="##" className="title">{idx.title}</Link>
                      <p className="text">{idx.text}</p>
                    </div>

                    <img
                      className="line"
                      src={line}
                      alt="VestCalendar"
                    />
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

Work01.propTypes = {
  data: PropTypes.instanceOf(Array),
};

Work01.defaultProps = {
  data: [],
};

export default Work01;
