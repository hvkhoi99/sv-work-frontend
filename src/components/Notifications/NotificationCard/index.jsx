import Images from 'constants/images';
import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import * as FiIcons from 'react-icons/fi';
import * as MdIcons from 'react-icons/md';
import { Button } from 'reactstrap';
import './NotificationCard.scss';

NotificationCard.propTypes = {
  type: PropTypes.string,
};

NotificationCard.defaultProps = {
  type: 'create-recruitment'
}

function NotificationCard(props) {
  const { type } = props;
  const [isHidden, setIsHidden] = useState(true);
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        isHidden === false && setIsHidden(true);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, isHidden]);

  const handleClick = (e) => {
    e.stopPropagation();
  }

  const renderContent = (type) => {
    switch (type) {
      case "create-recruitment":
        return (
          <>
            <div className="notification-content__content__text">
              <span>Company A</span> has just created a new job titled <span>ABC</span>. Join now!
            </div>
            <span className="notification-content__content__date">2 phút trước</span>
          </>
        );
      case "update-recruitment":
        return (
          <>
            <div className="notification-content__content__text read-notification-success">
              <span>Company A</span> has just updated the job title <span>ABC</span>.
            </div>
            <span className="notification-content__content__date read-notification-success__date">2 phút trước</span>
          </>
        );
      case "update-avatar":
        return (
          <>
            <div className="notification-content__content__text read-notification-success">
              <span>Company A</span> just updated their profile picture.
            </div>
            <span className="notification-content__content__date read-notification-success__date">2 phút trước</span>
          </>
        );
      case "approved-application":
        return (
          <>
            <div className="notification-content__content__text read-notification-success">
              <span>Company A</span> has <span>accepted your application</span> in job <span>ABCXYZ</span>.
              From now on, you can start working on this!
            </div>
            <span className="notification-content__content__date read-notification-success__date">2 phút trước</span>
          </>
        );
      case "invited-job":
        return (
          <>
            <div className="notification-content__content__text">
              <span>Company A</span> has invited you to their <span>XYZ</span> job.
            </div>
            <span className="notification-content__content__date">2 phút trước</span>
            <div className="notification-content__content__actions">
              <Button
                color="success"
                // outline 
                size="sm"
                type="button"
                onClick={handleClick}
              >Accept</Button>
              <Button
                color="secondary"
                // outline 
                size="sm"
                type="button"
                onClick={handleClick}
              >Cancel</Button>
            </div>
          </>
        );
      default: break;
    }
  }

  const onMarkRead = () => {
    setIsHidden(true);
  }

  return (
    <li className="noti-card-container">
      <div className="notification-link" onClick={() => { console.log("click") }}>
        <div className="notification-content">
          <div className="notification-content__img">
            <img src={Images.defaultAvatar} alt="copany" />
          </div>
          <div className="notification-content__content">
            {
              renderContent(type)
            }
          </div>
        </div>
      </div>
      <div
        className={`noti-card-container__more-options ${!isHidden && "is-focus-noti-option"}`}
        onClick={() => setIsHidden(!isHidden)}
        ref={ref}
      >
        <div className="noti-card-container__more-options__action">
          <MdIcons.MdMoreHoriz className="noti-card-container__more-options__action__icon" />
        </div>
      </div>
      <ul
        className={`noti-card-container__mark-read ${isHidden && "invisible-noti-options"}`}
        ref={ref}
      >
        <li className="noti-card-container__mark-read__item" onClick={onMarkRead} >
          <FiIcons.FiCheck className="noti-card-container__mark-read__item__icon" />
          <span>Mark as read</span>
        </li>
      </ul>
      <div className="noti-card-container__dot">
        <span />
      </div>
    </li>
  );
}

export default NotificationCard;