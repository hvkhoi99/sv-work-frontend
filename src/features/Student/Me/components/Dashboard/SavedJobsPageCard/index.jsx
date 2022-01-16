import React from 'react';
import SavedJobsCard from '../SavedJobsCard';
// import PropTypes from 'prop-types';
import './SavedJobsPageCard.scss';

SavedJobsPageCard.propTypes = {
  
};

function SavedJobsPageCard(props) {
  return (
    <div className="saved-jobs-page-card">
      <div className="saved-jobs-page-card__item">
        <SavedJobsCard />
      </div>
      <div className="saved-jobs-page-card__item">
        <SavedJobsCard />
      </div>
      <div className="saved-jobs-page-card__item">
        <SavedJobsCard />
      </div>
    </div>
  );
}

export default SavedJobsPageCard;