import React, {
  memo,
  useState,
  useEffect,
} from 'react';
import {
  // Tab,
  Tabs,
  // TabList,
  TabPanel,
} from 'react-tabs';
// import { Link } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';

import Detail from 'pages/detail';

import VestingCoinRow from 'components/VestingCoinRow';

import { TABLE_HEADER_COLUMN } from 'components/coinlist/Coinlist/Coinlist';
import styles from './WatchList.module.scss';
import 'react-tabs/style/react-tabs.css';

function WatchList({
  me,
  project,
  watchListProjects,

  getProjectDetail,
  getWatchListProjects,
}) {
  const [state, setState] = useState({
    isOpenModal: false,
    modalLoading: true,
  });

  const handleClickCloseModal = () => {
    setState((prevState) => ({
      ...prevState,
      isOpenModal: false,
    }));
  };

  const handleDataCoinClick = async ({ _id }) => {
    setState((prevState) => ({
      ...prevState,
      isOpenModal: true,
      modalLoading: true,
    }));

    await getProjectDetail(_id);

    setState((prevState) => ({
      ...prevState,
      modalLoading: false,
    }));
  };

  useEffect(() => {
    if (me._id) {
      getWatchListProjects();
    }
  }, [me]);

  return (
    <main className="home-1">
      <section className="coin-list">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              {/* <div className="block-text">
                <h3 className="heading">Market Update</h3>
                <Link to="##" className="btn-action-2">See All Coins</Link>
              </div> */}

              <div className="coin-list__main watch-list">
                <Tabs>
                  <TabPanel style={{ marginTop: 0 }}>
                    <div className="content-inner">
                      <table className="table">
                        <thead>
                          <tr>
                            {TABLE_HEADER_COLUMN.map((th, idx) => (
                              <th
                                key={`${th}-${new Date().toLocaleString() + idx}`}
                                scope="col"
                              >
                                {th.toUpperCase()}
                              </th>
                            ))}
                          </tr>
                        </thead>

                        <tbody>
                          {watchListProjects.map((idx) => (
                            <VestingCoinRow
                              key={idx._id}
                              data={idx}
                              handleDataCoinClick={handleDataCoinClick}
                            />
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </TabPanel>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Modal
        size="xl"
        aria-labelledby="contained-modal-title-vcenter"
        className={['pt-4', styles.modal].join(' ')}
        onHide={handleClickCloseModal}
        show={state.isOpenModal}
      >
        <Modal.Header className={styles.ModalHeader} onClick={handleClickCloseModal}>
          <i className="fa-solid fa-xmark" />
        </Modal.Header>

        {state.modalLoading
          ? null
          : <Detail detail={project} />}
      </Modal>
    </main>
  );
}

WatchList.propTypes = {
  me: PropTypes.instanceOf(Object).isRequired,
  project: PropTypes.instanceOf(Object).isRequired,
  watchListProjects: PropTypes.instanceOf(Array).isRequired,

  getProjectDetail: PropTypes.func.isRequired,
  getWatchListProjects: PropTypes.func.isRequired,
};

WatchList.defaultProps = {

};

export default memo(WatchList);
