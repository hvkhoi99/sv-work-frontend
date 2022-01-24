import React from 'react';
import * as IoIcons from 'react-icons/io';
import StudentProfileMoreOptions from '../StudentProfileMoreOptions';
import PropTypes from 'prop-types';
import moment from 'moment';

StudentEducationsItemCard.propTypes = {
  education: PropTypes.object
};

StudentEducationsItemCard.defaultProps = {
  education: {}
}

function StudentEducationsItemCard(props) {
  const { education } = props;

  return (
    <div className="student-educations-item-card">
      <div className="student-educations-item-card__main">
        <div className="student-educations-item-card__main__school">
          <IoIcons.IoMdSchool className="student-educations-item-card__main__school__icon" />
        </div>
        <div className="student-educations-item-card__main__info">
          <span className="student-educations-item-card__main__info__title">
            {education.school}
          </span>
          <span className="student-educations-item-card__main__info__date">
            {moment(new Date(education.from_date)).format("MM/YYYY")} - {moment(new Date(education.to_date)).format("MM/YYYY")}
          </span>
          <span className="student-educations-item-card__main__info__major">
            Major: {education.major}
          </span>
          <div className="student-educations-item-card__main__info__achievement">
            Achievement: {education.achievements}
          </div>
        </div>
      </div>
      <div className="student-educations-item-card__more">
        <StudentProfileMoreOptions />
      </div>
    </div>
  );
}

export default StudentEducationsItemCard;