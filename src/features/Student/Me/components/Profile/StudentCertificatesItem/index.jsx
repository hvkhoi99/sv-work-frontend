import PropTypes from 'prop-types';
import React from 'react';
import ReactHtmlParser from 'react-html-parser';
import * as GiIcons from 'react-icons/gi';
import StudentProfileMoreOptions from '../StudentProfileMoreOptions';

StudentCertificatesItemCard.propTypes = {
  certificate: PropTypes.object,
  onEditCertificate: PropTypes.func
};

StudentCertificatesItemCard.defaultProps = {
  certificate: {
    id: 0
  },
  onEditCertificate: null,
}

function StudentCertificatesItemCard(props) {
  const { certificate, onEditCertificate } = props;

  return (
    <div className="student-certificates-item-card">
      <div className="student-certificates-item-card__main">
        <div className="student-certificates-item-card__main__icon">
          <GiIcons.GiDiploma className="student-certificates-item-card__main__icon__item" />
        </div>
        <div className="student-certificates-item-card__main__info">
          <div className="student-certificates-item-card__main__info__title">
            <a
              href={certificate.image_link}
              target="_blank" rel="noopener noreferrer"
              className="student-certificates-item-card__main__info__title__link"
            >
              {certificate.title}
            </a>
          </div>
          <span>{certificate.issuing_organization}</span>
          <div className="student-certificates-item-card__main__info__description">
            {ReactHtmlParser(certificate.description)}
          </div>
        </div>
      </div>
      <div className="student-certificates-item-card__more">
        <StudentProfileMoreOptions
          typePopup="certificates"
          initialValues={certificate}
          onSubmit={onEditCertificate}
        />
      </div>
    </div>
  );
}

export default StudentCertificatesItemCard;