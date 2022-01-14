import React from 'react';
// import PropTypes from 'prop-types';
import './StudentExperiences.scss';
import * as FiIcons from 'react-icons/fi';
import StudentExperiencesItemCard from '../StudentExperiencesItem';

StudentExperiencesCard.propTypes = {
  
};

function StudentExperiencesCard(props) {
  return (
    <div className="student-experiences-card">
      <div className="student-experiences-card__header">
        <span className="student-experiences-card__header__title">
          Experiences
        </span>
        <FiIcons.FiPlusCircle className="student-experiences-card__header__icon" />
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