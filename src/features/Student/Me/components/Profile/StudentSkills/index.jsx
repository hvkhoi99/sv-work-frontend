import React from 'react';
import helper from 'utils/common';
import PopupUpdateStudentSkill from '../../PopupUpdateStudentProfile/PopupUpdateStudentSkills';
import StudentProfileMoreOptions from '../StudentProfileMoreOptions';
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
        {/* <AiIcons.AiOutlineEdit className="student-skills-card__header__icon" /> */}
        <PopupUpdateStudentSkill />
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
          <StudentProfileMoreOptions />
        </div>
      </div>
    </div>
  );
}

export default StudentSkillsCard;