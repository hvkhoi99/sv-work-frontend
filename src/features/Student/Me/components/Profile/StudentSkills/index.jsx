import React from 'react';
// import PropTypes from 'prop-types';
import * as AiIcons from 'react-icons/ai';
import * as FiIcons from 'react-icons/fi';
import helper from 'utils/common';
import './StudentSkills.scss';

StudentSkillsCard.propTypes = {

};

function StudentSkillsCard(props) {
  return (
    <div className="student-skills-card">
      <div className="student-skills-card__header">
        <span className="student-skills-card__header__title">
          Skills
        </span>
        <AiIcons.AiOutlineEdit className="student-skills-card__header__icon" />
      </div>
      <div className="student-skills-card__main">
        <div className="student-skills-card__main__info">
          {
            helper.splitCommaString(
              "PHP, UX/UI Design, ReactJs, PHP, UX/UI Design, ReactJs, PHP, UX/UI Design, ReactJs",
              "student-skills-card__main__info__item"
            )
          }
        </div>
        <div className="student-skills-card__main__more">
          <FiIcons.FiMoreHorizontal className="student-skills-card__main__more__icon" />
        </div>
      </div>
    </div>
  );
}

export default StudentSkillsCard;