import React from 'react';
import { Link } from 'react-router-dom';

import routes from 'pages';

function CheckUi() {
  return (
    <div>
      <ul className="d-flex">
        {routes.map((router, idx) => <li key={`${new Date().toLocaleString() + idx}`}><Link to={router.path}>{router.path}</Link></li>)}
      </ul>
    </div>
  );
}

export default CheckUi;
