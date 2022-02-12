import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import './EventDetailActionCard.scss';

EventDetailActionCard.propTypes = {
  onJoinEvent: PropTypes.func,
  onEditEvent: PropTypes.func,
  onDeleteEvent: PropTypes.func
};

EventDetailActionCard.defaultProps = {
  onJoinEvent: null,
  onEditEvent: null,
  onDeleteEvent: null
}

function EventDetailActionCard(props) {
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
        <Button color="success">Edit</Button>
        <Button color="secondary">Delete</Button>
      </div>
    </div>
  );
}

export default EventDetailActionCard;