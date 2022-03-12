import React from 'react';
// import PropTypes from 'prop-types';
import './SkeletonCandidateCard.scss';
import Skeleton from 'react-loading-skeleton';

SkeletonCandidateCard.propTypes = {

};

function SkeletonCandidateCard(props) {
  return (
    <div className="skeleton-candidate-card">
      <Skeleton
        circle
        width={80}
        height={80}
      />
      <div className="skeleton-candidate-card__name">
        <Skeleton
          width={150}
          height={20}
        />
      </div>
      <div className="skeleton-candidate-card__job">
        <Skeleton
          width={100}
          height={15}
        />
      </div>
      <Skeleton
        width={50}
        height={30}
      />
    </div>
  );
}

export default SkeletonCandidateCard;