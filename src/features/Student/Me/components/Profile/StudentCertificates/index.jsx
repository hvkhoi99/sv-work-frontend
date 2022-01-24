import React from 'react';
import StudentCertificatesItemCard from '../StudentCertificatesItem';
import PropTypes from 'prop-types';
import './StudentCertificates.scss';
import PopupUpdateStudentCertificate from '../../PopupUpdateStudentProfile/PopupUpdateStudentCertificate';


StudentCertificatesCard.propTypes = {
  certificates: PropTypes.array,
  onCreateCertificate: PropTypes.func,
};

StudentCertificatesCard.defaultProps = {
  certificates: [],
  onCreateCertificate: null,
}

function StudentCertificatesCard(props) {
  const { certificates, onCreateCertificate } = props;

  return (
    <div className="student-certificates-card">
      <div className="student-certificates-card__header">
        <span className="student-certificates-card__header__title">
          Certificates
        </span>
        {/* <FiIcons.FiPlusCircle className="student-certificates-card__header__icon" /> */}
        <PopupUpdateStudentCertificate 
          typeIcon="add"
          initialValues={{
            title: '',
            issuing_organization: '',
            description: '',
            image_link: ''
          }}
          onSubmit={onCreateCertificate}
        />
      </div>
      <div className="student-certificates-card__main">
        {
          certificates.length > 0
            ? certificates.map((certificate, index) => {
              return <div 
              key={index}
              className="student-certificates-card__main__item"
              >
                <StudentCertificatesItemCard certificate={certificate}/>
              </div>
            })
            : <span>No Information Available.</span>
        }
      </div>
    </div>
  );
}

export default StudentCertificatesCard;