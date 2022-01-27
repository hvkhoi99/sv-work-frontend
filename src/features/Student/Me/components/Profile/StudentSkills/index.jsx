import PropTypes from 'prop-types';
import React from 'react';
import PopupUpdateStudentSkill from '../../PopupUpdateStudentProfile/PopupUpdateStudentSkills';
import StudentProfileMoreOptions from '../StudentProfileMoreOptions';
import './StudentSkills.scss';

StudentSkillsCard.propTypes = {
  skills: PropTypes.array,
  onCreateSkills: PropTypes.func,
  onEditSkills: PropTypes.func,
  onDelete: PropTypes.func,
};

StudentSkillsCard.defaultProps = {
  skills: [],
  onCreateSkills: null,
  onEditSkills: null,
  onDelete: null,
}

function StudentSkillsCard(props) {
  const { skills, onCreateSkills, onEditSkills, onDelete } = props;

  return (
    <div className="student-skills-card">
      <div className="student-skills-card__header">
        <span className="student-skills-card__header__title">
          Skills
        </span>
        {/* <AiIcons.AiOutlineEdit className="student-skills-card__header__icon" /> */}
        {
          skills.length <= 0 &&
          <PopupUpdateStudentSkill
            initialValues={{
              skills: ''
            }}
            onSubmit={onCreateSkills}
            typeIcon={"add"}
          />
        }
      </div>
      <div className="student-skills-card__main">
        <div className="student-skills-card__main__info">
          {
            // helper.splitCommaString(
            //   "PHP, UX/UI Design, ReactJs, PHP, UX/UI Design, ReactJs, PHP, UX/UI Design, ReactJs",
            //   "student-skills-card__main__info__item"
            // )
            skills.length <= 0
              ? <span>No Information Available.</span>
              : skills.map((skill, index) => {
                return <span
                  key={index}
                  className="student-skills-card__main__info__item"
                >{skill.label}</span>
              })
          }
        </div>
        {skills.length > 0 && <div className="student-skills-card__main__more">
          <StudentProfileMoreOptions
            typePopup="skills"
            initialValues={{
              skills: skills
            }}
            onSubmit={onEditSkills}
            onDelete={onDelete}
          />
        </div>}
      </div>
    </div>
  );
}

export default StudentSkillsCard;