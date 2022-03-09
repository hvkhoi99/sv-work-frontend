import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import './EventDetailActionCard.scss';
// import moment from 'moment';

EventDetailActionCard.propTypes = {
  event: PropTypes.object,
  onJoinEvent: PropTypes.func,
  onEditEvent: PropTypes.func,
  onCloseEvent: PropTypes.func,
  onDeleteEvent: PropTypes.func,
};

EventDetailActionCard.defaultProps = {
  event: {},
  onJoinEvent: null,
  onEditEvent: null,
  onCloseEvent: null,
  onDeleteEvent: null,
}

function EventDetailActionCard(props) {
  const { event, onJoinEvent, onEditEvent, onCloseEvent, onDeleteEvent } = props;

  return (
    <div className="event-detail-action-card">
      <div className="event-detail-action-card__date">
        <span className="event-detail-action-card__date__title">
          {`${"Date & Time"}`}
        </span>
        <div className="event-detail-action-card__date__start">
          Start:<span>
            {/* {moment(new Date(event.start_date)).format('MM/DD/YYYY hh:mm')} */}
            {new Date(event.start_date).toLocaleString()}
          </span>
        </div>
        <div className="event-detail-action-card__date__end">
          End:<span>
            {/* {moment(new Date(event.end_date)).format('MM/DD/YYYY hh:mm')} */}
            {new Date(event.end_date).toLocaleString()}
          </span>
        </div>
      </div>
      {
        event.is_creator
          ? <div className="event-detail-action-card__group-button">
            {
              event.is_closed
                ? <Button
                  type="button"
                  color="danger"
                  onClick={() => onDeleteEvent(event)}
                >Delete</Button>
                : <>
                  <Button
                    type="button"
                    color="success"
                    onClick={() => onEditEvent(event)}
                  >Edit</Button>
                  <Button
                    type="button"
                    color="secondary"
                    onClick={() => onCloseEvent(event)}
                  >Close</Button>
                </>
            }
          </div>
          : <div className="event-detail-action-card__group-button">
            <Button
              type="button"
              color="success"
              style={event.is_joined ? {cursor: "default" } : { cursor: "pointer" }}
              disabled={event.is_joined ? true : false}
              onClick={() => onJoinEvent(event)}
            >{event.is_joined ? "Joined" : "Join"}</Button>
          </div>
      }
    </div>
  );
}

export default EventDetailActionCard;