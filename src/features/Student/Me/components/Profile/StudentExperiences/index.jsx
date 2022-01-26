import React from 'react';
import PropTypes from 'prop-types';
import './StudentExperiences.scss';
import StudentExperiencesItemCard from '../StudentExperiencesItem';
import PopupUpdateStudentExperience from '../../PopupUpdateStudentProfile/PopupUpdateStudentExperience';

StudentExperiencesCard.propTypes = {
  experiences: PropTypes.array,
  onCreateAnExperience: PropTypes.func,
  onEditExperience: PropTypes.func,
  onDelete: PropTypes.func,
  isExperienceDeleting: PropTypes.bool,
};

StudentExperiencesCard.defaultProps = {
  experiences: [],
  onCreateAnExperience: null,
  onEditExperience: null,
  onDelete: null,
  isExperienceDeleting: false,
}

function StudentExperiencesCard(props) {
  const {
    experiences, onCreateAnExperience,
    onEditExperience, onDelete, isExperienceDeleting
  } = props;

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
          onSubmit={onCreateAnExperience}
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
                  onDelete={onDelete}
                  isExperienceDeleting={isExperienceDeleting}
                />
              </div>
            })
        }
      </div>
    </div>
  );
}

export default StudentExperiencesCard;