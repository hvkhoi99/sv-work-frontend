import Images from 'constants/images';
import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import * as FiIcons from 'react-icons/fi';
import * as FaIcons from 'react-icons/fa';
import * as MdIcons from 'react-icons/md';
import * as RiIcons from 'react-icons/ri';
import * as GiIcons from 'react-icons/gi';
import * as SiIcons from 'react-icons/si';
import { Button } from 'reactstrap';
import './NotificationCard.scss';
import { useHistory } from 'react-router-dom';

NotificationCard.propTypes = {
  notificaition: PropTypes.object,
};

NotificationCard.defaultProps = {
  notification: {
    type: 'create-recruitment',
    image: Images.defaultAvatar
  },
}

function NotificationCard(props) {
  const { notification } = props;
  const [isHidden, setIsHidden] = useState(true);
  const ref = useRef(null);
  const history = useHistory();
  // const body = JSON.parse(notification.body);

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
              <span className="notification-content__content__text__name">
                {notification.body.company_info.company_name}
                {notification.body.company_info.verify && <FaIcons.FaCheckCircle
                  className="notification-content__content__text__name__icon"
                />}
              </span>
              has just created a new job titled <span className="notification-content__content__text__job-title">
                {notification.body.job.title}
              </span>
              . Join now!
            </div>
            <span className="notification-content__content__date">{notification.updated_at}</span>
          </>
        );
      case "update-recruitment":
        return (
          <>
            <div className="notification-content__content__text">
              <span className="notification-content__content__text__name">
                {notification.body.company_info.company_name}
                {notification.body.company_info.verify && <FaIcons.FaCheckCircle
                  className="notification-content__content__text__name__icon"
                />}
              </span>
              has just updated job <span className="notification-content__content__text__job-title">
                {notification.body.job.title}
              </span>
              . Join now!
            </div>
            <span className="notification-content__content__date">{notification.updated_at}</span>
          </>
        );
      case "update-avatar":
        return (
          <>
            <div className="notification-content__content__text read-notification-success">
              <span className="notification-content__content__text__name">
                {notification.body.company_info.company_name}
                {notification.body.company_info.verify && <FaIcons.FaCheckCircle
                  className="notification-content__content__text__name__icon"
                />}
              </span>
              just updated their avatar profile.
            </div>
            <span className="notification-content__content__date">{notification.updated_at}</span>
          </>
        );
      case "approved-application":
        return (
          <>
            <div className="notification-content__content__text read-notification-success">
              <span className="notification-content__content__text__name">
                {notification.body.company_info.company_name}
                {notification.body.company_info.verify && <FaIcons.FaCheckCircle
                  className="notification-content__content__text__name__icon"
                />}
              </span>
              has <span className="notification-content__content__text__name">
                accepted your application
              </span>
              in job <span className="notification-content__content__text__job-title">
                {notification.body.job.title}
              </span>. From now on, you can start working on this!
            </div>
            <span className="notification-content__content__date read-notification-success__date">{notification.updated_at}</span>
          </>
        );
      case "rejected-application":
        return (
          <>
            <div className="notification-content__content__text read-notification-success">
              <span className="notification-content__content__text__name">
                {notification.body.company_info.company_name}
                {notification.body.company_info.verify && <FaIcons.FaCheckCircle
                  className="notification-content__content__text__name__icon"
                />}
              </span>
              has <span className="notification-content__content__text__name">
                rejected your application
              </span>
              in job <span className="notification-content__content__text__job-title">
                {notification.body.job.title}
              </span>. Apply for other jobs now!
            </div>
            <span className="notification-content__content__date read-notification-success__date">{notification.updated_at}</span>
          </>
        );
      case "invited-job":
        return (
          <>
            <div className="notification-content__content__text">
              <span className="notification-content__content__text__name">
                {notification.body.company_info.company_name}
                {notification.body.company_info.verify && <FaIcons.FaCheckCircle
                  className="notification-content__content__text__name__icon"
                />}
              </span>
              has invited you to their <span className="notification-content__content__text__job-title">
                {notification.body.job.title}
              </span> job.
            </div>
            <span className="notification-content__content__date">{notification.updated_at}</span>
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
      // case "cancel-invite-job":
      //   return (
      //     <>
      //       <div className="notification-content__content__text">
      //         <span>Company A</span> has invited you to their <span>XYZ</span> job.
      //       </div>
      //       <span className="notification-content__content__date">2 minutes ago</span>
      //     </>
      //   );
      default: break;
    }
  }

  const renderTypeIcon = (type) => {
    switch (type) {
      case "create-recruitment":
        return (
          <SiIcons.SiWorkplace className="notification-content__img__type-icon__icon" />
        );
      case "update-recruitment":
        return (
          <SiIcons.SiWorkplace className="notification-content__img__type-icon__icon" />
        );
      case "update-avatar":
        return (
          <MdIcons.MdTipsAndUpdates className="notification-content__img__type-icon__icon bg-change-avatar" />
        );
      case "approved-application":
        return (
          <RiIcons.RiNewspaperFill className="notification-content__img__type-icon__icon" />
        );
      case "rejected-application":
        return (
          <RiIcons.RiNewspaperFill className="notification-content__img__type-icon__icon" />
        );
      case "invited-job":
        return (
          <GiIcons.GiLetterBomb className="notification-content__img__type-icon__icon bg-invited-job" />
        );
      // case "cancel-invite-job":
      //   return (
      //     <GiIcons.GiLetterBomb className="notification-content__img__type-icon__icon"/>
      //   );
      default: break;
    }
  }

  const onViewNotification = (notification) => {
    switch (notification.type) {
      case "create-recruitment":
        return history.push(`/recruitment/${notification.body.job.id}`);
      case "update-recruitment":
        return history.push(`/recruitment/${notification.body.job.id}`);
      case "update-avatar":
        return history.push(`company/${notification.body.company_info.id}`)
      case "approved-application":
        return history.push(`/recruitment/${notification.body.job.id}`);
      case "rejected-application":
        return history.push(`/recruitment/${notification.body.job.id}`);
      case "invited-job":
        return history.push(`/recruitment/${notification.body.job.id}`);
      default: break;
    }
  }

  const onMarkRead = () => {
    setIsHidden(true);
  }

  const onShowMarkAsRead = (e) => {
    e.stopPropagation();
    setIsHidden(!isHidden);
  }

  return (
    <li className="noti-card-container">
      <div className="notification-link" onClick={() => onViewNotification(notification)}>
        <div className="notification-content">
          <div className="notification-content__img">
            <img src={notification.body.company_info.logo_image_link} alt="company" />
            <div className="notification-content__img__type-icon">
              {
                renderTypeIcon(notification.type)
              }
            </div>
          </div>
          <div className="notification-content__content">
            {
              renderContent(notification.type)
            }
          </div>
        </div>
      </div>
      <div
        className={`noti-card-container__more-options ${!isHidden && "is-focus-noti-option"}`}
        onClick={onShowMarkAsRead}
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
          {
            notification.is_read
              ? <span>Mark as unread</span>
              : <span>Mark as read</span>
          }
        </li>
      </ul>
      {!notification.is_read && <div className="noti-card-container__dot">
        <span />
      </div>}
    </li>
  );
}

export default NotificationCard;