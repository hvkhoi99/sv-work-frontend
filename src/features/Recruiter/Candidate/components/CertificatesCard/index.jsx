import React from 'react';
import CertificatesCardItem from '../CertificatesCardItem';
import PropTypes from 'prop-types';
import './CertificatesCard.scss';

CertificatesCard.propTypes = {
  certificates: PropTypes.array
};

CertificatesCard.defaultProps = {
  certificates: []
}

function CertificatesCard(props) {
  const { certificates } = props;

  return (
    <div className="certificates-card">
      <div className="certificates-card__title">
        <span>Certificates</span>
      </div>
      <div className="certificates-card__content">
        {
          certificates.length > 0
            ? certificates.map((certificate, index) => {
              return <CertificatesCardItem key={index} certificate={certificate} />
            })
            : <span className="card-nia">No Information Available.</span>
        }
      </div>
    </div>
  );
}

export default CertificatesCard;