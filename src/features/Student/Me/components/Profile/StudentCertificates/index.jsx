import React from 'react';
import StudentCertificatesItemCard from '../StudentCertificatesItem';
// import PropTypes from 'prop-types';
import './StudentCertificates.scss';
import PopupUpdateStudentCertificate from '../../PopupUpdateStudentProfile/PopupUpdateStudentCertificate';


StudentCertificatesCard.propTypes = {

};

function StudentCertificatesCard(props) {
  return (
    <div className="student-certificates-card">
      <div className="student-certificates-card__header">
        <span className="student-certificates-card__header__title">
          Certificates
        </span>
        {/* <FiIcons.FiPlusCircle className="student-certificates-card__header__icon" /> */}
        <PopupUpdateStudentCertificate />
      </div>
      <div className="student-certificates-card__main">
        <div className="student-certificates-card__main__item">
          <StudentCertificatesItemCard />
        </div>
        <div className="student-certificates-card__main__item">
          <StudentCertificatesItemCard />
        </div>
      </div>
    </div>
  );
}

export default StudentCertificatesCard;