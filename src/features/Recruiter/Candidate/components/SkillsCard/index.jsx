import React from 'react';
import PropTypes from 'prop-types';
import './SkillsCard.scss';
import helper from 'utils/common';

SkillsCard.propTypes = {
  skills: PropTypes.string
};

SkillsCard.defaultProps = {
  skills: ''
}

function SkillsCard(props) {
  const { skills} = props;

  return (
    <div className="skills-card">
      <div className="skills-card__title">
        <span>Skills</span>
      </div>
      <div className="skills-card__content">
        {
          skills !== null 
          ? helper.splitCommaString(skills, "skills-card__content__item")
          : <span className="card-nia">No Information Available.</span>
        }
      </div>
    </div>
  );
}

export default SkillsCard;