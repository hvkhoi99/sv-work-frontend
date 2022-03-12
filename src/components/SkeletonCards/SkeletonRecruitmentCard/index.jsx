import React from 'react';
import Skeleton from 'react-loading-skeleton';
// import PropTypes from 'prop-types';
import './SkeletonRecruitmentCard.scss';

SkeletonRecruitmentCard.propTypes = {

};

function SkeletonRecruitmentCard(props) {
  return (
    <div className="skeleton-recruitment-card">
      <div className="skeleton-recruitment-card__top">
        <div className="skeleton-recruitment-card__top__left">
          <Skeleton
            circle
            width={48}
            height={48}
            containerClassName="avatar-skeleton"
          />
          {/* <Skeleton
            circle
            width={48}
            height={48}
            containerClassName="avatar-skeleton"
          /> */}
        </div>
        <div className="skeleton-recruitment-card__top__right">
          <Skeleton
            width={50}
            height={15}
          />
        </div>
      </div>
      <div className="skeleton-recruitment-card__main">
        <Skeleton
          width={100}
          height={15}
        />
        <Skeleton
          width={50}
          height={15}
        />
        <div className="skeleton-recruitment-card__main__hashtags">
          <Skeleton
            width={40}
            height={25}
          />
          <Skeleton
            width={40}
            height={25}
          />
        </div>
      </div>

    </div>
  );
}

export default SkeletonRecruitmentCard;