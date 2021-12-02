import Images from 'constants/images';
import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.scss';

NotFoundPage.propTypes = {

};

function NotFoundPage(props) {
  return (
    <div className="not-found">
      <img
        src={Images.notFound}
        alt="not-found"
      />
      <Link to="/">Go Home</Link>
    </div>
  );
}

export default NotFoundPage;