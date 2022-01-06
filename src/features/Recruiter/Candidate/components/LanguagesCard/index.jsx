import PropTypes from 'prop-types';
import React from 'react';
import helper from 'utils/common';
import './LanguagesCard.scss';

LanguagesCard.propTypes = {
  languages: PropTypes.string
};

LanguagesCard.defaultProps = {
  languages: ''
}

function LanguagesCard(props) {
  const { languages } = props;

  return (
    <div className="languages-card">
      <div className="languages-card__title">
        <span>Languages</span>
      </div>
      <div className="languages-card__content">
        {
          languages !== null 
          ? helper.splitCommaString(languages, "languages-card__content__item")
          : <span className="card-nia">No Information Available.</span>
        }
      </div>
    </div>
  );
}

export default LanguagesCard;