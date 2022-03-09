import React from 'react';
import Skeleton from 'react-loading-skeleton';
// import PropTypes from 'prop-types';
import './EventCardSkeleton.scss';

EventCardSkeleton.propTypes = {

};

function EventCardSkeleton(props) {
  return (
    <div className="event-card-skeleton">
      <div className="event-card-skeleton__image">
        <Skeleton count={1} width={256} height={160} borderRadius={0} />
      </div>
      <div className="event-card-skeleton__bottom">
        <div className="event-card-skeleton__bottom__left">
          <div className="event-card-skeleton__bottom__left__month">
            <Skeleton width={35} height={14} />
          </div>
          <div className="event-card-skeleton__bottom__left__month">
            <Skeleton circle width={30} height={30} />
          </div>
        </div>
        <div className="event-card-skeleton__bottom__right">
          <div className="event-card-skeleton__bottom__right__title">
            <Skeleton width={150} height={14} />
          </div>
          <div className="event-card-skeleton__bottom__right__location">
            <Skeleton width={100} height={14} />
          </div>
          <div className="event-card-skeleton__bottom__right__count">
            <Skeleton width={30} height={14} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventCardSkeleton;