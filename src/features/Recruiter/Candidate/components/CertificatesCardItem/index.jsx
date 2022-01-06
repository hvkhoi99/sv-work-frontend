import React from 'react';
import * as FaIcons from 'react-icons/fa';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

CertificatesCardItem.propTypes = {
  certificate: PropTypes.object
};

CertificatesCardItem.defaultProps = {
  certificate: {}
}

function CertificatesCardItem(props) {
  const { certificate} = props;

  return (
    <div className="certificates-card__content__item">
      <div className="certificates-card__content__item__icon">
        <FaIcons.FaCertificate className="certificates-item-icon" />
      </div>
      <div className="certificates-card__content__item__info">
        <div className="certificates-card__content__item__info__title">
          <Link
            to="#"
            className="certificates-card__content__item__info__title__link"
          >
            {certificate.title}
            {/* <FaIcons.FaEye className="certificates-card__content__item__info__title__link__icon" /> */}
          </Link>
        </div>
        <span>{certificate.issuing_organization}</span>
        <p>{certificate.description}</p>
      </div>
    </div>
  );
}

export default CertificatesCardItem;