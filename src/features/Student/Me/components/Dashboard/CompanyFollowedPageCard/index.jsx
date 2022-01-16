import React from 'react';
import CompanyFollowedCard from '../CompanyFollowedCard';
// import PropTypes from 'prop-types';
import './CompanyFollowedPageCard.scss';

CompanyFollowedPageCard.propTypes = {

};

function CompanyFollowedPageCard(props) {
  return (
    <div className="company-followed-page-card">
      <div className="applied-jobs-page-card__item">
        <CompanyFollowedCard />
      </div>
      <div className="applied-jobs-page-card__item">
        <CompanyFollowedCard />
      </div>
      <div className="applied-jobs-page-card__item">
        <CompanyFollowedCard />
      </div>
    </div>
  );
}

export default CompanyFollowedPageCard;