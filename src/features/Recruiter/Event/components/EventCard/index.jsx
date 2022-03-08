import Images from 'constants/images';
import PropTypes from 'prop-types';
import React from 'react';
import './EventCard.scss';

EventCard.propTypes = {
  event: PropTypes.object,
  onViewDetailEvent: PropTypes.func
};

EventCard.defaultProps = {
  event: {
    title: "N/A",
    description: "N/A",
    location: "N/A",
    start_date: "03/10/1999",
    end_date: "",
    image_link: Images.bachkhoaEvent,
    count_participants: 0
  },
  onViewDetailEvent: null
}

function EventCard(props) {
  const { event, onViewDetailEvent } = props;

  const handleViewDetailEvent = () => {
    onViewDetailEvent();
  }

  return (
    <div className="event-card" onClick={handleViewDetailEvent}>
      <div className="event-card__img">
        <img src={event.image_link ?? Images.bachkhoaEvent} alt="event-img" />
      </div>

      <div className="event-card__info">
        <div className="event-card__info__left">
          <span className="event-card__info__left__month">{new Date(event.start_date).toLocaleString("en-US", { "month": "short" })}</span>
          <span className="event-card__info__left__day">{new Date(event.start_date).toLocaleString("en-US", { "day": "numeric" })}</span>
        </div>
        <div className="event-card__info__right">
          <span className="event-card__info__right__title">
            {event.title}
          </span>
          <span className="event-card__info__right__location">
            {event.location}
          </span>
          <div className="event-card__info__right__participants">
            Join: <span className="event-card__info__right__participants__count">
              {event.count_participants}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventCard;