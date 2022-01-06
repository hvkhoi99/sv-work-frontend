import React from 'react';
import * as MdIcons from 'react-icons/md';
import PropTypes from 'prop-types';
import moment from 'moment';

EducationsCardItem.propTypes = {
  education: PropTypes.object
};

EducationsCardItem.defaultProps = {
  education: {}
}

function EducationsCardItem(props) {
  const { education } = props;

  return (
    <div className="educations-card__content__item">
      <div className="educations-card__content__item__icon">
        <MdIcons.MdSchool className="education-item-icon" />
      </div>
      <div className="educations-card__content__item__info">
        <span>{education.school}</span>
        <ul>
          <li>
            {moment(education.from_date).format('DD/MM/YYYY')} - {moment(education.to_date).format('DD/MM/YYYY')}
          </li>
          <li>Major: {education.major}</li>
          <li>Achievements: {education.achievements}</li>
        </ul>
      </div>
    </div>
  );
}

export default EducationsCardItem;