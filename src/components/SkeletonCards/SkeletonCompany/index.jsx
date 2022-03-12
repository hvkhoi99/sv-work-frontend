import React from 'react';
import Skeleton from 'react-loading-skeleton';
// import PropTypes from 'prop-types';
import './SkeletonCompanyCard.scss';

SkeletonCompanyCard.propTypes = {

};

function SkeletonCompanyCard(props) {
  return (
    <div className="skeleton-company-card">
      <Skeleton
        circle
        width={80}
        height={80}
        containerClassName="avatar-skeleton"
      />
      <Skeleton
        width={80}
        height={15}
        className="skeleton-company-card__item"
        />
      <Skeleton
        width={45}
        height={15}
        className="skeleton-company-card__item"
      />
    </div>
  );
}

export default SkeletonCompanyCard;