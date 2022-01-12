import Images from 'constants/images';
import PropTypes from 'prop-types';
import React from 'react';
import LinesEllipsis from 'react-lines-ellipsis';
import './EventCard.scss';

EventCard.propTypes = {
  onViewDetailEvent: PropTypes.func
};

EventCard.defaultProps = {
  onViewDetailEvent: null
}

function EventCard(props) {
  const {onViewDetailEvent} = props;
  
  const handleViewDetailEvent = () => {
    onViewDetailEvent();
  }

  return (
    <div className="event-card" onClick={handleViewDetailEvent}>
      <div className="event-card__img">
        <img src={Images.event1} alt="event-img" />
      </div>

      <div className="event-card__info">
        <div className="event-card__info__left">
          <span className="event-card__info__left__month">March</span>
          <span className="event-card__info__left__day">28</span>
        </div>
        <div className="event-card__info__right">
          <LinesEllipsis
            text={
              "Mang tien ve cho me"
            }
            maxLine='1'
            ellipsis='...'
            trimRight
            basedOn='letters'
            className="event-card__info__right__title"
          />
          <LinesEllipsis
            text={
              "Hoa Vang, Da Nang"
            }
            maxLine='1'
            ellipsis='...'
            trimRight
            basedOn='letters'
            className="event-card__info__right__location"
          />
          <span className="event-card__info__right__participants">
            Join:&nbsp;
            <span className="event-card__info__right__participants__count">
              100
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}

export default EventCard;