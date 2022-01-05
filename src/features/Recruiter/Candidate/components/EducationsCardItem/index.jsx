import React from 'react';
import * as MdIcons from 'react-icons/md';
// import PropTypes from 'prop-types';

EducationsCardItem.propTypes = {
  
};

function EducationsCardItem(props) {
  return (
    <div className="educations-card__content__item">
      <div className="educations-card__content__item__icon">
        <MdIcons.MdSchool className="education-item-icon" />
      </div>
      <div className="educations-card__content__item__info">
        <span>Bach Khoa University</span>
        <ul>
          <li>8/2017 - 3/2022</li>
          <li>Major: Information Technology</li>
          <li>Achievements: Good - GPA 8.0</li>
        </ul>
      </div>
    </div>
  );
}

export default EducationsCardItem;