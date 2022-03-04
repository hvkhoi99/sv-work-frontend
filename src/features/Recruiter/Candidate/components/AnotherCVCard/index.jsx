import PropTypes from 'prop-types';
import React from 'react';
import * as FaIcons from 'react-icons/fa';
import './AnotherCVCard.scss';

AnotherCVCard.propTypes = {
  cvs: PropTypes.array
};

AnotherCVCard.defaultProps = {
  cvs: []
}

function AnotherCVCard(props) {
  const { cvs } = props;

  return (
    <div className="another-cv-card">
      <div className="another-cv-card__title">
        <span>Another CV</span>
      </div>
      <div className="another-cv-card__content">
        {
          cvs.length > 0 ?
          cvs.map((cv, index) => {
            return <div
              className="another-cv-card__content__item"
              key={index}
            >
              <a
                href={cv.link}
                target="_blank" rel="noopener noreferrer"
                className="another-cv-card__content__item__link">
                <span>{cv.title}</span>
                <FaIcons.FaEye className="another-cv-card__content__item__link__icon" />
              </a>
            </div>
          })
          : <span className="card-nia">No Information Available.</span>
        }
      </div>
    </div>
  );
}

export default AnotherCVCard;