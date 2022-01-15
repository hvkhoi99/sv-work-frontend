import React from 'react';
// import PropTypes from 'prop-types';
import './CompanyFollowedCard.scss';
import * as GiIcons from 'react-icons/gi';

CompanyFollowedCard.propTypes = {

};

function CompanyFollowedCard(props) {
  return (
    <div className="company-followed-card">
      <div className="company-followed-card__left">

      </div>
      <div className="company-followed-card__right">
        <div className="company-followed-card__right__overlay overlay">
          <div className="company-followed-card__right__overlay__action action">
            <GiIcons.GiShatteredHeart
              className="company-followed-card__right__overlay__action__icon"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CompanyFollowedCard;