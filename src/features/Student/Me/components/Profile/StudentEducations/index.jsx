import React from 'react';
import PopupUpdateStudentEducation from '../../PopupUpdateStudentProfile/PopupUpdateStudentEducation';
import StudentEducationsItemCard from '../StudentEducationsItem';
import PropTypes from 'prop-types';
import './StudentEducations.scss';

StudentEducationsCard.propTypes = {
  educations: PropTypes.array,
  onCreateEducation: PropTypes.func,
};

StudentEducationsCard.defaultProps = {
  educations: [],
  onCreateEducation: null
}

function StudentEducationsCard(props) {
  const { educations, onCreateEducation } = props;

  return (
    <div className="student-educations-card">
      <div className="student-educations-card__header">
        <span className="student-educations-card__header__title">
          Educations
        </span>
        {/* <FiIcons.FiPlusCircle className="student-educations-card__header__icon" /> */}
        <PopupUpdateStudentEducation
          onSubmit={onCreateEducation}
          typeIcon="add"
        />
      </div>
      <div className="student-educations-card__main">
        {
          educations.length <= 0
            ? <span style={{ margin: '.5rem 0 0 0' }}>No Information Available.</span>
            : educations.map((education, index) => {
              return <div
                key={index}
                className="student-educations-card__main__item"
              >
                <StudentEducationsItemCard education={education} />
              </div>
            })
        }
      </div>
    </div>
  );
}

export default StudentEducationsCard;