import PropTypes from 'prop-types';
import React from 'react';
import './LanguagesCard.scss';

LanguagesCard.propTypes = {
  languages: PropTypes.array
};

LanguagesCard.defaultProps = {
  languages: []
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
            ? languages.map((language, index) => {
              return <span
                key={index}
                className="languages-card__content__item"
              >{language.label}</span>
            })
            : <span className="card-nia">No Information Available.</span>
        }
      </div>
    </div>
  );
}

export default LanguagesCard;