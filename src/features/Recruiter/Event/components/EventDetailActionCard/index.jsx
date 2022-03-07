import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import './EventDetailActionCard.scss';

EventDetailActionCard.propTypes = {
  onJoinEvent: PropTypes.func,
  onEditEvent: PropTypes.func,
  onCloseEvent: PropTypes.func
};

EventDetailActionCard.defaultProps = {
  onJoinEvent: null,
  onEditEvent: null,
  onCloseEvent: null
}

function EventDetailActionCard(props) {
  const { onJoinEvent, onEditEvent, onCloseEvent } = props;

  return (
    <div className="event-detail-action-card">
      <div className="event-detail-action-card__date">
        <span className="event-detail-action-card__date__title">
          {`${"Date & Time"}`}
        </span>
        <div className="event-detail-action-card__date__start">
          Start:<span>
            19:00 2/12/2022
          </span>
        </div>
        <div className="event-detail-action-card__date__end">
          End:<span>
            21:00 2/12/2022
          </span>
        </div>
      </div>
      <div className="event-detail-action-card__group-button">
        <Button
          type="button"
          color="success"
          onClick={() => onEditEvent(1)}
        >Edit</Button>
        <Button
          type="button"
          color="secondary"
          onClick={() => onCloseEvent(1)}
        >Close</Button>
      </div>
      <div className="event-detail-action-card__group-button hidden">
        <Button
          type="button"
          color="success"
          onClick={() => onJoinEvent(1)}
        >Join</Button>
      </div>
    </div>
  );
}

export default EventDetailActionCard;