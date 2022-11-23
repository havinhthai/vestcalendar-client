import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import Crypto01 from 'components/crypto/Crypto01';
import Coinlist01 from 'components/coinlist/Coinlist';

// import dataCoin from 'assets/fake-data/data-coin';
// import { DETAILS_FAKER } from '../detail/faker';

// import Banner01 from 'components/banner/Banner01';
// import Work01 from 'components/work/Work01';
// import About01 from 'components/about/About01';
// import Testimonial01 from 'components/testimonial/Testimonial01';
// import Sale01 from 'components/sale/Sale01';
// import dataPartner from 'assets/fake-data/data-partner';
// import dataTestimonial from 'assets/fake-data/data-testimonial';
// import dataWork from 'assets/fake-data/data-work';
// import Download01 from 'components/download/Download01';

function HomeOne(props) {
  const {
    projects,
    // isLoadingProjects,
    // isProjectsReady,

    onGetProjects,
    onGetProjectsPrice,
  } = props;

  useEffect(() => {
    let timer;

    const onCallbackGetProjectsPrice = () => {
      onGetProjectsPrice();

      timer = setInterval(() => {
        onGetProjectsPrice();
      }, 60000);
    };

    onGetProjects({ callback: onCallbackGetProjectsPrice });

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <main className="home-1">
      {/* <Banner01 data={dataPartner} /> */}

      <Crypto01 />

      <Coinlist01 dataCoin={projects} />

      {/* <Work01 data={dataWork} /> */}

      {/* <About01 /> */}

      {/* <Download01 /> */}

      {/* <Testimonial01 data={dataTestimonial} /> */}

      {/* <Sale01 /> */}
    </main>
  );
}

HomeOne.propTypes = {
  projects: PropTypes.instanceOf(Array),
  // isLoadingProjects: false,
  // isProjectsReady: PropTypes.bool,

  onGetProjects: PropTypes.func,
  onGetProjectsPrice: PropTypes.func,
};

HomeOne.defaultProps = {
  projects: [],
  // isLoadingProjects: false,
  // isProjectsReady: false,

  onGetProjects: () => null,
  onGetProjectsPrice: () => null,
};

export default HomeOne;
