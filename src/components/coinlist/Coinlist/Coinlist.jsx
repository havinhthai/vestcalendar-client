import React, {
  useState,
  memo,
  useEffect,
  useRef,
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

import 'react-tabs/style/react-tabs.css';

import styles from './Coinlist.module.scss';

// const dataCoinTab = [
//   {
//     id: 1,
//     title: 'View All',
//   },
//   {
//     id: 2,
//     title: 'Metaverse',
//   },
//   {
//     id: 3,
//     title: 'Entertainment',
//   },
//   {
//     id: 4,
//     title: 'Energy',
//   },
//   {
//     id: 5,
//     title: 'NFT',
//   },
//   {
//     id: 6,
//     title: 'Gaming',
//   },
//   {
//     id: 7,
//     title: 'Music',
//   },
// ];

export const TABLE_HEADER_COLUMN = [
  '',
  'name',
  'markets',
  'ico roi',
  'price',
  'token supply',
  'public vesting',
  'stage',
  'upcoming event',
  'last event',
  '',
];

function Coinlist01(props) {
  const {
    dataCoin,
    project,

    onGetProject,
    onGetProjectPrice,
  } = props;

  const [state, setState] = useState({
    isOpenModal: false,
  });
  const [projectId, setProjectId] = useState(null);
  const timer = useRef();

  const handleClickCloseModal = () => {
    setProjectId(null);
    setState((prevState) => ({
      ...prevState,
      isOpenModal: false,
    }));

    window.history.pushState('', '', '/');
  };

  const handleDataCoinClick = ({ _id }) => {
    onGetProject({ id: _id, callback: onGetProjectPrice });

    window.history.pushState('', '', `/${_id}`);

    setState((prevState) => ({
      ...prevState,
      isOpenModal: true,
    }));
    setProjectId(_id);
  };

  useEffect(() => {
    if (projectId) {
      timer.current = setInterval(() => {
        onGetProjectPrice();
      }, 60000);
    } else {
      clearInterval(timer.current);
    }
  }, [projectId]);

  return (
    <>
      <section className="coin-list">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              {/* <div className="block-text">
                <h3 className="heading">Market Update</h3>
                <Link to="##" className="btn-action-2">See All Coins</Link>
              </div> */}

              <div className="coin-list__main">
                <Tabs>
                  {/* <TabList>
                    {
                      dataCoinTab.map((idx) => (
                        <Tab key={idx.id}>
                          <span className={idx.id === 1 ? styles.title : ''}>{idx.title}</span>
                        </Tab>
                      ))
                    }
                  </TabList> */}

                  {/* {dataCoinTab.map((data) => ( */}
                  <TabPanel>
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
                          {dataCoin.map((idx) => (
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
                  {/* ))} */}
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </section>

      {!!Object.keys(project).length && (
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

          <Detail detail={project} />
        </Modal>
      )}
    </>
  );
}

Coinlist01.propTypes = {
  dataCoin: PropTypes.instanceOf(Array),
  project: PropTypes.instanceOf(Object),
  onGetProject: PropTypes.func.isRequired,
  onGetProjectPrice: PropTypes.func.isRequired,
};

Coinlist01.defaultProps = {
  dataCoin: [],
  project: {},
};

export default memo(Coinlist01);
