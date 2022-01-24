import React from 'react';
import PopupUpdateStudentEducation from '../../PopupUpdateStudentProfile/PopupUpdateStudentEducation';
import StudentEducationsItemCard from '../StudentEducationsItem';
// import PropTypes from 'prop-types';
import './StudentEducations.scss';

StudentEducationsCard.propTypes = {

};

function StudentEducationsCard(props) {
  return (
    <div className="student-educations-card">
      <div className="student-educations-card__header">
        <span className="student-educations-card__header__title">
          Educations
        </span>
        {/* <FiIcons.FiPlusCircle className="student-educations-card__header__icon" /> */}
        <PopupUpdateStudentEducation />
      </div>
      <div className="student-educations-card__main">
        <div className="student-educations-card__main__item">
          <StudentEducationsItemCard />
        </div>
      </div>
    </div>
  );
}

export default StudentEducationsCard;