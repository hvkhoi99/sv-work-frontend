import React from 'react';
// import PropTypes from 'prop-types';
import './styles.scss';
import Images from 'constants/images';

VerificationPage.propTypes = {

};

function VerificationPage(props) {
  return (
    <div className="verification">
      <div className="verification__company">
        <div className="verification__company__item">
          <img src={Images.emoji} alt="emoji" />
          <div>
            <span>ABC</span>
            <span>abc</span>
          </div>
        </div>
      </div>

      <div className="verification__detail">
        <img src={Images.minami} alt="minami" />
      </div>
    </div>
  );
}

export default VerificationPage;