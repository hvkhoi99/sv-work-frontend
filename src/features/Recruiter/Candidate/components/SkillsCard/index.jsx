import React from 'react';
// import PropTypes from 'prop-types';
import './SkillsCard.scss';

SkillsCard.propTypes = {
  
};

function SkillsCard(props) {
  return (
    <div className="skills-card">
      <div className="skills-card__title">
        <span>Skills</span>
      </div>
      <div className="skills-card__content">
        <span className="skills-card__content__item">Java</span>
        <span className="skills-card__content__item">UX/UI Designer</span>
        <span className="skills-card__content__item">PHP</span>
        <span className="skills-card__content__item">HTML/CSS</span>
        <span className="skills-card__content__item">Big Data</span>
      </div>
    </div>
  );
}

export default SkillsCard;