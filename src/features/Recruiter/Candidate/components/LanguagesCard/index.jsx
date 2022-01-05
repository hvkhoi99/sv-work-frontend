import React from 'react';
// import PropTypes from 'prop-types';
import './LanguagesCard.scss';

LanguagesCard.propTypes = {

};

function LanguagesCard(props) {
  return (
    <div className="languages-card">
      <div className="languages-card__title">
        <span>Languages</span>
      </div>
      <div className="languages-card__content">
        <span className="languages-card__item">English</span>
        <span className="languages-card__item">Japanese</span>
        <span className="languages-card__item">Chinese</span>
      </div>
    </div>
  );
}

export default LanguagesCard;