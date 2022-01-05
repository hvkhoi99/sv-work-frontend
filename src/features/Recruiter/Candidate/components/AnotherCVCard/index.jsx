import React from 'react';
import { Link } from 'react-router-dom';
// import PropTypes from 'prop-types';
import './AnotherCVCard.scss';
import * as FaIcons from 'react-icons/fa';

AnotherCVCard.propTypes = {

};

function AnotherCVCard(props) {
  return (
    <div className="another-cv-card">
      <div className="another-cv-card__title">
        <span>Another CV</span>
      </div>
      <div className="another-cv-card__content">
        <div className="another-cv-card__content__item">
          <Link to="#" className="another-cv-card__content__item__link">
            hvkhoi99cv1.com
            <FaIcons.FaEye className="another-cv-card__content__item__link__icon" />
          </Link>
        </div>
        <div className="another-cv-card__content__item">
          <Link to="#" className="another-cv-card__content__item__link">
            hvkhoi99cv1.com
            <FaIcons.FaEye className="another-cv-card__content__item__link__icon" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AnotherCVCard;