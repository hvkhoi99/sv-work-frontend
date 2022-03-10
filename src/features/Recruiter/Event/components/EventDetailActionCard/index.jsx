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
  isClosing: PropTypes.bool,
  isDeleting: PropTypes.bool,
  isJoining: PropTypes.bool,
};

EventDetailActionCard.defaultProps = {
  event: {},
  onJoinEvent: null,
  onEditEvent: null,
  onCloseEvent: null,
  onDeleteEvent: null,
  isClosing: false,
  isDeleting: false,
  isJoining: false,
}

function EventDetailActionCard(props) {
  const {
    event, onJoinEvent, onEditEvent, onCloseEvent, onDeleteEvent,
    isClosing, isDeleting, isJoining
  } = props;

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
                  disabled={isDeleting}
                  style={isDeleting ? { cursor: "default" } : { cursor: "pointer" }}
                >
                  {isDeleting && <span className="spinner-border spinner-border-sm mr-1" />}
                  Delete
                </Button>
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
                    disabled={isClosing}
                    style={isClosing ? { cursor: "default" } : { cursor: "pointer" }}
                  >
                    {isClosing && <span className="spinner-border spinner-border-sm mr-1" />}
                    {event.is_closed ? "Closed" : "Close"}
                  </Button>
                </>
            }
          </div>
          : <div className="event-detail-action-card__group-button">
            <Button
              type="button"
              color="success"
              style={isJoining ? { cursor: "default" } : { cursor: "pointer" }}
              disabled={isJoining}
              onClick={() => onJoinEvent(event)}
            >
              {isJoining && <span className="spinner-border spinner-border-sm mr-1" />}
              {event.is_joined ? "Joined" : "Join"}
              </Button>
          </div>
      }
    </div>
  );
}

export default EventDetailActionCard;