import PropTypes from 'prop-types';
import React from 'react';
import './SkillsCard.scss';

SkillsCard.propTypes = {
  skills: PropTypes.array
};

SkillsCard.defaultProps = {
  skills: []
}

function SkillsCard(props) {
  const { skills } = props;

  return (
    <div className="skills-card">
      <div className="skills-card__title">
        <span>Skills</span>
      </div>
      <div className="skills-card__content">
        {
          skills !== null
            ? skills.map((skill, index) => {
              return <span
                key={index}
                className="skills-card__content__item"
              >{skill.label}</span>
            })
            : <span className="card-nia">No Information Available.</span>
        }

      </div>
    </div>
  );
}

export default SkillsCard;