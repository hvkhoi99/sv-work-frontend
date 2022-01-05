import React from 'react';
import CertificatesCardItem from '../CertificatesCardItem';
// import PropTypes from 'prop-types';
import './CertificatesCard.scss';

CertificatesCard.propTypes = {
  
};

function CertificatesCard(props) {
  return (
    <div className="certificates-card">
      <div className="certificates-card__title">
        <span>Certificates</span>
      </div>
      <div className="certificates-card__content">
        <CertificatesCardItem />
        <CertificatesCardItem />
      </div>
    </div>
  );
}

export default CertificatesCard;