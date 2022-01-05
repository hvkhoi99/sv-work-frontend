import React from 'react';
import ExperiencesCardItem from '../ExperiencesCardItem';
// import PropTypes from 'prop-types';
import './ExperiencesCard.scss';

ExperiencesCard.propTypes = {

};

function ExperiencesCard(props) {
  return (
    <div className="experiences-card">
      <div className="experiences-card__title">
        <span>Experiences</span>
      </div>
      <div className="experiences-card__content">
        <ExperiencesCardItem />
        <ExperiencesCardItem />
      </div>
    </div>
  );
}

export default ExperiencesCard;