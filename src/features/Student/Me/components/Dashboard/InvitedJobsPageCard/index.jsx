import React from 'react';
import InvitedJobsCard from '../InvitedJobsCard';
// import PropTypes from 'prop-types';
import './InvitedJobsPageCard.scss';

InvitedJobsPageCard.propTypes = {
  
};

function InvitedJobsPageCard(props) {
  return (
    <div className="invited-jobs-page-card">
      <div className="saved-jobs-page-card__item">
        <InvitedJobsCard />
      </div>
    </div>
  );
}

export default InvitedJobsPageCard;