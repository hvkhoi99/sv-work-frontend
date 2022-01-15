import React from 'react';
import AppliedJobsCard from '../AppliedJobsCard';
// import PropTypes from 'prop-types';
import './AppliedJobsPageCard.scss';

AppliedJobsPageCard.propTypes = {

};

function AppliedJobsPageCard(props) {
  const dataArray = [
    { id: 0, status: null },
    { id: 1, status: true },
    { id: 2, status: false },
  ]

  return (
    <div className="applied-jobs-page-card">
      {
        dataArray.map((data, index) => {
          return <div
            key={index}
            className="applied-jobs-page-card__item"
          >
            <AppliedJobsCard data={data}/>
          </div>
        })
      }
    </div>
  );
}

export default AppliedJobsPageCard;