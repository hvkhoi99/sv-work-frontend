import React from 'react';
import PropTypes from 'prop-types';
import * as FaIcons from 'react-icons/fa';
import StudentProfileMoreOptions from '../StudentProfileMoreOptions';
import moment from 'moment';

StudentExperiencesItemCard.propTypes = {
  experience: PropTypes.object,
  onEditExperience: PropTypes.func
};

StudentExperiencesItemCard.defaultProps = {
  experience: {},
  onEditExperience: null
}

function StudentExperiencesItemCard(props) {
  const { experience, onEditExperience } = props;

  return (
    <div className="student-experiences-item-card">
      <div className="student-experiences-item-card__main">
        <div className="student-experiences-item-card__main__building">
          <FaIcons.FaBuilding className="student-experiences-item-card__main__building__icon" />
        </div>
        <div className="student-experiences-item-card__main__info">
          <span className="student-experiences-item-card__main__info__title">
            {experience.position}
          </span>
          <span className="student-experiences-item-card__main__info__company">
            {experience.company}
          </span>
          <span className="student-experiences-item-card__main__info__date">
            {moment(new Date(experience.from_date)).format("MM/YYYY")} - {moment(new Date(experience.to_date)).format("MM/YYYY")}
          </span>
          <div className="student-experiences-item-card__main__info__description">
            {experience.description}
          </div>
        </div>
      </div>
      <div className="student-experiences-item-card__more">
        <StudentProfileMoreOptions
          typePopup="experiences"
          initialValues={{
            ...experience,
            from_date: moment(new Date(experience.from_date)).format("YYYY-MM-DD"),
            to_date: moment(new Date(experience.to_date)).format("YYYY-MM-DD")
          }}
          onSubmit={onEditExperience}
        />
      </div>
    </div>
  );
}

export default StudentExperiencesItemCard;