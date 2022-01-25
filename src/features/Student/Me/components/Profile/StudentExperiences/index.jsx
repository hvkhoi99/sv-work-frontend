import React from 'react';
import PropTypes from 'prop-types';
import './StudentExperiences.scss';
import StudentExperiencesItemCard from '../StudentExperiencesItem';
import PopupUpdateStudentExperience from '../../PopupUpdateStudentProfile/PopupUpdateStudentExperience';

StudentExperiencesCard.propTypes = {
  experiences: PropTypes.array,
  onCreateExperience: PropTypes.func,
  onEditExperience: PropTypes.func,
};

StudentExperiencesCard.defaultProps = {
  experiences: [],
  onCreateExperience: null,
  onEditExperience: null
}

function StudentExperiencesCard(props) {
  const { experiences, onCreateExperience, onEditExperience } = props;

  return (
    <div className="student-experiences-card">
      <div className="student-experiences-card__header">
        <span className="student-experiences-card__header__title">
          Experiences
        </span>
        <PopupUpdateStudentExperience 
          initialValues={{
            position: '',
            company: '',
            from_date: '',
            to_date: '',
            description: ''
          }}
          onSubmit={onCreateExperience}
          typeIcon="add"
        />
      </div>
      <div className="student-experiences-card__main">
        {
          experiences.length <= 0
          ? <span>No Information Available.</span>
          : experiences.map((experience, index) => {
            return <div
              key={index}
              className="student-experiences-card__main__item"
            >
              <StudentExperiencesItemCard
                experience={experience}
                onEditExperience={onEditExperience}
              />
            </div>
          })
        }
      </div>
    </div>
  );
}

export default StudentExperiencesCard;