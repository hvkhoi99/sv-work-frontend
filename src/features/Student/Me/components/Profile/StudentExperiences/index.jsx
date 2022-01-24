import React from 'react';
// import PropTypes from 'prop-types';
import './StudentExperiences.scss';
import StudentExperiencesItemCard from '../StudentExperiencesItem';
import PopupUpdateStudentExperience from '../../PopupUpdateStudentProfile/PopupUpdateStudentExperience';

StudentExperiencesCard.propTypes = {
  
};

function StudentExperiencesCard(props) {
  return (
    <div className="student-experiences-card">
      <div className="student-experiences-card__header">
        <span className="student-experiences-card__header__title">
          Experiences
        </span>
        <PopupUpdateStudentExperience />
      </div>
      <div className="student-experiences-card__main">
        <div className="student-experiences-card__main__item">
          <StudentExperiencesItemCard />
        </div>
        <div className="student-experiences-card__main__item">
          <StudentExperiencesItemCard />
        </div>
      </div>
    </div>
  );
}

export default StudentExperiencesCard;